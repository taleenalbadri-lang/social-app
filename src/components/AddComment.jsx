import React, { useRef } from 'react'
import { Button } from "@heroui/react";
import axios from 'axios';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';


export default function AddComment({ postId }) {

    const queryClient = useQueryClient()

    const { isPending, data, mutate: addcommentmutate } = useMutation({
        mutationFn: handleAddComment,
        onSuccess: () => {
            toast.success('Comment added successfully')
            queryClient.invalidateQueries({ queryKey: ['comments', postId] })

        },
        onError: () => {
            toast.error('Failed to add comment')
        },
        onSettled: () => {
            contentInput.current.value = ''
            setImage(null)
            setImagePreviewComment(null)
            imageInput.current.value = ''
        }
    })

    function handleAddComment(formData) {

        return axios.post(`https://route-posts.routemisr.com/posts/${postId}/comments`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

    const contentInput = useRef(null)
    const imageInput = useRef(null)
    const [image, setImage] = useState(null)
    const [imagePreviewComment, setImagePreviewComment] = useState(null)

    function handleCloseImage() {
        setImage(null)
        setImagePreviewComment(null)
        imageInput.current.value = ''
    }

    async function getDataInputs() {

        const formData = new FormData();
        if (contentInput.current.value) formData.append('content', contentInput.current.value);
        if (image) formData.append('image', image);

        addcommentmutate(formData)
    }

    function handleImage(e) {
        setImage(e.target.files[0])
        const url = URL.createObjectURL(e.target.files[0])
        setImagePreviewComment(url)
    }

    return (
        <div>

            <form className="w-full my-3 mx-auto">
                <label htmlFor="search" className="block mb-2.5 text-sm font-medium text-heading sr-only ">Add Comment</label>

                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    </div>

        
                    <input type="text" id="search" className="block rounded-md w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-500 text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Add a comment..." ref={contentInput} />
                    <input type="file" id={`fileCommentInput-${postId}`} className='hidden' onChange={handleImage} value={''} ref={imageInput} />
                    <label htmlFor={`fileCommentInput-${postId}`} className='absolute top-2.5 start-2 cursor-pointer'><i className='fa-solid fa-paperclip text-sm'></i></label>

                    {imagePreviewComment && <div className='size-40 mt-4 relative'>
                        <img src={imagePreviewComment} className='w-full object-cover' alt="" />
                        <i onClick={handleCloseImage} className='fa-solid fa-xmark absolute top-2 right-2 text-gray-500 cursor-pointer'></i>
                    </div>}

                    <Button onClick={getDataInputs} type="button" variant='solid' className="absolute end-1 top-1 text-white bg-brand hover:bg-brand-strong box-border border border-transparent shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none"> {isPending ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Add'}</Button>
                </div>
            </form>

        </div>
    )
}
