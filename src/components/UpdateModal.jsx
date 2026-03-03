import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Checkbox,
    Input,
    Link,
} from "@heroui/react";
import axios from "axios";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Loading from "../pages/Loading";
import { useQueryClient } from "@tanstack/react-query";


export const MailIcon = (props) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
                fill="currentColor"
            />
        </svg>
    );
};

export const LockIcon = (props) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M12.0011 17.3498C12.9013 17.3498 13.6311 16.6201 13.6311 15.7198C13.6311 14.8196 12.9013 14.0898 12.0011 14.0898C11.1009 14.0898 10.3711 14.8196 10.3711 15.7198C10.3711 16.6201 11.1009 17.3498 12.0011 17.3498Z"
                fill="currentColor"
            />
            <path
                d="M18.28 9.53V8.28C18.28 5.58 17.63 2 12 2C6.37 2 5.72 5.58 5.72 8.28V9.53C2.92 9.88 2 11.3 2 14.79V16.65C2 20.75 3.25 22 7.35 22H16.65C20.75 22 22 20.75 22 16.65V14.79C22 11.3 21.08 9.88 18.28 9.53ZM12 18.74C10.33 18.74 8.98 17.38 8.98 15.72C8.98 14.05 10.34 12.7 12 12.7C13.66 12.7 15.02 14.06 15.02 15.72C15.02 17.39 13.67 18.74 12 18.74ZM7.35 9.44C7.27 9.44 7.2 9.44 7.12 9.44V8.28C7.12 5.35 7.95 3.4 12 3.4C16.05 3.4 16.88 5.35 16.88 8.28V9.45C16.8 9.45 16.73 9.45 16.65 9.45H7.35V9.44Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default function UpdateModal({ postId, post }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const contentInput = useRef(null);
    const photoInput = useRef(null);

    const [imge, setImage] = useState(null);
    const [imageUpdatePreview, setImageUpdatePreview] = useState(null);

    const queryClient = useQueryClient();

    // handle update post

    function handleUpdatePost(formData) {
        return axios.put(`https://route-posts.routemisr.com/posts/${postId}`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

    //mutation

    const { mutate, data, error, isError, isPending } = useMutation({
        mutationFn: handleUpdatePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            queryClient.invalidateQueries({ queryKey: ['postDetails',id] });
        }
    })

    if (isPending) return <Loading></Loading>
    
    function handleImage(e) {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setImage(file);
        setImageUpdatePreview(url);
    }

    function handleUpdateReq() {
        const formData = new FormData();
        if (contentInput.current.value) formData.append('body', contentInput.current.value);
        if (imge) formData.append('image', imge);

        mutate(formData)
    }


    return (
        <>
            <Button variant="light" onPress={onOpen}>
                <i className="fa-solid fa-edit text-blue-400"></i>

            </Button>
            <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Update Your Post</ModalHeader>
                            <ModalBody>
                                <Input
                                    label="content"
                                    placeholder="Enter your content"
                                    variant="bordered"
                                    type="text"
                                    ref={contentInput}
                                    defaultValue={post?.body}
                                />
                                <Input

                                    label="image"
                                    placeholder="choose image"
                                    type="file"
                                    variant="bordered"
                                    onChange={handleImage}

                                />
                                {post?.image && <img src={imageUpdatePreview || post?.image} alt="" className="W-full h-50 object-cover rounded-lg" />}

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button onClick={handleUpdateReq} color="primary" onPress={onClose}>
                                    Update
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );

}