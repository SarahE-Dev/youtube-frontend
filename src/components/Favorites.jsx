import React from 'react'
import { Avatar, Container, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import theme from '../theme'
import { useSelector } from 'react-redux'
import { DeleteForever, DeleteOutline } from '@mui/icons-material'
import Axios from '../helpers/Axios'
import { useDispatch } from 'react-redux'
import { removeFavorite } from '../features/user/userSlice'
export default function Favorites() {
  const dispatch = useDispatch()
  const user = useSelector(state=>state.user.user)
  const removeFavoriteFunc = async (id) => {
    console.log(user);
     const remove = await Axios.post('/remove-favorite', {user: user._id, videoId: id})
     console.log(remove.data)
     dispatch(removeFavorite(id))


  }

  return (
    <Container sx={{background: theme.palette.gradientBackground.primary, height: '100vh', paddingTop: '90px',overflow: 'scroll', paddingBottom: 3}} maxWidth={false}>
      <ImageList>
        {user?.favorites?.map(favorite=>(
            <ImageListItem key={favorite.id}>
              <img src={favorite.thumbnailUrl} alt={favorite.title} />
              <ImageListItemBar position='top' sx={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }} actionIcon={<DeleteOutline onClick={()=>removeFavoriteFunc(favorite.videoId)} />} />
              <ImageListItemBar position='bottom'  title={favorite.title} subtitle={favorite.channelTitle} actionIcon={<Avatar  src={favorite.channelImage} />} />
            </ImageListItem>
        ))  
        }
      </ImageList>
    </Container>
  )
}
