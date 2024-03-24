import {
    Box,
    Button, Modal,
    ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader,
    ModalOverlay, Text, Textarea,
    useDisclosure
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import { TbMessageCircle } from "react-icons/tb";
import {useMutation, useQueryClient} from '@tanstack/react-query'

const ReplytoPost = ({post}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const user  = useSelector(state => state.user.isUser)
    const { register, formState: { errors }, handleSubmit, reset } = useForm()
    const postId = post._id
    const queryClient = useQueryClient()

    // api
    const {mutateAsync,isPending} = useMutation({
        mutationFn : async (data) =>  {
            const request = await fetch(`/api/post/reply/${postId}`,{
                method : "PUT",
                headers: {
                    "Content-Type": "application/json" // Specify content type as JSON
                },
                body: JSON.stringify(data)
            })
            const response = await request.json() 
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getuserdata"] })
            queryClient.invalidateQueries({ queryKey: ["homepage"] })
            queryClient.invalidateQueries({ queryKey: ["postdetail"] })
        }
    })

    const onFormSubmit = async (data) => {
        try {
            const text = data.text
            const requestData = { text }
            await mutateAsync(requestData)
            reset()
            onClose()
        } catch (error) {
            console.log(error)
        }
    }

    if(!user) {
        return null
    }
    return (
        <>
            <Box as='button'
                onClick={onOpen}
            > <TbMessageCircle />
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent w={["330px", "330px", "450px", "450px", "450px"]}>
                    <ModalHeader>Reply to Post</ModalHeader>
                    <ModalCloseButton />


                    <ModalBody>
                        <form onSubmit={handleSubmit(onFormSubmit)}>
                            <Textarea placeholder='write your reply'
                                {...register("text", { required: "Text is required" })} mb={"15px"}
                            />
                             {errors.text && <Text color={"red"} fontWeight="semibold" fontSize="sm">{errors.text.message}</Text>}
                            <ModalFooter >
                                <Button type="submit" disabled={isPending} bg={"green.500"}>Submit</Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ReplytoPost;
