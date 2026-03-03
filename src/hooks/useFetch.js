import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useFetch() {

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

  return { data, isError, isLoading, isFetching, refetch }

}