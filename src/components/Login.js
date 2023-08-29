import { useState } from 'react'
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useToast,
} from '@chakra-ui/react'

import { HiArrowRight } from 'react-icons/hi'
import { useCookies } from "react-cookie"
import { signin, getCurrentUser } from '@/api/auth'
import { useRouter } from 'next/router'

const Login = () => {
    const router = useRouter()
    const toast = useToast()
    const [cookie, setCookie] = useCookies()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email) {
            toast({
                title: 'Email is required',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        if (!password) {
            toast({
                title: 'Password is required',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        let body = {
            email: email,
            password: password
        }
        try {
            setLoading(true)
            const res = await signin(body)
            if (res.data.status) {
                setCookie('authToken', res.data.data.token, {
                    path: '/',
                    // Expires after 120 mins
                    maxAge: 60 * 120,
                    sameSite: true,
                })
                let body = {
                    token: res.data.data.token
                }
                const user = await getCurrentUser(body)
                setCookie('user', user.data.data, {
                    path: '/',
                    // Expires after 120 mins
                    maxAge: 60 * 120,
                    sameSite: true,
                })
                router.push('/')
                return toast({
                    position: "top-right",
                    title: "Login Success",
                    description: res.data.message,
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                })
            }
        }
        catch (err) {
            console.log(err)
            return toast({
                position: "top-right",
                title: "Login Failed",
                description: err?.response?.data?.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <Box
            w={['100%', '80%', '50%', '40%']}
            m="0 auto"
            borderWidth="1px"
            borderRadius="lg"
            p={6}
            mt={8}
        >
            <Heading as="h1" size="lg" textAlign="center" mb={6}>
                Login
            </Heading>
            <form onSubmit={handleSubmit}>
                <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter your email"
                        size="lg"
                    />
                </FormControl>
                <FormControl id="password" isRequired mt={4}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter your password"
                        size="lg"
                    />
                </FormControl>
                <Stack direction='row' align='center' justify='center'>
                    <Button
                        isLoading={loading}
                        loadingText="Logging in"
                        type="submit" rightIcon={<HiArrowRight />}
                        bgColor='#10b981' color='#ffffff'
                        _hover={{ bgColor: '#059669' }}
                        size="lg" mt={6}>
                        Login
                    </Button>
                </Stack>
            </form>
            {/* <Text mt={4} textAlign="center">
                Don't have an account?{' '}
                <Link
                    href="/register"
                    color="#3182ce"
                    _hover={{ textDecoration: 'none' }}>
                    Register
                </Link>
            </Text> */}
        </Box>
    );
};

export default Login