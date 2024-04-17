import React, {useState} from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './features/user/userSlice';
import { Button, Container, Typography } from '@mui/material';
import Navbar from './components/Navbar';
import { useTheme, useMediaQuery } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import  Router  from './router';
export default function App() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
    
    <RouterProvider router={Router}  />
    </>
  )
}

