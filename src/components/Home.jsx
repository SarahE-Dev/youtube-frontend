import React from 'react'
import { Container, Button, Typography } from '@mui/material'
import {useTheme} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import {useMediaQuery} from '@mui/material'
import { login } from '../features/user/userSlice';


export default function Home() {
    const user = useSelector(state=>state.user.user)
    const isSmallScreen = useMediaQuery(theme=>theme.breakpoints.down('md'))
    const dispatch = useDispatch()
    const theme = useTheme()
  return (
    <Container maxWidth={false} sx={{background: theme.palette.gradientBackground.primary, height: '100vh', paddingTop: '90px',}}>
        {isSmallScreen && <Typography textAlign='center'>Logo</Typography>}
      <Button  onClick={()=>dispatch(login({username: 'Sarah'}))}>Click</Button>
      {user && <Typography>{user.username}</Typography>}
    </Container>
  )
}
