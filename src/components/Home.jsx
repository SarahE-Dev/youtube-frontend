import React from 'react'
import { Container, Button, Typography } from '@mui/material'
import {useTheme} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

export default function Home() {
    const user = useSelector(state=>state.user.user)
    const dispatch = useDispatch()
    const theme = useTheme()
  return (
    <Container maxWidth={false} sx={{background: theme.palette.gradientBackground.primary, height: '100vh', paddingTop: '9vh'}}>
      <Button  onClick={()=>dispatch(login({username: 'Sarah'}))}>Click</Button>
      {user && <Typography>{user.username}</Typography>}
    </Container>
  )
}
