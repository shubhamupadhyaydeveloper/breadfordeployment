import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from '@chakra-ui/react'
import useShowToast from '../hook/ShowToast';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/reducer';
import { setLogedin } from '../../store/reducer';
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

const Login = () => {
    const showToast = useShowToast()
    const [showPassword, setShowPassword] = useState(false)
    const [inputs , setInputs] = useState({
        username : "",
        password : ""
    })
    const dispath = useDispatch();

    const handleLogin =  async () => {
       try {
        const logindata = {
            username : inputs.username,
            password : inputs.password
        }

        const request = await fetch("/api/user/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(logindata)
        })

        const response = await request.json()
        
        if (response.message) {
            showToast(response.message , "error")
            return;
        }
        if (response.success) {
           showToast(response.success , "success")
        }

        localStorage.setItem("user", JSON.stringify(response))
        dispath(setUser(response))
        
       } catch (err) {
          console.log("Error in LoginUser" ,  err.message)
       }
    }
    return (
        <Flex
        mt={["20vw","20vw","9.5vw","7vw","5.5vw"]}
        >
            <Stack spacing={8} mx={'auto'}  py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                         Login
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.dark')}
                    boxShadow={'lg'}
                    w={['300px',"300px","300px","300px","310px"]}
                    p={8}>
                    <Stack spacing={4}>

                        <Flex gap="3" flexDirection={["column", "column", "row", "row", "row"]}>
                            <Box>
                                <FormControl id="lastName" isRequired>
                                    <FormLabel>Username</FormLabel>
                                    <Input type="text"
                                      onChange={(e) => setInputs({...inputs , username : e.target.value})}
                                      value={inputs.username}
                                    />
                                </FormControl>
                            </Box>
                        </Flex>


                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'}
                                onChange={(e) => setInputs({...inputs , password : e.target.value})}
                                value={inputs.password}
                                />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                onClick={handleLogin}
                                >
                                Login
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                New user? <Link color={'blue.400'} onClick={() => dispath(setLogedin("signup"))}>Sign Up</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}

export default Login;
