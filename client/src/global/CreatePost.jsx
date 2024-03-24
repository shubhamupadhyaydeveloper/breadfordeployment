import { AddIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import { Button, CloseButton, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useDisclosure } from '@chakra-ui/react';
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useShowToast from '../hook/ShowToast';
import { FaRegImage } from "react-icons/fa6";
import React, { useRef, useState } from 'react'

const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [update, setUpdate] = useState(false)
    const user = useSelector(state => state.user.isUser)
    const showToast = useShowToast()
    const maxSize = 100 * 1024;
    const [imgUrl, setImgUrl] = useState('')
    const { register, formState: { errors }, handleSubmit, reset } = useForm()
    const queryClient = useQueryClient()

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file.size > maxSize) {
            setImgUrl(null)
            showToast("filesize is too large choose other image", "error")
            return;
        } else {
            const fileReader = new FileReader()
            fileReader.onload = () => {
                setImgUrl(fileReader.result)
            }
            fileReader.readAsDataURL(file)
            setImgUrl(file)
        }
    }

    const fileref = useRef(null)

    // api call
    const { mutateAsync } = useMutation({
        mutationFn: async (data) => {
            const request = await fetch('/api/post/create', {
                method: 'POST',
                body: data
            })
            if (!request.ok) {
                return new Error('Error in Create post')
            }
            const response = await request.json()
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getuserdata"] })
        }
    })

    const onFormSubmit = async (data) => {
        setUpdate(true)
        try {
            const formData = new FormData()
            formData.append('postedBy', user.id)
            formData.append("img", imgUrl)
            formData.append("text", data.text)
            const request = await mutateAsync(formData)
            reset()
            setImgUrl(null)
            showToast("Post created sucessfully", "success")
            onClose()
        } catch (err) {
            console.log("Error in create post", err.message)
        } finally {
            setUpdate(false)
        }
    }

    return (
        <>
            <Button
                position={"fixed"}
                width={["","","120px"]}
                mr={['','','',"5rem",""]}
                bottom={10}
                bg="rgba(255, 255, 255, 0.2)"
                backdropFilter="blur(8px)"
                right={10}
                leftIcon={<AddIcon  />}
                onClick={onOpen}
            >Post</Button>

            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent w={["330px", "330px", "450px", "450px", "450px"]}>
                    <ModalHeader>Create Your Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <form onSubmit={handleSubmit(onFormSubmit)}>
                            <Textarea {...register("text", { required: "Text is required" })} mb={"15px"} />
                            {errors.text && <Text color={"red"} fontWeight="semibold" fontSize="sm">{errors.text.message}</Text>}
                            <input type='file'
                                onChange={handleFileChange}
                                hidden ref={fileref}
                            />
                            <Text>File size less 100kb</Text>
                            <FaRegImage size={"18px"} onClick={() => fileref.current.click()} cursor={"pointer"} />

                            {imgUrl && (
                                <Flex w="full" position="relative" mt="5px">
                                    <Image src={imgUrl} />
                                    <CloseButton
                                        position="absolute"
                                        onClick={() => setImgUrl(null)}
                                        top={2}
                                        bg={"gray.500"}
                                        right={2}
                                    />
                                </Flex>
                            )}

                            <ModalFooter>
                                <Button type="submit" bg={"green.500"} isLoading={update} >Submit</Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>


                </ModalContent>
            </Modal>

        </>
    )
}

export default CreatePost;
