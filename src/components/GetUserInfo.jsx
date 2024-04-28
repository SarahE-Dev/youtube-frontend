import { Container, FormControl, FormControlLabel, Stack, TextField, Button, Divider, FormGroup, Box, InputLabel, Select, MenuItem, Avatar, Typography, FormHelperText } from '@mui/material'
import React, {useState} from 'react'
import theme from '../theme'
import { useLocation } from 'react-router'
import { Form, Link } from 'react-router-dom'
import {useMediaQuery} from '@mui/material'
import Login from './Login'
import validator from 'validator'

export default function GetUserInfo() {
    const {pathname} = useLocation()
    const landcape = useMediaQuery('(orientation : landscape)')
    const isMedium = useMediaQuery('(max-width: 950px)')
    const [firstName, setFirstName] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastName, setLastName] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [avatar, setAvatar] = useState('')
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
                setEmailError('Invalid email.')
            }else{
              setEmailError('')
            }
    }
    const handlePasswordChange=(text)=>{
            setPassword(text)
            if(!validator.isStrongPassword(text)){
                setPasswordError('Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.')
            }else{
              setPasswordError('')
            }
    }
    const handleConfirmPasswordChange=(text)=>{
            setConfirmPassword(text)
            if(text !== password){
                setConfirmPasswordError('Passwords do not match.')
            }else{
              setConfirmPasswordError('')
            }
    }

  return (
    <Container maxWidth='xl' sx={{height: '100vh', background: theme.palette.gradientBackground.primary, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'scroll', pt: 2}}>
        {pathname === '/login' && 
          <Login />
        }
        {
          pathname === '/signup' && (
            <Container sx={{textAlign: 'center', mt: landcape && isMedium ? 25 : 10}} maxWidth='md'>
            <form>
              <div style={{display: 'flex'}}>
                <FormControl sx={{m: 1, flexGrow: 1}}>
                <TextField  value={firstName} onChange={(e)=>handleFirstNameChange(e.target.value)} required  color='secondary' type='text' label='First Name' variant='filled' />
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
              <div style={{display: 'flex'}}>
                <FormControl sx={{m: 1, flexGrow: 1}}>
                <TextField  value={password} onChange={(e)=>handlePasswordChange(e.target.value)} required color='secondary' type='password' label='Password' variant='filled' />
                <FormHelperText error>{passwordError}</FormHelperText>
                </FormControl>
                <FormControl sx={{m: 1, flexGrow: 1}}>
                <TextField  value={confirmPassword} onChange={(e)=>handleConfirmPasswordChange(e.target.value)} required color='secondary'
                type='password' label='Confirm Password' variant='filled' />
                <FormHelperText error>{confirmPasswordError}</FormHelperText>
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
              <div style={{display: 'flex', justifyContent: 'center', marginBottom: 50}}>
                <Typography>Already have an account?</Typography>
                <Link style={{color: 'deeppink', marginLeft: 5}} to='/login'>Login</Link>
              </div>
            </form>
          </Container>
          )
        }

        </Container>
  )
}
