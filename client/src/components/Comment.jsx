import { Avatar, Flex, Text, Box, Divider } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import React, { useState } from 'react'
import Action from './Action';

const Comment = ({ userDetail }) => {
    return (
        <>
            <Box p={4} borderRadius="lg" width="full">
                <Flex alignItems="center" justifyContent="space-between" mb={2} width={"full"}>
                    <Flex alignItems="center" gap={4}>
                        <Avatar size="sm" src={userDetail?.userProfilePic} />
                        <Text fontWeight="bold">{userDetail?.username}</Text>
                    </Flex>
                    <Text fontSize="sm" color="gray.500">{userDetail?.createdAt?.slice(0,10)}</Text>
                </Flex>
                <Text fontSize="md" mb={2} pl={"2.5rem"}>{userDetail?.text}</Text>
                <Divider />
            </Box>

        </>
    )
}

export default Comment;
