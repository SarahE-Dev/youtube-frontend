import React from 'react'
import { Container } from '@mui/material'

export default function PlayVideo({children, ...props}) {
  return (
    <Container sx={{background: theme.palette.gradientBackground.primary, height: '100vh', paddingTop: '90px',overflow: 'scroll', paddingBottom: 3}} maxWidth={false}>
        Shell
        {children}
    </Container>
  )
}
