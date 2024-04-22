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
export default function App() {
  const youtubeCategories = [
    { id: '1', title: 'Film & Animation' },
    { id: '2', title: 'Autos & Vehicles' },
    { id: '10', title: 'Music' },
    { id: '15', title: 'Pets & Animals' },
    { id: '17', title: 'Sports' },
    { id: '18', title: 'Short Movies' },
    { id: '19', title: 'Travel & Events' },
    { id: '20', title: 'Gaming' },
    { id: '21', title: 'Videoblogging' },
    { id: '22', title: 'People & Blogs' },
    { id: '23', title: 'Comedy' },
    { id: '24', title: 'Entertainment' },
    { id: '25', title: 'News & Politics' },
    { id: '26', title: 'Howto & Style' },
    { id: '27', title: 'Education' },
    { id: '28', title: 'Science & Technology' },
    { id: '29', title: 'Nonprofits & Activism' },
    { id: '30', title: 'Movies' },
    { id: '31', title: 'Anime/Animation' },
    { id: '32', title: 'Action/Adventure' },
    { id: '33', title: 'Classics' },
    { id: '34', title: 'Comedy' },
    { id: '35', title: 'Documentary' },
    { id: '36', title: 'Drama' },
    { id: '37', title: 'Family' },
    { id: '38', title: 'Foreign' },
    { id: '39', title: 'Horror' },
    { id: '40', title: 'Sci-Fi/Fantasy' },
    { id: '41', title: 'Thriller' },
    { id: '42', title: 'Shorts' },
    { id: '43', title: 'Shows' },
    { id: '44', title: 'Trailers' },
  ];
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
    <Layout>
    <RouterProvider router={Router}  />
    </Layout>
    </>
  )
}

