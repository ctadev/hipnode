import React, { useState, useEffect } from 'react'

import { useGetUsers } from "../../hooks/useUsers"
import { avatar, heartLight, more, reply, heartLiked } from "../assets"
import { User } from '../../types'
import { useCommentLike, useCommentUnlike, useGetCommentLikes, usePostLike, usePostUnlike } from '../../hooks/useLikes'
import { formatDate } from '../../utils/formateDate'
import { IComment } from '../../types'

type Props = {
    comment: {
        content: string,
        created_at: string,
        id: number,
        post_id: number,
        updated_at?: string,
        user_id: number,
    },
    loggedInUser: {
        id: string,
        token: string,
        username: string,
    },
    postComments: IComment[]
}


const PostCommentCard = ({ comment, loggedInUser, postComments }: Props) => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState<User>()
    const [formattedDate, setFormattedDate] = useState<string>("")
    const [isFavorited, setIsFavorited] = useState<boolean>(false)
    const [commentLikes, setCommentLikes] = useState([])
    const getUsers = useGetUsers()
    const getCommentLikes = useGetCommentLikes()
    const likeComment = useCommentLike()
    const unlikeComment = useCommentUnlike()

    const filterUser = () => {
        const filteredUser = users.filter((user: any) => user.id === comment.user_id)
        setUser(filteredUser[0])
    }

    const toggleLike = () => {
        if (isFavorited) {
            unlikeComment.mutateAsync({
                data: { comment_id: comment.id, user_id: loggedInUser.id },
                token: loggedInUser.token
            }).then(() => {
                setIsFavorited(false)
            })
        } else {
            likeComment.mutateAsync({
                data: { comment_id: comment.id, user_id: loggedInUser.id },
                token: loggedInUser.token
            }).then(() => {
                setIsFavorited(true)
            })
        }
    }

    const checkIfFavorited = () => {
        if (commentLikes && loggedInUser) {
            setIsFavorited(commentLikes.some((like: any) => like.user_id === loggedInUser.id && like.comment_id === comment.id));
        }
    }

    useEffect(() => {
        getUsers.mutateAsync().then((result) => {
            setUsers(result);
        });
        getCommentLikes.mutateAsync().then((result) => {
            setCommentLikes(result);
        });
        setFormattedDate(formatDate(comment.created_at))
    }, [])

    useEffect(() => {
        if (users.length > 0) {
            filterUser()
            checkIfFavorited()
        }
    }, [users, commentLikes, postComments])

    if (!user) return null

    return (
        <div className='flex gap-5 items-start'>
            <button type="button">
                <img src={user?.avatar ?? avatar} alt='user' className='object-cover rounded-full shrink-0 w-[45px] h-[45px]' />
            </button>
            <div className='flex flex-col gap-5'>
                <div className='flex flex-col border border-dark-grey-4 py-6 px-4 rounded-2xl gap-[15px]'>
                    <p className='text-sm lg:text-base font-semibold dark:text-grey-2'>{user.username} • <span className='text-xs lg:text-sm font-normal'>{formattedDate} {(comment.updated_at && comment.updated_at != comment.created_at) && `• Edited on ${formatDate(comment.updated_at)}`}</span></p>
                    <p className='text-sm lg:text-base text-dark-grey-2'>{comment.content}</p>
                </div>
                <div className='flex gap-5 px-4'>
                    <img src={isFavorited ? heartLiked : heartLight} alt='like' className='object-contain w-5 h-5 cursor-pointer' onClick={toggleLike} />
                    <img src={reply} alt='reply' className='object-contain w-5 h-5 cursor-pointer' />
                    <img src={more} alt='more' className='object-contain w-5 h-5 cursor-pointer' />
                </div>
            </div>
        </div>
    )
}

export default PostCommentCard