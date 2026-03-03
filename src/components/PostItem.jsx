import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@heroui/react";
import { convertDate } from "../utilites/formatedate";
import CommentItem from "./CommentItem";
import { NavLink } from "react-router-dom";
import AddComment from "./AddComment";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";
import { useQueryClient } from "@tanstack/react-query";


export default function PostItem({ postItem, isHome }) {

    //context

    const { userData } = useContext(authContext)

    const { image, user, createdAt, body } = postItem

    const { data } = useQuery({ queryKey: ['comments', postItem?._id], queryFn: getPostComments })

    const firstComment = data?.data?.data?.comments?.[0]


    function getPostComments() {
        return axios.get(`https://route-posts.routemisr.com/posts/${postItem?._id}/comments?page=1&limit=10`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

    }

    //handle like

    function handleLike() {
       return axios.put(`https://route-posts.routemisr.com/posts/${postItem?._id}/like`,{}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

    const queryClient = useQueryClient()

    const { data:likeData , mutate} = useMutation({
        mutationFn: handleLike,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
            queryClient.invalidateQueries({ queryKey: ['profile'] })
            queryClient.invalidateQueries({ queryKey: ['postdetails', postItem?._id] })
        }
    })    

    return (
        <Card className="my-10 p-5 dark:bg-mauve-600 rounded-3xl">
            <CardHeader className="flex justify-between">
                <div className="flex items-center gap-3">
                    <Image
                        alt={user?.name}
                        height={60}
                        radius="full"
                        src={user?.photo}
                        width={60}
                    />
                    <div className="flex flex-col">
                        <p className="text-md">{user?.name}</p>
                        <p className="text-small text-default-500">{convertDate(createdAt)}</p>
                    </div>
                </div>
                {userData?.id === postItem?.user?._id && <div className="flex">
                    <DeleteModal postId={postItem?._id} />
                    <UpdateModal postId={postItem?._id} post={postItem} />
                </div>}

            </CardHeader>
            <Divider />
            <CardBody>
                <p className="mb-4">{body}</p>
                <img src={image} className="w-full" alt="" />
            </CardBody>
            <Divider />
            <CardFooter>
                <div className="flex justify-between items-center w-full text-center text-white">
                    <div className="like cursor-pointer">
                        <i onClick={mutate} className={`fa-solid fa-thumbs-up text-sm ${postItem?.likesCount ? 'text-blue-400' : 'text-white'}`}></i>
                        <p className={`text-xs ${postItem?.likesCount ? 'text-blue-400' : 'text-white'}`}>{postItem?.likesCount} Likes </p>
                    </div>
                    <div className="comment">
                        <i className="fa-solid fa-comment text-sm"></i>
                        <p className={`text-xs ${postItem?.commentsCount ? 'text-blue-400' : 'text-white'}`}>{postItem?.commentsCount} Comments </p>
                    </div>
                    <div className="share">
                        <i className="fa-solid fa-share text-sm"></i>
                        <p className="text-xs">{postItem?.sharesCount} Share</p>

                    </div>
                </div>
            </CardFooter>

            <Divider />

            {/* add comment */}
            <AddComment postId={postItem?._id}></AddComment>

            {isHome && <NavLink to={`/postdetails/${postItem._id}`} className="text-sm text-blue-400 cursor-pointer my-3">More Comments</NavLink>}

            {/* first comment */}
            {firstComment && <CommentItem comment={firstComment}></CommentItem>}

            {!isHome && data?.data?.data?.comments?.map(comment => <CommentItem key={comment._id} comment={comment} ></CommentItem>)}

        </Card>
    );
}
