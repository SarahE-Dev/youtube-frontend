import React from 'react'
import { Container } from '@mui/material'
import theme from '../theme'

export default function Playlists() {
  return (
    <Container sx={{background: theme.palette.gradientBackground.primary, height: '100vh', paddingTop: '90px',overflow: 'scroll', paddingBottom: 3}} maxWidth={false}></Container>
  )
}
