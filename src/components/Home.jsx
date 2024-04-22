import React, {useEffect} from 'react'
import { Container, Button, Typography, Grid, Avatar } from '@mui/material'
import {useTheme, makeStyles} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import {useMediaQuery} from '@mui/material'
import { login } from '../features/user/userSlice';
import { decodeHTML } from '../helpers/helper'


export default function Home() {
    const user = useSelector(state=>state.user.user)
    const videos = useSelector(state=>state.videos.videos) 
    const testVideos = JSON.parse(localStorage.getItem('searchedVideos'))
    const isSmallScreen = useMediaQuery(theme=>theme.breakpoints.down('md'))
    const dispatch = useDispatch()
    const theme = useTheme()
    
    
  return (
    <Container maxWidth sx={{background: theme.palette.gradientBackground.primary, height: '100vh', paddingTop: '90px',overflow: 'scroll'}}>
        {isSmallScreen && <Typography textAlign='center'>Logo</Typography>}
      <Button  onClick={()=>dispatch(login({username: 'Sarah'}))}>Click</Button>
      {user && <Typography>{user.username}</Typography>}
      <Grid alignItems='center' spacing={{xs: 6, sm: 4, md: 3}} wrap='wrap' container>
          {videos?.map(video=>(
              video.id.kind === 'youtube#channel' ? null :
              <Grid height={250}  xs={6} sm={4} md={4} lg={3} item>
                
                  <img width='100%' style={{objectFit: 'cover', objectPosition: 'top'}}  src={video.snippet.thumbnails.medium.url} alt="" />
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <Avatar  />
                  <Typography sx={{wordWrap: 'break-word', overflowWrap: 'break-word', fontSize: {
                    xs: '0.7rem',
                    sm: '0.8rem',
                    md: '0.9rem',
                    lg: '1.0rem'
                  }
                  }} >
                    {decodeHTML(video.snippet.title)}</Typography>
                  </div>
              </Grid>
          ))}
          {testVideos?.map(video=>(
              video.id.kind === 'youtube#channel' ? null :
              <Grid height={250}  xs={6} sm={4} md={4} lg={3} item>
                
                  <img width='100%' style={{objectFit: 'cover', objectPosition: 'top'}}  src={video.snippet.thumbnails.medium.url} alt="" />
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <Avatar  />
                  <Typography sx={{wordWrap: 'break-word', overflowWrap: 'break-word', fontSize: {
                    xs: '0.7rem',
                    sm: '0.8rem',
                    md: '0.9rem',
                    lg: '1.0rem'
                  }
                  }} >
                    {decodeHTML(video.snippet.title)}</Typography>
                  </div>
              </Grid>
          ))}
      </Grid>
    </Container>
  )
}
