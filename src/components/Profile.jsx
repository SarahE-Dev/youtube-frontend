import React from 'react'
import { Container, TextField, Button, MenuItem, Avatar, FormControl, FormHelperText } from '@mui/material'
import { useState } from 'react'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import validator from 'validator'


export default function Profile() {
  const user = useSelector(state=>state.user.user)
  const dispatch = useDispatch()
  const theme = useTheme()
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [avatar, setAvatar] = useState('')
  const landscape = useMediaQuery('(orientation : landscape)')
  const isMedium = useMediaQuery('(max-width: 930px)')
  const handleFirstNameChange=(text)=>{
          setFirstName(text)
          if(!validator.isAlpha(text, 'en-US')){
              setFirstNameError('First Name must contain only letters.')
          }else{
            setFirstNameError('')
          }
  }
  const handleLastNameChange=(text)=>{
          setLastName(text)
          if(!validator.isAlpha(text, 'en-US')){
              setLastNameError('Last Name must contain only letters.')
          }else{
            setLastNameError('')
          }
  }
  const handleUsernameChange=(text)=>{
          setUsername(text)
          if(!validator.isAlphanumeric(text)){
              setUsernameError('Must contain only letters and numbers.')
          }else{
            setUsernameError('')
          }
  }
  const handleEmailChange=(text)=>{
          setEmail(text)
          if(!validator.isEmail(text)){
              setEmailError('Must be a valid email.')
          }else{
            setEmailError('')
          }
  } 

  return (
    <Container sx={{height: '100vh', width: '100vw', background: theme.palette.gradientBackground.primary, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'scroll'}}>
    <Container sx={{textAlign: 'center', paddingTop: landscape && isMedium ? 25 : 10}} maxWidth='md'>
            <form >
              <div style={{display: 'flex'}}>
                <FormControl sx={{m: 1, flexGrow: 1}}>
                <TextField  InputProps={{disabled: true}}  onChange={(e)=>handleFirstNameChange(e.target.value)} required  color='secondary' type='text' label='First Name' value={user?.firstName} variant='filled' />
                <FormHelperText error>{firstNameError}</FormHelperText>
                </FormControl>
                <FormControl sx={{m: 1, flexGrow: 1}}>
                <TextField value={lastName} onChange={(e)=>handleLastNameChange(e.target.value)} required  color='secondary'
                type='text'  label='Last Name' variant='filled' />
                <FormHelperText error>{lastNameError}</FormHelperText>
                </FormControl>
              </div>
              <div style={{display: 'flex'}}>
                <FormControl sx={{m: 1, flexGrow: 1}}>
                <TextField value={username} onChange={(e)=>handleUsernameChange(e.target.value)} required  color='secondary' type='text' label='Username' variant='filled' />
                <FormHelperText error>{usernameError}</FormHelperText>
                </FormControl>
                <FormControl sx={{m: 1, flexGrow: 1}}>
                <TextField value={email} onChange={(e)=>handleEmailChange(e.target.value)} required  color='secondary'
                type='email' label='Email' variant='filled' />
                <FormHelperText error>{emailError}</FormHelperText>
                </FormControl>
              </div>
              
              <div style={{display: 'flex', justifyContent: 'center', margin: 7}}>
      
                <TextField value={avatar} color='secondary' select label='Select your avatar' onChange={(e)=>setAvatar(e.target.value)} sx={{m: 1, width: '50%'}} variant='filled'>
                  <MenuItem value='1'>
                  <Avatar />
                  </MenuItem>
                  <MenuItem value='2'>
                  <Avatar />
                  </MenuItem>
                  <MenuItem value='3'>
                  <Avatar />
                  </MenuItem>
                </TextField>
              </div>
              <div style={{display: 'flex', justifyContent: 'center', margin: 7}}>
                <Button size='large' type='submit' variant='outlined' sx={{width: '50%', m: 3, borderRadius: 15}}>Submit</Button>
              </div>
              
            </form>
            </Container>

    </Container>
  )
}
