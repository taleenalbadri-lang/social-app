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


export default function DeleteComment({ postId, commentId }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const queryClient = useQueryClient();

    function handleDeleteComment() {
        return axios.delete(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }


    const { mutate, data, isPending } = useMutation({
        mutationFn: handleDeleteComment,
        onSuccess: () => {
            toast.success('Comment deleted successfully')
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            queryClient.invalidateQueries({ queryKey: ['postdetails', postId] });
            queryClient.invalidateQueries({ queryKey: ['comments', postId] });
        }
    })

    console.log(data);


    function handleDelComment() {
        mutate()
    }

    if (isPending) return <Loading></Loading>

    return (
        <>
            <Button variant="light" onPress={onOpen}>
                <i className="fa-solid fa-ellipsis"></i>
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
                                    Are you sure you want to delete this comment?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="foreground" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button onClick={handleDelComment} className="bg-red-400 shadow-lg shadow-red-400/20" onPress={onClose}>
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