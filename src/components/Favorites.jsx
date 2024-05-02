import React from 'react'
import { Avatar, Container, ImageList, ImageListItem, ImageListItemBar, useMediaQuery } from '@mui/material'
import theme from '../theme'
import { useSelector } from 'react-redux'
import { DeleteForever, DeleteOutline, DeleteOutlineTwoTone } from '@mui/icons-material'
import Axios from '../helpers/Axios'
import { useDispatch } from 'react-redux'
import { removeFavorite } from '../features/user/userSlice'
import { Link } from 'react-router-dom'

export default function Favorites() {
  const dispatch = useDispatch()
  const user = useSelector(state=>state.user.user)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen =  useMediaQuery(theme.breakpoints.up('sm') && theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md') && theme.breakpoints.down('lg'));
  const removeFavoriteFunc = async (id) => {
    console.log(user);
     const remove = await Axios.post('/remove-favorite', {user: user._id, videoId: id})
     console.log(remove.data)
     dispatch(removeFavorite(id))


  }

  return (
    <Container sx={{background: theme.palette.gradientBackground.primary, height: '100vh', paddingTop: '90px',overflow: 'scroll', paddingBottom: 3}} maxWidth={false}>
      <ImageList cols={isSmallScreen ? 1 : isMediumScreen ? 2 : isLargeScreen ? 3 : 4}>
        {user?.favorites?.map(video=>(
          <div style={{padding: 10}}>
                    
          <ImageListItem  key={video.id}>
            <img style={{width: '100%', borderRadius: 15}} src={video.thumbnailUrl} alt={video.title} />
            <ImageListItemBar position='top' actionIcon={<DeleteOutlineTwoTone onClick={()=>removeFavoriteFunc(video.videoId)}  />} sx={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                borderTopRightRadius: 15, borderTopLeftRadius: 15
            }} />
            <Link state={{video: video, channelImage: video.channelImage, favorites: user?.favorites}} to={`/videos/${video.videoId}`}>
            <ImageListItemBar position='bottom'  sx={{borderBottomRightRadius: 15, borderBottomLeftRadius: 15}} title={video.title} subtitle={video.channelTitle} actionIcon={<Avatar  src={video.channelImage} />} />
            </Link>
          </ImageListItem>
          
          </div>
        ))  
        }
      </ImageList>
      
    </Container>
  )
}
