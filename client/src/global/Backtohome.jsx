import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react'
import { HiMiniHome } from "react-icons/hi2";
import { Link } from 'react-router-dom';

const Backtohome = () => {
    return (
        <Flex >
                <Link to="/">
                   <Flex gap={1} alignItems={"center"}  justifyContent={"center"}>
                    <Box>
                    <HiMiniHome size={"25px"} />
                    </Box>
                    <Text textAlign={"center"} fontSize={"md"} visibility={["hidden",'visible']}>Home</Text>
                   </Flex>
                </Link>
        </Flex>
    )
}

export default Backtohome;
