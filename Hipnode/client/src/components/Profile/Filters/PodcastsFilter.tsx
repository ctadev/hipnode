import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'

import { PodcastFilterCard } from './'
import { User } from '../../../../types';
import { useGetUsers } from '../../../../hooks/useUsers';




const getPostsByUserId = async ( profileId ) => {
    const res = await axios.get(`${import.meta.env.VITE_DEV_BACKEND_URL}/users/${profileId}/podcasts`, 
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') ?? '').token}`
            }
        })
    return res.data
}


const PodcastsFilter = () => {
    const navigate = useNavigate();
    const { profileId } = useParams();
    const { data, isLoading, isError } = useQuery('podcasts', () => getPostsByUserId(profileId));
	const [users, setUsers] = useState<User[]>([])
	const getUsers = useGetUsers()



	useEffect(() => {
		const sortUsers = () => {
			getUsers.mutateAsync().then((result) => {
				setUsers(result);
			});
		}
		sortUsers()
	}, [])
	
	
	return (
		<div className="flex flex-col gap-5 lg:w-full mt-6">
			<div className="dark:bg-dark-black-1 rounded-lg lg:mt-0">
				<div className="flex flex-col gap-[20px]">
					{data?.map((data, index) => (
						<PodcastFilterCard
							key={index}
							podcast={data}
							user={users.find((user) => user?.id === data?.user_id)}
							editType="podcasts"
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default PodcastsFilter