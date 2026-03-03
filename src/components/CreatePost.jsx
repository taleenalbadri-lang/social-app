import React from 'react'
import { useState, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

export default function CreatePost() {
    const [isOpen, setOpen] = useState(false)
    const [imgPreview, setImgPreview] = useState(null)

    //ref
    const fileInput = useRef(null)
    const bodyInput = useRef(null)

    // invalid queries // عشان ما أحتاج اعمل ريفرش عشان يظهر البوست
    const queryClient = useQueryClient()

    const { isPending, isError, error, data, mutate } = useMutation({
        mutationFn: handleCreatePost,
        onSuccess: () => {
            toast.success(data?.data?.data?.message)
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
        onSettled: () => {
            handleMenuCancel()
        }
       
    })

    function handlePostSubmit() {
        const formData = new FormData()
        if (bodyInput.current.value) formData.append('body', bodyInput.current.value)
        if (fileInput.current.files[0]) formData.append('image', fileInput.current.files[0])

        mutate(formData)
    }

    function handleCreatePost(formData) {
        return axios.post(`https://route-posts.routemisr.com/posts`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

    function handleMenuOpen() {
        setOpen(true)
    }

    function handleMenuCancel() {
        setOpen(false)
        bodyInput.current.value = ''
        closeBtn()
    }

    function handleImage(e) {
        const file = e.target.files[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setImgPreview(url)
        }
    }

    function closeBtn() {
        setImgPreview(null)
        fileInput.current.value = null
    }

    if (isError) {
        toast.error(error?.response?.data?.message)
    }


    return (
        <>
            <div className="editor mx-auto flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg dark:bg-mauve-600 rounded-2xl">
                <input onClick={handleMenuOpen} className="title bg-gray-200 border border-gray-300 p-2 outline-none" spellCheck="false" placeholder="Create Post..." type="text" ref={bodyInput} />
                {/* image preview*/}
                {imgPreview && <div className='relative'>
                    <img src={imgPreview} className='w-1/3 mt-5' alt="" />
                    <i onClick={closeBtn} className='fa-solid fa-close fa-2x cursor-pointer absolute top-7 left-1 text-gray-500'></i>
                </div>}
                {/* file input */}
                <input type="file" onChange={handleImage} className="hidden" id="fileInput" ref={fileInput} />
                {/* icons */}
                {isOpen &&
                    <div className="icons flex text-gray-500 m-2 justify-between mt-5">
                        <label for="fileInput"><svg className="mr-2 cursor-pointer dark:text-default-600 text-gray-700 hover:text-gray-500 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg></label>
                        <div className="buttons flex">
                            <div onClick={handleMenuCancel} className="btn border border-gray-400 p-1 px-4 font-semibold cursor-pointer text-gray-400 ml-auto">Cancel</div>
                            <div onClick={handlePostSubmit} className="btn border border-blue-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-blue-500">{isPending?'Posting...':'Post'}</div>
                        </div>
                        
                    </div>
                }

            </div>
        </>

    )
}
