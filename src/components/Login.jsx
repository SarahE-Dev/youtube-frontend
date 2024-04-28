import React from 'react'
import { Container, Stack, TextField, Button, Divider, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'
import { useState } from 'react'
import validator from 'validator'


export default function Login() {
    const landcape = useMediaQuery('(orientation : landscape)')
    const isMedium = useMediaQuery('(max-width: 950px)')
    
  return (
    <Container sx={{textAlign: 'center', pt: landcape && isMedium ? 10 : 5}} maxWidth='xs'>
            <form action="" style={{}}>
                <Stack spacing={3}>
                    <TextField  
                    required
                    variant='filled'
                    color='secondary' label='Username' />
                    <TextField 
                    required
                    variant='filled'
                    color='secondary' label='Password' />
                    <Divider />
                    <div style={{textAlign: 'center'}}>
                    <Button sx={{width: '50%', borderRadius: 15}} type='submit' variant='outlined' >Submit</Button>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                      <Typography>Don't have an account?</Typography>
                    <Link to='/signup' style={{color: 'deeppink', marginLeft: 5}}>Signup</Link>
                    </div>
                </Stack>
            </form>
          </Container>
  )
}
