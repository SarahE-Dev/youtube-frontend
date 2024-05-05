import React from 'react'
import { Container, TextField, Button, MenuItem, Avatar, FormControl, FormHelperText, ButtonGroup, Typography } from '@mui/material'
import { useState } from 'react'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import validator from 'validator'
import Axios from '../helpers/Axios'
import { login } from '../features/user/userSlice'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { checkAuthUser } from '../hooks/checkAuthUser'
import { Navigate } from 'react-router'
import { avatarPaths } from './GetUserInfo'
import { returnImageFromPath } from './PlayVideo'


export default function Profile() {
  const user = useSelector(state=>state.user.user)
  const dispatch = useDispatch()
  const theme = useTheme()
  const {checkIfCookieExists}= checkAuthUser()
  const [isEditable, setIsEditable] = useState(false)
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
  const hasSidebar = useMediaQuery(theme.breakpoints.up('md'))
  const handleFirstNameChange=(text)=>{
          setFirstName(text)
          if(!validator.isAlpha(text, 'en-US')){
              setFirstNameError('First Name must contain only letters.')
          }else{
            setFirstNameError('')
          }
  }
  
  useEffect(() => {
    setFirstName(user?.firstName)
    setLastName(user?.lastName)
    setUsername(user?.username)
    setEmail(user?.email)
    setAvatar(user?.avatar)
  }, [user])
  const updateUserFunction=async(e)=>{
    e.preventDefault()
    if(firstNameError === '' && lastNameError === '' && usernameError === '' && emailError === ''){
      const objectToSend = {}
      if(username !== user?.username){
        objectToSend.username = username
      }
      if(email !== user?.email){
        objectToSend.email = email
      }
      if(lastName !== user?.lastName){
        objectToSend.lastName = lastName
      }
      if(firstName !== user?.firstName){
        objectToSend.firstName = firstName
      }
      if(Object.keys(objectToSend).length === 0){
        setIsEditable(false)
        return
      }
      const updatedUser = await Axios.post('/update-user', {...objectToSend, user: user._id})
      console.log(updatedUser);
      if(updatedUser.data.user){
        dispatch(login(updatedUser.data.user))
        setIsEditable(false)
        
    }else{

      setIsEditable(false)
    }
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
    <Container maxWidth='xl' sx={{height: '100vh', background: theme.palette.gradientBackground.primary, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'scroll'}}>
      {isEditable &&
    <Container sx={{textAlign: 'center', paddingTop: landscape && isMedium ? 25 : 10}} maxWidth='md'>
            <form onSubmit={updateUserFunction}>
              <div style={{display: 'flex'}}>
                <FormControl sx={{m: 1, flexGrow: 1}}>
                <TextField   onChange={(e)=>handleFirstNameChange(e.target.value)} required  color='secondary' type='text' label='First Name' value={firstName} variant='filled' />
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
                  {avatarPaths.map((path, index)=>{
                    return <MenuItem key={index} value={path}>
                      <Avatar src={returnImageFromPath(path)} sx
                      ={{width: 50, height: 50}} />
                    </MenuItem>
                  })}
                </TextField>
              </div>
              <div style={{display: 'flex', justifyContent: 'center', margin: 7}}>
                <ButtonGroup>
                  <Button size='large' onClick={()=>setIsEditable(false)} 
                  color='secondary'
                  variant='outlined' sx={{ borderRadius: 15}}>Cancel</Button>
                  <Button size='large' type='submit' variant='outlined' sx={{ borderRadius: 15}}>Submit</Button>
                </ButtonGroup>
                
              </div>
              
            </form>
            </Container>
}

    {!isEditable &&
    <Container sx={{textAlign: 'center', paddingTop: landscape && isMedium ? 25 : 10, display: 'flex', flexDirection: 'column'}} >
      <Avatar sx={{width: 100, height: 100, m: 2}} src={user?.avatar} />
      <Typography variant='h4'>{user?.firstName} {user?.lastName}</Typography>
      <Typography variant='h6'>{user?.username}</Typography>
      <Typography variant='h6'>{user?.email}</Typography>
      <Button onClick={()=>setIsEditable(true)} variant='outlined' sx={{m: 2}}>Edit</Button>
    </Container>
    }
    </Container>
  )
}
