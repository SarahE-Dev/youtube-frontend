import React, {useState} from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './features/user/userSlice';
import { Button, Container, Typography } from '@mui/material';
import Navbar from './components/Navbar';
import theme from './theme';

export default function App() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  return (
    <>
    <Navbar/>
    <Container maxWidth={false} sx={{background: theme.palette.gradientBackground.primary, height: '91vh'}}>
      <Button  onClick={()=>dispatch(login({username: 'Sarah'}))}>Click</Button>
      {user && <Typography>{user.username}</Typography>}
    </Container>
    </>
  )
}

