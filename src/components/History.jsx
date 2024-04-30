import React, { useState } from 'react'
import { Avatar, Container, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import theme from '../theme'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {useMediaQuery} from '@mui/material';

export default function History() {
  const user = useSelector((state) => state.user.user);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen =  useMediaQuery(theme.breakpoints.up('sm') && theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md') && theme.breakpoints.down('lg'));
  

  return (
    <Container sx={{background: theme.palette.gradientBackground.primary, height: '100vh', paddingTop: '90px',overflow: 'scroll', paddingBottom: 3}} maxWidth={false}>
      <ImageList cols={isSmallScreen ? 1 : isMediumScreen ? 2 : isLargeScreen ? 3 : 4} gap={15}>
        {user?.history?.toReversed().map(video=>(
          <Link to={`/videos/${video.videoId}`} state={{video: video, channelImage: video.channelImage, history: user.history.toReversed()}} >
          <ImageListItem key={video.videoId} >
            <img style={{borderRadius: 15}} src={video.thumbnailUrl}  />
            <ImageListItemBar sx={{borderBottomLeftRadius: 15, borderBottomRightRadius: 15}} actionIcon={<Avatar src={video.channelImage} />} title={video.title} subtitle={video.channelTitle} />
          </ImageListItem>
          </Link>
          
          
        ))}
      </ImageList>
    </Container>
  )
}
