import React, {useEffect} from 'react'
import { Container, Button, Typography, Grid, Avatar } from '@mui/material'
import {useTheme, makeStyles} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import {useMediaQuery} from '@mui/material'
import { login } from '../features/user/userSlice';
import { decodeHTML } from '../helpers/helper'
import Video from './Video'


export default function Home() {
    const user = useSelector(state=>state.user.user)
    const videos = useSelector(state=>state.videos.videos) 
    const testVideos = JSON.parse(localStorage.getItem('searchedVideos'))
    const isSmallScreen = useMediaQuery(theme=>theme.breakpoints.down('md'))
    const dispatch = useDispatch()
    const theme = useTheme()
    
    
  return (
    <Container maxWidth={false} sx={{background: theme.palette.gradientBackground.primary, height: '100vh', paddingTop: '90px',overflow: 'scroll', paddingBottom: 3}}>
        {isSmallScreen && <Typography textAlign='center'>Logo</Typography>}
      <Button  onClick={()=>dispatch(login({username: 'Sarah'}))}>Click</Button>
      {user && <Typography>{user.username}</Typography>}
      <Grid alignItems='center' spacing={{xs: 4, sm: 4, md: 5, lg: 6}} wrap='wrap' container>
          {videos?.map(video=>(
              video.id.kind === 'youtube#channel' ? null :
              <Video key={video.snippet.title} video={video} />
          ))}
          {testVideos?.map(video=>(
              video.id.kind === 'youtube#channel' ? null :
              <Video key={video.snippet.title} video={video} />
          ))}
      </Grid>
    </Container>
  )
}
