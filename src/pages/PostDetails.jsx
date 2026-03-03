import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import Loading from './Loading'
import PostItem from '../components/PostItem'

export default function PostDetails() {

    const { id } = useParams()

    const { isError, isLoading, data } = useQuery({
        queryKey: ['postDetails', id],
        queryFn: getSinglePost
    })

    function getSinglePost() {
        return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    if (isError) {
        return <h3 className='text-center text-red-500'>some error occurred</h3>
    }



    return (
        <div>
            <PostItem postItem={data?.data?.data?.post} isHome={false}></PostItem>
        </div>
    )
}
