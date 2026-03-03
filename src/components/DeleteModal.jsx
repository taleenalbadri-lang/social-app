import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from 'react-toastify'
import { useQueryClient } from "@tanstack/react-query";
import Loading from "../pages/Loading";

export default function DeleteModal({ postId }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    //handle delete post

    function handleDeletePost() {
        return axios.delete(`https://route-posts.routemisr.com/posts/${postId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

    const queryClient = useQueryClient();

    const { mutate, data, isPending} = useMutation({
        mutationFn: handleDeletePost,
        onSuccess: () => {
            toast.success('Post deleted successfully')
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            queryClient.invalidateQueries({ queryKey: ['postdetails', id] });
        }
    })

    function handleDel() {
        mutate()
    }

    if(isPending) return <Loading></Loading>

    return (
        <>
            <Button variant="light" onPress={onOpen}>
                <i className="fa-solid fa-trash text-red-400"></i>
            </Button>
            <Modal
                backdrop="opaque"
                classNames={{
                    body: "py-6",
                    backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                    base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                    header: "border-b-[1px] border-[#292f46]",
                    footer: "border-t-[1px] border-[#292f46]",
                    closeButton: "hover:bg-white/5 active:bg-white/10",
                }}
                isOpen={isOpen}
                radius="lg"
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <div>
                            <ModalBody>
                                <p>
                                    Are you sure you want to delete this post?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="foreground" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button onClick={handleDel} className="bg-red-400 shadow-lg shadow-red-400/20" onPress={onClose}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </div>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}