import { Text, Flex, Avatar, Box, Image, AvatarGroup, Button } from '@chakra-ui/react';
import { AiTwotoneDelete } from "react-icons/ai";
import {useMutation , useQueryClient} from "@tanstack/react-query"
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import Action from "../components/Action";

const Userpost = ({ post, user }) => {
   const queryClient = useQueryClient();
   const currentUser =  useSelector(state => state.user.isUser)
   if (!post) {
      return (
         <Text fontWeight="semibold" fontSize="xl" mt="10rem">
            Post is not found
         </Text>
      );
   }

   const {mutateAsync , isPending} = useMutation({
      mutationFn : async () => {
         try {
            const request = await fetch(`/api/post/${post?._id}`, {
               method : 'DELETE'
            })
            return await request.json()
         } catch (error) {
            console.log("Error in deletepost",error)
         }
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["getuserdata"] })
     }
   })

   const handleDelete = async (e) => {
      e.preventDefault()
      await mutateAsync()
   }

   return (
      <Link to={`/${user?.username}/post/${post._id}`}>
         <Flex gap={2} mt={["20vw", "20vw", "9.5vw", "8vw", "5vw"]}>
            <Flex direction="column" alignItems="center">
               <Avatar src={user?.profilePic} />
               <Box w='1px' h="full" bg='gray.light' my={2}></Box>
               <Flex position="relative">
                  <AvatarGroup size='xs' max={2}>
                     {post?.replies.map((reply, index) => (
                        <Avatar key={index} src={reply?.userProfilePic} />
                     ))}
                  </AvatarGroup>
                  {post?.replies?.length === 0 && '🥱'}
               </Flex>
            </Flex>

            <Flex direction="column"  width="full">
               <Flex justifyContent="space-between" w="full">
                  <Flex gap={1} alignItems="center">
                     <Text fontWeight="bold">{user?.username}</Text>
                     <Image w="20px" h="20px" src='/verified.png' />
                  </Flex>
                  <Flex gap={2} alignItems="center">
                     <Text color="gray.light">{post?.createdAt.slice(0,10)}</Text>
                  {currentUser.id === user._id && (
                     <Button size="md" isLoading={isPending} ><AiTwotoneDelete onClick={handleDelete} size={"1.5rem"}/></Button>
                  )}
                  </Flex>
               </Flex>
               <Text mt={2} mb={3}>{post?.text}</Text>
               <Image src={post?.img} w="full" borderRadius="14px" />
               <Action post={post} />
            </Flex>
         </Flex>
      </Link>
   )
}

export default Userpost;
