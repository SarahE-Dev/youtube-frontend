import React, { useState } from 'react'
import { Avatar, Button, Container, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import theme from '../theme'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {useMediaQuery} from '@mui/material';
import Axios from '../helpers/Axios';
import { useDispatch } from 'react-redux';
import { clearHistory } from '../features/user/userSlice';

export default function History() {
  const user = useSelector((state) => state.user.user);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen =  useMediaQuery(theme.breakpoints.up('sm') && theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md') && theme.breakpoints.down('lg'));
  const dispatch = useDispatch();

  const clearHistoryFunc = async () => {
      const resp = await Axios.post('/clear-history', {user: user._id});
      console.log(resp.data);
      dispatch(clearHistory());
  }
  

  return (
    <Container sx={{background: theme.palette.gradientBackground.primary, height: '100vh', paddingTop: '90px',overflow: 'scroll', paddingBottom: 3, textAlign: 'center'}} maxWidth={false}>
      
      <Button onClick={clearHistoryFunc} variant='contained' color='primary' sx={{margin: 2}}>Clear History</Button>
      
      <ImageList cols={isSmallScreen ? 1 : isMediumScreen ? 2 : isLargeScreen ? 3 : 4} gap={15}>
        {user?.history?.toReversed().map((video, i)=>(
          <Link key={video.videoId + i} to={`/videos/${video.videoId + i}`} state={{video: video, channelImage: video.channelImage, history: user.history.toReversed()}} >
          <ImageListItem key={video.title} >
            <img style={{borderRadius: 15}} src={video.thumbnailUrl}  />
            <ImageListItemBar sx={{borderBottomLeftRadius: 15, borderBottomRightRadius: 15}} actionIcon={<Avatar src={video.channelImage} />} title={video.title} subtitle={video.channelTitle} />
          </ImageListItem>
          </Link>
          
          
        ))}
      </ImageList>
    </Container>
  )
}
