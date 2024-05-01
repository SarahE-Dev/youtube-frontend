import React, {useEffect, useState} from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './features/user/userSlice';
import { Button, Container, Typography } from '@mui/material';
import Navbar from './components/Navbar';
import { useTheme, useMediaQuery } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import  Router  from './router';
import axios from 'axios';
import Layout from './Layout';
import { checkAuthUser } from './hooks/checkAuthUser';
export default function App() {
  
  
  const fetchVideoCategories = async () => {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/videoCategories', {
      params: {
        part: 'snippet',
        regionCode: 'US',
        key: import.meta.env.VITE_YOUTUBE_API_KEY,
      },
    });
    console.log(response.data);
  }
  
  
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

