import React, { useEffect, useState } from 'react'
import { Container, Grid, Stack } from '@mui/material'
import YouTube from 'react-youtube'
import { useLocation } from 'react-router'
import {useMediaQuery} from '@mui/material'
import { useTheme } from '@mui/material'

export default function PlayVideo({children, ...props}) {
  const location = useLocation()
  const {video} = location.state
  const [videoId, setVideoId] = useState(video)
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md') && theme.breakpoints.up('sm'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down('lg') && theme.breakpoints.up('md'));
  const isXLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  useEffect(() => {
    setVideoId(video.id.videoId)
  }, [video])
  
  return (
    <Container sx={{background: theme.palette.gradientBackground.primary, height: '100vh', paddingTop: '90px',overflow: 'scroll', paddingBottom: 3}} maxWidth={false}>
      <div className={`${isSmallScreen ? 'small-container' : ''} ${isMediumScreen ? 'medium-container' : ''} ${isLargeScreen ? 'large-container' : ''} ${isXLargeScreen ? 'xlarge-container' : ''}`}>
      <YouTube  videoId={videoId} />
      </div>
        
        
        
  
    </Container>
  )
}
