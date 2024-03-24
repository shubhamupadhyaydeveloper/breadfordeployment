import { Avatar, Box, Divider, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

const AdditionalDetails = () => {
    const { username } = useParams()
    const [user, setUser] = useState({})

    useEffect(() => {
        const getProfile = async () => {
            const request = await fetch(`/api/user/profile/${username}`)
            const response = await request.json()
            setUser(response)
        }
        getProfile()
    }, [])

    if (!user) {
        return
    }
    return (
        <Box mt={["20vw", "20vw", "9.5vw", "7vw", "5.5vw"]}>
            <Tabs>
                <TabList>
                    <Tab>Followers</Tab>
                    <Tab>Following</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Flex flexDirection={"column"}>
                            {user && user?.followers?.length === 0 ? "Sorry you 0 followers" : user?.followers?.map((item) => (
                                <Flex key={`user-${item._id}`} gap={3} mt={5} alignItems={"center"}>

                                    <Avatar size="md" src={item?.profilePic} mt="1" />

                                    <Link to={`/${item?.username}`} >
                                        <Text fontSize={"xl"}>{item?.username}</Text>
                                    </Link>

                                </Flex>
                            ))}
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                    <Flex flexDirection={"column"}>
                            {user && user?.following?.length === 0 ? "Sorry you 0 followers" : user?.following?.map((item) => (
                                <Flex key={`user-${item._id}`} gap={3} mt={5} alignItems={"center"}>

                                    <Avatar size="md" src={item?.profilePic} mt="1" />

                                    <Link to={`/${item?.username}`} >
                                        <Text fontSize={"xl"}>{item?.username}</Text>
                                    </Link>

                                </Flex>
                            ))}
                        </Flex>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default AdditionalDetails;
