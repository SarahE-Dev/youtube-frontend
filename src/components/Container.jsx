import React from 'react'
import { Container as Cont } from '@mui/material'
import theme from '../theme'

export default function Container({children, ...props}) {
  return (
    <Cont sx={{height: '100vh', background: theme.palette.gradientBackground.primary, display: 'flex', justifyContent: 'center', alignItems: 'center'}} maxWidth>
        {children}
    </Cont>
  )
}
