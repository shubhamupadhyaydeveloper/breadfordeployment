import { Flex, Box, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoHeartFill } from "react-icons/go";
import React, { useState } from 'react'
import { GoHeart } from "react-icons/go";
import useShowToast from '../hook/ShowToast';
import ReplytoPost from './ReplytoPost';

const Action = ({ post }) => {
    const showToast = useShowToast()
    const navigate = useNavigate()
    const user = useSelector(state => state.user.isUser)
    const [liked, setLiked] = useState(post?.likes?.includes(user.id))
    const handleLike = async () => {
        if (!user) {
            return (
                showToast("Login To liked post", 'error'),
                navigate('/auth/login')
            )
        }
        try {
            const request = await fetch(`/api/post/like/${post._id}`, {
                method: 'PUT'
            })
            const response = await request.json()
            if (!liked) {
                showToast(`liked`, "success");
                post.likes.push(user.id)
            } else {
                showToast(`unliked`, "success");
                post.likes.pop()
            }
            setLiked(!liked)
        } catch (error) {
            console.log(error)
        }

    }

    if(!post) {
        return null;
    }

    return (
        <Flex flexDirection={"column"}>
            <Flex mt={4} mb={5} alignItems="center" gap={["3", "3", "3"]} onClick={(e) => e.preventDefault()}>
                <Box fontSize={['1.2rem', '1.45rem', "2.4vw", "2.3vw", '1.35vw']}
                    onClick={handleLike}
                >
                    {liked ? (
                        <GoHeartFill fill='red' />
                    ) : <GoHeart />}
                </Box>

                <Box fontSize={['1.2rem', '1.45rem', "2.4vw", "2.3vw", '1.35vw']}>
                  <ReplytoPost post={post} />
                </Box>


            </Flex>
            <Flex color={"gray.light"} mt="-2" alignItems={"center"} gap={2}>
                <Text>{post?.replies?.length} replies</Text>
                <Box w='3px' h={"3px"} borderRadius="50px" bg='gray.light' my={2}></Box>
                <Text>{post?.likes?.length} likes</Text>
            </Flex>
        </Flex>
    )
}

export default Action;
