import React, {useEffect} from 'react'
import { Container, Button, Typography, Grid, Avatar, Skeleton } from '@mui/material'
import {useTheme, makeStyles} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import {useMediaQuery} from '@mui/material'
import { login } from '../features/user/userSlice';
import { decodeHTML } from '../helpers/helper'
import Video from './Video'
import { setVideos } from '../features/video/videoSlice'
import getChannelAvatar from '../helpers/getAvatar'

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const apiUrl = 'https://www.googleapis.com/youtube/v3/videos';

const params = {
    part: 'snippet,contentDetails,statistics',
    chart: 'mostPopular',
    regionCode: 'US', 
    maxResults: 25, 
    key: API_KEY
  };


const queryParams = new URLSearchParams(params).toString();
const requestUrl = `${apiUrl}?${queryParams}`;


export default function Home() {
    const user = useSelector(state=>state.user.user)
    const videos = useSelector(state=>state.videos.videos) 
    const searched = useSelector(state=>state.videos.searched)
    const searchedVideos = JSON.parse(localStorage.getItem('searchedVideos'))
    const isSmallScreen = useMediaQuery(theme=>theme.breakpoints.down('md'))
    const dispatch = useDispatch()
    const theme = useTheme()
    useEffect(() => {
        
        const fetchVideos = async () => {
            const res = await fetch(requestUrl)
            const data = await res.json()
            let response = data.items
            console.log(response);
            const promiseArray = response.map(async (video) => {
              if(video.id.kind === 'youtube#channel' || video.id.kind === 'youtube#playlist') return null
                const channelID = video.snippet.channelId
                const channelImage = await getChannelAvatar(channelID)
                return {...video, channelImage}
            })
            const videosUpdated = await Promise.all(promiseArray)
            console.log(videosUpdated);
            dispatch(setVideos(videosUpdated))
        }
        if(videos?.length ===0 && !searched){
        fetchVideos()
        }
       
        
    }, [])
    
    
    
  return (
    <Container maxWidth={false} sx={{background: theme.palette.gradientBackground.primary, height: '100vh', paddingTop: '120px',overflow: 'scroll', paddingBottom: 3}}>
      <Grid alignItems='center' spacing={{xs: 4, sm: 4, md: 5, lg: 6}} wrap='wrap' container>

          {!searched && videos?.map(video=>(
              video?.id?.kind === 'youtube#channel' || video?.id?.kind === 'youtube#playlist' ? null :
              <Video key={`${video.snippet.title}l`} video={video} />
              
          ))}
          {searched && videos?.map(video=>(
              video === null ? null :
              <Video  video={video} />
              
          ))}
      </Grid>
    </Container>
  )
}
