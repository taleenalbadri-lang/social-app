import React from 'react'
import axios from 'axios'
import Loading from './Loading'
import PostItem from '../components/PostItem'
import { useQuery } from '@tanstack/react-query'
import CreatePost from '../components/CreatePost'
import useFetch from '../hooks/useFetch'
import { Helmet } from 'react-helmet'

export default function Home() {

  // لو بدي استخدم الاختصار بدل ما اكتب الكود كل صفحة
  // const { data, isError, isLoading, isFetching, refetch } = useFetch()


  function getPosts() {
    return axios.get(`https://route-posts.routemisr.com/posts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  const { data, isError, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  })


  if (isLoading) {
    return <Loading></Loading>
  }

  if (isError) {
    return <h3 className='text-center text-red-500'>some error occurred</h3>
  }



  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>linked-posts/Home</title>
      </Helmet>
      <div className='lg:w-1/2 md:w-2/3 mx-auto my-9'>
        <CreatePost />
        {data?.data?.data?.posts.map(post => <PostItem key={post?._id} postItem={post} isHome={true}></PostItem>)}
      </div>
    </div>
  )
}
