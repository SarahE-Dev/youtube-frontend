import React, { useEffect, useState } from 'react'
import { Avatar, Container, Grid, Stack, Typography, ImageList, ImageListItem, ImageListItemBar, Card, CardContent, CardHeader, Accordion, AccordionDetails, Rating, IconButton, Fab, AccordionSummary } from '@mui/material'
import YouTube from 'react-youtube'
import { useLocation } from 'react-router'
import {useMediaQuery} from '@mui/material'
import { useTheme } from '@mui/material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { decodeHTML } from '../helpers/helper';
import getChannelAvatar from '../helpers/getAvatar'
import { Add, Comment, ExpandMoreOutlined, Favorite, FavoriteBorderOutlined } from '@mui/icons-material'
import {styled} from '@mui/material/styles'


const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff0000',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

export default function PlayVideo({children, ...props}) {
  const location = useLocation()
  let videos = useSelector(state=>state.videos.videos)
  const videoImages = useSelector(state=>state.videos.videoImages)
  const {video, channelImage} = location.state
  const [videoId, setVideoId] = useState(video)
  const [videoToPlay, setVideoToPlay] = useState(video)
  const [imageToUse, setImageToUse] = useState(channelImage)
  const [expanded, setExpanded] = useState(false)
  const [comments, setComments] = useState([{comment: 'comment'}])
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md') && theme.breakpoints.up('sm'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down('lg') && theme.breakpoints.up('md'));
  const isXLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const smallForImage = useMediaQuery(theme.breakpoints.down('md'));
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(() => {
    setVideoToPlay(video)
    video.id.videoId ? setVideoId(video.id.videoId) :
    setVideoId(video.id)
  }, [video])
  useEffect(() => {
    setVideoId(videoToPlay.id.videoId ? videoToPlay.id.videoId : videoToPlay.id) 
  }, [videoToPlay])
  
  useEffect(() => {
    if(videos.length === 0){
      videos = localStorage.getItem('searchedVideos', JSON.stringify([video]))
    }
  }, [])
  useEffect(() => {
    setImageToUse(channelImage)
  }, [channelImage])
  console.log(video);
  return (
    <Container sx={{background: theme.palette.gradientBackground.primary, height: '110vh', paddingTop: '90px', paddingBottom: 3, overflow: 'scroll'}} maxWidth={true}>
      <div style={{display: 'flex'}}>
      <div style={{display: 'flex', flexDirection: 'column'}} className={`${isSmallScreen ? 'small-container' : ''} ${isMediumScreen ? 'medium-container' : ''} ${isLargeScreen ? 'large-container' : ''} ${isXLargeScreen ? 'xlarge-container' : ''}`}>
        
      <YouTube videoId={videoToPlay.id.videoId ? videoToPlay.id.videoId : videoToPlay.id} />
      
      <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{overflowY: 'scroll', marginBottom: 5}}>
        <Accordion disableGutters sx={{background: theme.palette.navBackground.primary}} >
          <AccordionSummary  >
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
          <div style={{display: 'flex', alignItems: 'center',}}>
        <Avatar sx={{width: smallForImage ? 40 : 50, height: smallForImage ? 40 : 50, m: 2}} alt={videoToPlay.snippet.channelTitle} src={imageToUse}  />
      <Typography variant='p'>{videoToPlay.snippet.channelTitle}</Typography>
      </div>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <IconButton><Add /></IconButton>
        <StyledRating sx={{mr: 1}} size='medium'  defaultValue={0}  max={1} icon={<Favorite fontSize='inherit' />} emptyIcon={<FavoriteBorderOutlined fontSize='inherit'/>} />
      </div>
      </div>
          </AccordionSummary>
        </Accordion>
        <Accordion sx={{background: theme.palette.navBackground.primary}}>
            <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
              {videoToPlay.snippet.title}
            </AccordionSummary>
            <AccordionDetails sx={{textWrap: 'wrap'}}>
              <Typography>{videoToPlay.snippet.description}</Typography>
            </AccordionDetails>
            
        </Accordion>
        <Accordion sx={{background: theme.palette.navBackground.primary}}>
            <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
              Comments
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{comments.map(item=>(
                <Comment key={item.id} comment={item} />
              ))}</Typography>
            </AccordionDetails>
        </Accordion>
      </div>
        {useMediaQuery(theme.breakpoints.up('sm')) ? null : (
          <ImageList cols={1} sx={{overflowY: 'scroll', height: '100vh'}}>
          {videos?.map((item, i)=>(
            item.id.kind === 'youtube#channel' ? null:
            <Link state={{video: item, channelImage: channelImage}} to={`/videos/${item.id.videoId ? item.id.videoId : item.id}`}>
            <ImageListItem sx={{width: '100%', mb: 1, ml: -.26}} key={item.snippet.title}>
              <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
              <ImageListItemBar
                width='100%'
                subtitle={decodeHTML(item.snippet.title)}
                actionIcon={
                  <Avatar sx={{width: 30, height: 30, mr: 1}} src={item.channelImage} alt={video.snippet.channelTitle} />
                }
              />
            </ImageListItem>
            </Link>
          ))  
          }
        </ImageList>
        )}
      </div>
      
      
      
      </div>
      <ImageList cols={useMediaQuery(theme.breakpoints.up('lg')) ? 2 : 1} sx={{overflowY: 'scroll', height: '100vh', mr: -2, display: useMediaQuery(theme.breakpoints.down('sm')) ? 'none' : '', ml: .75}}>
          {videos?.map((item, i)=>(
            item.id.kind === 'youtube#channel' ? null:
            <Link state={{video: item, channelImage: channelImage}} to={`/videos/${item.id.videoId ? item.id.videoId : item.id}`}>
            <ImageListItem sx={{width: '90%', mb: 1, ml: 1}} key={item.snippet.title}>
              <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
              <ImageListItemBar
                width='100%'
                subtitle={decodeHTML(item.snippet.title)}
                actionIcon={
                  <Avatar sx={{width: 30, height: 30}} src={item.channelImage} alt={video.snippet.channelTitle} />
                }
              />
            </ImageListItem>
            </Link>
          ))  
          }
        </ImageList>
        </div>
    </Container>
  )
}
