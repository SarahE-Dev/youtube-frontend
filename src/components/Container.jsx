import React from 'react'

export default function Container({children, ...props}) {
  return (
    <Container sx={{height: '100vh', width: '100vw', background: theme.palette.gradientBackground.primary, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {children}
    </Container>
  )
}
