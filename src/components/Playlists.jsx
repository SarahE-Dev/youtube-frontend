import React from 'react'
import { Container } from '@mui/material'
import theme from '../theme'
import { useSelector } from 'react-redux'

export default function Playlists() {
  const user = useSelector((state) => state.user.user);
  return (
    <Container sx={{background: theme.palette.gradientBackground.primary, height: '100vh', paddingTop: '90px',overflow: 'scroll', paddingBottom: 3}} maxWidth={false}>

    </Container>
  )
}
