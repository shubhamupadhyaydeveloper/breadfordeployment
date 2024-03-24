import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { PiDotsThreeCircle } from "react-icons/pi";
import { VStack, Box, Flex, Text, Avatar, Menu, MenuButton, MenuList, Portal, MenuItem, Button } from '@chakra-ui/react';
import useShowToast from '../hook/ShowToast';
import { Link } from 'react-router-dom';

const Userheader = ({ user }) => {
  const showToast = useShowToast()
  const [updating, setUpdating] = useState(false)
  const currentUser = useSelector(state => state.user.isUser)
  const [follower, setFollower] = useState(user?.followers?.includes(currentUser.id))

  const handleClick = async () => {
    setUpdating(true)
    try {
      const request = await fetch(`/api/user/follow/${user._id}`, {
        method: 'POST'
      })
      const response = await request.json()
      if (follower) {
        showToast(`Unfollowed ${user.name}`, "success");
        user.followers.pop(); // simulate removing from followers
      } else {
        showToast(`Followed ${user.name}`, "success");
        user.followers.push(currentUser?.id); // simulate adding to followers
      }
      setFollower(!follower);

    } catch (err) {
      console.log("Error in follower", err.message)
    } finally {
      setUpdating(false)
    }
  }
  const handleiconclick = () => {
    const requesturl = window.location.href
    navigator.clipboard.writeText(requesturl).then(() => {
      showToast("Link is copied", 'success')
    })
  }

  return (
    <VStack
      gap={4}
      alignItems={"start"}
      mt={["20vw", "20vw", "9.5vw", "5.5vw", "5.5vw"]}
      mb={["-10vw", "-10vw", "-6vw", "-6vw", "-3vw"]}
    >
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontWeight={'bold'} fontSize='30px'>{user?.name}</Text>
          <Flex >
            <Flex gap={3}>
              <Text >{user?.username}</Text>
              <Text
                borderRadius={'full'}
                bg={"gray.600"}
                fontSize={"xs"}
                p={1}
              >threads.net</Text>
            </Flex>
          </Flex>
        </Box>
        <Avatar
          src={user?.profilePic}
          size={"xl"}
        />
      </Flex>
      <Text>{user?.bio || "User bio"}</Text>
      {
        user?._id === currentUser?.id ? <Button ><Link to='/update'>Profile</Link></Button> : <Button onClick={handleClick} isLoading={updating}>{follower ? "Unfollow" : "follow"}</Button>
      }

      <Flex justifyContent={"space-between"} w={'full'} mb={4}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>{user?.followers?.length || 0} followers</Text>
          <Box w='1' h='1' bg={"gray.light"} borderRadius={"full"}></Box>
          <Text color={"gray.light"}>{user?.following?.length || 0} following</Text>
          {currentUser.id === user._id && (
            <Button>
              <Link to={`/${user?.username}/details`}>
                See
              </Link>
            </Button>
          )}
        </Flex>

        <Flex gap={2} >
          <Box>
            <Menu>
              <MenuButton><PiDotsThreeCircle size="30px" /></MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem onClick={handleiconclick} bg={"gray.dark"}>Copy Linked</MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>

      <Flex w={"full"} >
        <Flex flex={1} borderBottom={"1px solid white"} justifyContent={"center"} pb='3' cursor={"pointer"}>
          <Text color={"gray.300"}>
            Threads
          </Text>
        </Flex>
        <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} pb='3' cursor={"pointer"}>
          <Text color={"gray.600"}>
            Replies
          </Text>
        </Flex>
      </Flex>
    </VStack>
  )
}

export default Userheader;
