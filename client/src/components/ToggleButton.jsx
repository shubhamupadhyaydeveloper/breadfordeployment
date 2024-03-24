import { Flex, Icon } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useColorMode } from '@chakra-ui/react';

const ToggleButton = () => {
    const {colorMode , toggleColorMode} = useColorMode()
  return (
    <Flex align="center">
    <Icon
      as={colorMode === "light" ? FaSun : FaMoon}
      fontSize="2xl"
      color={colorMode === "light" ? 'yellow.500' : 'yellow.500'}
      cursor="pointer"
      onClick={toggleColorMode}
      transition="color 0.001s ease" // Add a smooth transition effect
      _hover={{ color: colorMode === "light" ? 'yello.600' : 'yellow.400' }} // Adjust hover color
    />
  </Flex>
  );
};

export default ToggleButton;
