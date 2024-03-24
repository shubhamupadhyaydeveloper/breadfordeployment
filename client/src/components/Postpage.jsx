import { Text, Flex, Box, Avatar, Image, Divider, Button, Spinner } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useQuery } from "@tanstack/react-query"
import Action from './Action';
import React, { useState } from 'react'
import Comment from './Comment';
import { useParams } from 'react-router-dom'
const Postpage = () => {
    const { postId, username } = useParams()
    const loginUser = useSelector(state => state.user.isUser)
    const [post, setPost] = useState('')
    const [user, setUser] = useState('')
    // api
    const { isLoading } = useQuery({
        queryKey: ['postdetail'],
        queryFn: async () => {
            try {
                const request = await fetch(`/api/post/${username}/post/${postId}`);
                const response = await request.json()
                setPost(response.post)
                setUser(response.user[0])
                return response;
            } catch (error) {
                console.log('Error in postDetail', error)
            }
        }
    })


    if(!loginUser) {
         return null
    }

    if ((!user || !post) && isLoading) {
        return (
            <Flex justifyContent="center" alignItems="center" h="100px">
                <Spinner size="xl" mt={"15vh"} />
            </Flex>
        )
    }

    if ((!user || !post) && !isLoading) return (
        <>
            <Text fontWeight={'semibold'} fontSize={"2xl"} mt={'10vh'}>User and Post Not Found</Text>
        </>
    )

    return (
        <Flex alignItems={"start"} direction={"column"}
            mt={["20vw", "20vw", "9.5vw", "7vw", "5.5vw"]}
            mb={"5vh"}
        >
            <Flex justifyContent={"space-between"} w="full">
                <Flex gap={2} alignItems={"center"}>
                    <Avatar size={"md"} src={user?.profilePic} />
                    <Text fontSize={"bold"}>{user?.username}</Text>
                    <Image w={"20px"} h={"20px"} src='/verified.png' />
                </Flex>
                <Flex gap={4} alignItems={"center"}>
                    <Text color={"gray.light"}>{user?.createdAt.slice(0,10)}</Text>
                </Flex>
            </Flex>
            <Text mt={4} mb={2}>{post?.text}</Text>
            <Image w="full" borderRadius="12px" src={post?.img} />
            <Action post={post}/>
            <Divider mt={3} />
            <Flex justifyContent="space-between" w="full" alignItems="center" mt={3}>
                <Flex gap={2}>
                    👋 Get the app to like, reply and post
                </Flex>
                <Button w="3.5vw" bg="gray.dark" borderRadius="12px"><Text color={"white"}>Get</Text></Button>
            </Flex>
            <Divider mt={3} />
            {post?.replies?.map((detail) =>  {
               return <Comment userDetail={detail} key={detail._id} />
            })}
        </Flex>
    )
}

export default Postpage;
