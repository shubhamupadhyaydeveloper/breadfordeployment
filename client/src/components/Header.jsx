import { Flex, useColorMode, Image } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import Backtohome from "../global/Backtohome"
import Logout from "../auth/Logout"
import { FaUser } from "react-icons/fa6";
import React  from 'react'
import { Link } from 'react-router-dom';
import ToggleButton from './ToggleButton';

const Header = () => {
    const {colorMode } = useColorMode()
    const user = useSelector(state => state.user.isUser)
    return (
        <>
          <Flex
            justifyContent={'center'}
            position={"fixed"}
            paddingY={"13px"}
            top={"0px"}
            zIndex={20}
            bg="rgba(255, 255, 255, 0.2)"
            backdropFilter="blur(8px)" 
            left={"0px"}
            w={"100vw"}
            alignItems={"center"}
            marginBottom={"4rem"}
          > 
          <Flex w={["320px","375px","730px"]} justifyContent={"space-between"}>
            <Backtohome/>
            <Image
              alt='logo'
              w={8}
              src={'/bread.ico'}
            />
            <Flex gap={["3","3","5","6","6"]} alignItems={"center"}>
              <ToggleButton />
              <Link to={`/${user?.username}`}>
              <FaUser cursor={"pointer"} size={"20px"}/>
              </Link>
              {
                user && 
              <Logout/>
              }
            </Flex>
          </Flex>
         </Flex> 
        </>
    )
}

export default Header;
