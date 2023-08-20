import express from 'express';
import { PrismaClient } from '@prisma/client';

const paginate = require('express-paginate');

const app = express();
const prisma = new PrismaClient();

// keep this before all routes that will use pagination
app.use(paginate.middleware(10, 50));

import {
    updatePostById,
    getAllPosts,
    getPostById,
    deletePostById,
    createNewPost,
    getAllPostsByGroupId,
    getAllPostsByUserId,
} from '../db/posts';
import { getGroupById } from '../db/groups';
import { getUserGroupByUserIdAndGroupId } from '../db/userGroups';
import { createNewTag, getTagByName } from '../db/tags';
import { createNewPostTag } from '../db/postTags';

// @desc Get posts
// @route GET /posts/
// @access public
export const getPosts = async (
    req: express.Request | any,
    res: express.Response
) => {
    try {
        const posts = await getAllPosts();
        if (!posts.length) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const limit = Number(req.query.limit) || 10; // Set a default limit (10 in this case)
        const skip = Number(req.query.skip) || 0; // Set a default skip value (0 in this case)

        const items = await prisma.post.findMany({
            take: limit,
            skip: skip,
        });

        const pageCount = Math.ceil(items.length / limit);
        const currentPage = Math.ceil((skip + 1) / limit);

        return res.status(200).json({
            posts,
            pageCount,
            currentPage,
            items,
            pages: paginate.getArrayPages(req)(3, pageCount, currentPage),
        });
    } catch (err: any) {
        console.log(err.message);
        return res.status(500).json({ message: 'An error occured' });
    }
};

// @desc Get posts by group id
// @route GET /groups/:id/posts
// @access private
export const getPostsByGroupId = async (
    req: express.Request | any,
    res: express.Response
) => {
    try {
        const { group_id } = req.params;
        if (!group_id) {
            return res.status(400).json({ message: 'Post ID required' });
        }

        const posts = await getAllPostsByGroupId(parseInt(group_id));
        if (!posts.length) {
            return res.status(404).json({ message: 'Posts not found' });
        }

        return res.status(200).json(posts);
    } catch (err: any) {
        console.log(err.message);
        return res.status(500).json({ message: 'An error occured' });
    }
};

// @desc GET posts
// @route GET /user_id/posts
// @access private
export const getPostsByUserId = async (
    req: express.Request | any,
    res: express.Response
) => {
    try {
        const { user_id } = req.params;
        if (!user_id) {
            return res.status(400).json({ message: 'User ID required' });
        }

        const posts = await getAllPostsByUserId(Number(user_id));
        if (!posts.length) {
            return res.status(404).json({ message: 'Posts not found' });
        }

        return res.status(200).json(posts);
    } catch (err: any) {
        console.log(err.message);
        return res.status(500).json({ message: 'An error occured' });
    }
};

// @desc Get post
// @route GET /posts/:id
// @access public
export const getPost = async (
    req: express.Request | any,
    res: express.Response
) => {
    try {
        const { post_id } = req.params;
        if (!post_id) {
            return res.status(400).json({ message: 'Post ID required' });
        }

        const post = await getPostById(parseInt(post_id));
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const updatedPost = await updatePostById(post.id, {
            ...post,
            view_count: (post?.view_count ?? 0) + 1,
        });

        if (!updatedPost) {
            return res.status(400).json({ message: 'Invalid data received' });
        }

        return res.status(200).json(updatedPost);
    } catch (err: any) {
        return res
            .status(500)
            .json({ message: `An error occured: ${err.message}` });
    }
};

// @desc Create post
// @route POST /groups/:id/posts
// @access private
export const createPost = async (
    req: express.Request | any,
    res: express.Response
) => {
    try {
        const { title, content, image_url, tags } = req.body;
        if (!title || !content || !image_url) {
            return res.status(400).json({ message: 'All fields required' });
        }

        const { group_id } = req.params;
        if (!group_id) {
            return res.status(400).json({ message: 'Group ID required' });
        }

        const group = await getGroupById(parseInt(group_id));
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        // Check if the user has joined group yet
        const userGroup = await getUserGroupByUserIdAndGroupId(
            req.user.id,
            parseInt(group_id)
        );
        if (!userGroup) {
            return res.status(404).json({
                message:
                    'User not found, must join the group first before create a new post',
            });
        }

        const post = await createNewPost({
            title,
            content,
            image_url,
            user_id: req.user.id,
            group_id: parseInt(group_id),
        });

        if (!post) {
            return res.status(400).json({ message: 'Invalid data received' });
        }

        tags.map(async (tagName: string) => {
            let tag = await getTagByName(tagName.toLowerCase());
            if (!tag) {
                tag = await createNewTag({ name: tagName.toLowerCase() });
            }

            await createNewPostTag({
                post_id: post.id,
                tag_id: tag.id,
            });
        });

        return res.status(201).json(post);
    } catch (err: any) {
        console.log(err.message);
        return res.status(500).json({ message: 'An error occured' });
    }
};

// @desc Update post
// @route PATCH /posts/:id
// @access private
export const updatePost = async (
    req: express.Request | any,
    res: express.Response
) => {
    try {
        const { title, content, image_url } = req.body;
        if (!title || !content || !image_url) {
            return res.status(400).json({ message: 'All fields required' });
        }

        const { post_id } = req.params;
        if (!post_id) {
            return res.status(400).json({ message: 'Post ID required' });
        }

        const post = await getPostById(parseInt(post_id));
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if post is associated with authorized user
        if (post.user_id !== req.user.id) {
            return res.status(403).json({ message: 'User is not authorized' });
        }

        console.log(post.id, typeof post.id);

        const updatedPost = await updatePostById(post.id, {
            ...post,
            title,
            content,
            image_url,
        });

        if (!updatedPost) {
            res.status(400).json({ message: 'Invalid data received' });
        }

        return res.status(200).json(updatedPost);
    } catch (err: any) {
        console.log(err.message);
        return res.status(500).json({ message: 'An error occured' });
    }
};

// @desc Delete post
// @route DELETE /posts/:id
// @access private
export const deletePost = async (
    req: express.Request | any,
    res: express.Response
) => {
    try {
        const { post_id } = req.params;
        if (!post_id) {
            return res.status(400).json({ message: 'Post ID required' });
        }

        const post = await getPostById(parseInt(post_id));
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if post is associated with authorized user
        if (post.user_id !== req.user.id) {
            return res.status(403).json({ message: 'User is not authorized' });
        }

        const result = await deletePostById(post.id);
        if (!result) {
            return res.status(400).json({ message: 'Invalid data received' });
        }

        return res
            .status(200)
            .json(`Post with id: ${result.id} has been deleted`);
    } catch (err: any) {
        console.log(err.message);
        return res.status(500).json({ message: `An error occured` });
    }
};
