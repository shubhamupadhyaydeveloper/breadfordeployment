import { Avatar, Box, Divider, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const RecommendUser = () => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        const getUser = async () => {
            const request = await fetch('/api/user/recommended');
            const response = await request.json();
            setUser(response);
        };
        getUser();
    }, []);

    return (
        <Flex flexDirection={"column"} alignItems={"center"} mt={["16vw", "16vw", "3vw", "3vw", "2vw"]}  mb={'3vw'}>
            {user && user?.map((item) => (
                <Flex key={`user-${item._id}`} gap={3} w={["300px", "300px", "300px", "300px"]} mt={5} flexDirection={"column"}>
                    <Flex justifyContent={"space-between"} alignItems={"center"}>
                        <Flex gap={2} alignItems={"center"}>
                            <Link to={`/${item?.username}`}>
                                <Avatar size="md" src={item?.profilePic} mt="1" />
                            </Link>

                            <Link to={`/${item?.username}`} >
                                <Text fontSize={"xl"}>{item?.username}</Text>
                            </Link>
                        </Flex>
                        <Text bg={"white"} color={"black"} rounded={"md"} padding={2}>{item?.followers.length} followers</Text>
                    </Flex>
                    <Divider orientation='horizontal' borderWidth={"0.5px"}  />
                </Flex>
            ))}
        </Flex>
    );
}

export default RecommendUser;
