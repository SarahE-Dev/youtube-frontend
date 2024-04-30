import React from 'react'
import { Container, Stack, TextField, Button, Divider, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'
import { useState } from 'react'
import validator from 'validator'
import Axios from '../helpers/Axios'
import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../features/user/userSlice'
import theme from '../theme'
import { checkAuthUser } from '../hooks/checkAuthUser'


export default function Login() {
    const dispatch = useDispatch()
    const landcape = useMediaQuery('(orientation : landscape)')
    const isMedium = useMediaQuery('(max-width: 950px)')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {checkIfCookieExists, loginUser} = checkAuthUser()
    if(checkIfCookieExists()){
      loginUser()
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
    }
  return (
    <Container maxWidth='xl' sx={{height: '100vh', background: theme.palette.gradientBackground.primary, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'scroll', pt: 2}}>
    <Container sx={{textAlign: 'center', pt: landcape && isMedium ? 10 : 5}} maxWidth='xs'>
            <form onSubmit={handleSubmit} style={{}}>
                <Stack spacing={3}>
                    <TextField 
                    onChange={(e)=>setUsername(e.target.value)} 
                    required
                    variant='filled'
                    color='secondary' label='Username' />
                    <TextField 
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                    variant='filled'
                    color='secondary' label='Password' />
                    <Divider />
                    <div style={{textAlign: 'center'}}>
                    <Button sx={{width: '50%', borderRadius: 15}} type='submit' variant='outlined' >Submit</Button>
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
