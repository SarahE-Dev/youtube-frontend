import { Container, FormControl, FormControlLabel, Stack, TextField, Button, Divider, FormGroup, Box, InputLabel, Select, MenuItem, Avatar, Typography, FormHelperText } from '@mui/material'
import React, {useState} from 'react'
import theme from '../theme'
import { useLocation, useNavigate } from 'react-router'
import { Form, Link } from 'react-router-dom'
import {useMediaQuery} from '@mui/material'
import Login from './Login'
import validator from 'validator'
import Axios from '../helpers/Axios'
import { checkAuthUser } from '../hooks/checkAuthUser'
import { Navigate } from 'react-router'
import { returnImageFromPath } from './PlayVideo'
import { useDispatch } from 'react-redux'
import { login } from '../features/user/userSlice'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export const avatarPaths = [
  'src/assets/images/alien.png',
  'src/assets/images/alien2.png',
  'src/assets/images/bird.jpg',
  'src/assets/images/bobtail.png',
  'src/assets/images/bulldog.png',
  'src/assets/images/bunny.png',
  'src/assets/images/cat.jpg',
  'src/assets/images/cat1.png',
  'src/assets/images/eva.jpg',
  'src/assets/images/husky.png',
  'src/assets/images/koala.png',
  'src/assets/images/husky2.png',
  'src/assets/images/lab.png',
  'src/assets/images/othercat.png',
  'src/assets/images/owl.jpg',
  'src/assets/images/panda2.png',
  'src/assets/images/puppy.jpg',
  'src/assets/images/sloth.jpg',
  'src/assets/images/wallrus.png',
  'src/assets/images/whitecat.png',
  'src/assets/images/sealion.png',
  'src/assets/images/robotwhite.jpg',
]


export default function GetUserInfo() {
    const navigate = useNavigate()
    const {checkIfCookieExists, loginUser} = checkAuthUser()
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
    const dispatch = useDispatch()
    if(checkIfCookieExists()){
      return <Navigate to='/' />
    }
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

    const handleSignupSubmit = async (e) => {
      e.preventDefault()
      const data = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
        avatar: avatar
      }
      const user = await Axios.post('/signup', data)
      setFirstName('')
      setLastName('')
      setUsername('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setAvatar('')
      Cookies.set('youtube-jwt', user.data.token)
      navigate('/')
    }

  return (
    <Container maxWidth='xl' sx={{height: '100vh', background: theme.palette.gradientBackground.primary, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'scroll', pt: 2}}>
            <Container sx={{textAlign: 'center', mt: landcape && isMedium ? 25 : 10}} maxWidth='md'>
            <form onSubmit={handleSignupSubmit}>
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
      
                <TextField required value={avatar} color='secondary' select label='Select your avatar' onChange={(e)=>setAvatar(e.target.value)} sx={{m: 1, width: '50%'}} variant='filled'>
                  {avatarPaths.map((path, index)=>(
                    <MenuItem key={index} value={path}>
                      <Avatar src={returnImageFromPath(path)} sx={{width: 50, height: 50}} />
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div style={{display: 'flex', justifyContent: 'center', margin: 7}}>
                <Button size='large' type='submit' variant='outlined' sx={{width: '50%', m: 3, borderRadius: 15}}>Submit</Button>
              </div>
              <div style={{display: 'flex', justifyContent: 'center', marginBottom: 50, alignItems: 'center'}}>
                <Typography>Already have an account?</Typography>
                <Link style={{color: 'deeppink', marginLeft: 5}} to='/login'>Login</Link>
              </div>
            </form>
          </Container>

        </Container>
  )
}
