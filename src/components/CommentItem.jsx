import React from 'react'
import { CardHeader, Divider } from "@heroui/react";
import { convertDate } from "../utilites/formatedate";

export default function CommentItem({ comment }) {


    //static src img
    const STATIC_IMAGE = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiuPA-6FxBP6qL8xYtvJ88b-bvMXSYFhFxgQ&s";

    return (
        <>
            <CardHeader className="flex gap-3 justify-between w-full items-center">
                <div className=''>
                    <div className='flex gap-3'>
                        <img
                            alt={comment?.commentCreator?.name}
                            height={40}
                            className="rounded-full object-cover"
                            src={comment?.commentCreator?.photo}
                            width={40}
                            onError={(e) => {
                                e.target.src = STATIC_IMAGE;
                            }}
                        />
                        <div className="flex flex-col">
                            <p className="text-sm">{comment?.commentCreator?.name}</p>
                            <p className="text-xs text-default-500">{convertDate(comment?.createdAt)}</p>
                        </div>

                    </div>
                    <div>
                        <p className='text-sm font-light ms-2 mt-3'>{comment?.content}</p>
                        <img src={comment?.image} alt="" />
                    </div>
                </div>
                <div>
                    <i className='fa-solid fa-ellipsis'></i>
                </div>
            </CardHeader>
        </>
    )
}
