import { Box, Flex, Image, Spinner, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import useShowToast from '../hook/ShowToast';
import Userheader from '../components/Userheader';
import Userpost from './Userpost';
import { useParams } from 'react-router-dom';

const Userpage = () => {
  const [user, setUser] = useState('')
  const { username } = useParams()
  const [post, setPost] = useState([])
  const {isLoading} = useQuery({
    queryKey: ['getuserdata', username],
    queryFn: async () => {
      try {
        const request = await fetch(`/api/user/getuserdata/${username}`);
        if(!request.ok) {
          return 'User not found'
        }
        const userData = await request.json();
        setUser({
          _id: userData?._id,
          name: userData?.name,
          username: userData?.username,
          profilePic: userData?.profilePic,
          bio: userData?.bio,
          followers: userData?.followers,
          following : userData?.following
        });
        setPost(userData?.posts);
        return userData;
      } catch (error) {
        console.log(object)
      }
    }
  })


  if (!user && isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" h="100px">
        <Spinner size="xl" mt={"15vh"} />
      </Flex>
    )
  }
  if (!user && !isLoading) return (
    <>
       <Text fontWeight={'semibold'} fontSize={"2xl"} mt={'10vh'}>User Not Found</Text>
    </>
  )

  return (
    <Box mb={10}>
      <Userheader user={user} /> 
      {post?.length === 0 ? (
        <>
          <Flex alignItems={"center"} gap={"2rem"} flexDirection={"column"} mb={"2rem"}>
            <Text mt={"5rem"} fontWeight={"bold"} fontSize={"2xl"}>No Post Yet ,Create Post</Text>
            <Image src='/nopost.svg' width={["", "", "30rem", "30rem", "30rem"]} />
          </Flex>
        </>
      ) : (
        post?.map((item) => (
          <Userpost key={`hello-use${item?._id}`} post={item} user={user} />
        ))
      )}
    </Box>
  )
}

export default Userpage;
