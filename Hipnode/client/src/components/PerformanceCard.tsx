import React, { useEffect, useState} from 'react';
import { performanceimg } from '../assets';
import axios from 'axios';
import { useQuery } from 'react-query'
import { useGetComments } from '../../hooks/usePosts';
import { useNavigate } from 'react-router';

import { Post } from '../../types';



const PerformanceCard = ({ post }: Post) => {
	const [comments, setComments] = useState([])
	const navigate = useNavigate();

	useEffect(() => {
		const fetchCommentsByPostId = async () => {
			const response = await fetch(`${import.meta.env.VITE_DEV_BACKEND_URL}/posts/${post.id}/comments`)
			const data = await response.json()
			setComments(data)
		}
		fetchCommentsByPostId()
	}, [])
	
	return (
		<div className='flex justify-between md:w-[285px] md:h-[60px]'>
			<section>
				<img 
					src={post.image_url}
					alt="Performance"
					className='h-[50px] w-[50px] rounded-xl'
					onClick={() => {
						navigate(`/posts/${post.id}`);
						window.location.reload();
					}}
				/>
			</section>

			<section className='flex flex-col'>
				<div className='text-[#97989D] text-[16px] dark:text-white'>
					Views
				</div>
				<div className='text-[12px] dark:text-white text-center'>	
					{post.view_count}
				</div>
			</section>

			<section>
				<div className='text-[#97989D] text-[16px] dark:text-white'>
						Likes
				</div>
				<div className='text-[12px] dark:text-white text-center'>	
						6,500
				</div>
			</section>
			
			<section>
				<div className='text-[#97989D] text-[16px] dark:text-white'>
					Comments
				</div>
				<div className='text-[12px] dark:text-white text-center'>	
					{Array.isArray(comments) ? comments.length : 0}
				</div>
			</section>
		</div>
  )
}

export default PerformanceCard