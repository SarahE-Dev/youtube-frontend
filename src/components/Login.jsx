import React from 'react'
import { Container, Stack, TextField, Button, Divider, Typography, Avatar } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'
import { useState } from 'react'
import validator from 'validator'
import Axios from '../helpers/Axios'
import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../features/user/userSlice'
import theme from '../theme'
import { checkAuthUser } from '../hooks/checkAuthUser'
import BlueZack from './BlueZack'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Cookies from 'js-cookie'



export default function Login() {
    const dispatch = useDispatch()
    const landcape = useMediaQuery('(orientation : landscape)')
    const isMedium = useMediaQuery('(max-width: 950px)')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {checkIfCookieExists, loginUser} = checkAuthUser()
    const navigate = useNavigate()
    if(checkIfCookieExists()){
        return <Navigate to='/' />
    }
    const handleSubmit =async (e) => {
        e.preventDefault()
        const data =  {
            username: username,
            password: password
        }
        const user = await Axios.post('/login', data)
        setPassword('')
        setUsername('')
        Cookies.set('youtube-jwt', user.data.token)
        navigate('/')
    }
  return (
    <Container maxWidth='xl' sx={{height: '100vh', background: theme.palette.gradientBackground.primary, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'scroll', pt: 2}}>
    <Container sx={{textAlign: 'center', pt: landcape && isMedium ? 10 : 5}} maxWidth='xs'>

            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 10, marginTop: 10}}><BlueZack/>
            <Typography className='bluezack'  variant='h4' sx={{color: theme.palette.success.main}}>BLUEZACK</Typography>
            </div>
            
            <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField 
                    onChange={(e)=>setUsername(e.target.value)} 
                    required
                    variant='filled'
                    color='secondary' label='Username' />
                    <TextField 
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                    type='password'
                    variant='filled'
                    color='secondary' label='Password' />
                    <Divider />
                    <div style={{textAlign: 'center'}}>
                    <Button sx={{width: '50%', borderRadius: 15}} variant='outlined' type='submit' >Submit</Button>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      <Typography>Don't have an account?</Typography>
                    <Link to='/signup' style={{color: 'deeppink', marginLeft: 5}}>Signup</Link>
                    </div>
                </Stack>
            </form>
          </Container>
    </Container>
  )
}
