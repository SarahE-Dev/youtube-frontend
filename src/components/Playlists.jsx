import React, { useEffect, useState } from 'react'
import { Accordion, AccordionSummary, Container, AccordionDetails, ImageList, ImageListItemBar, ImageListItem, Avatar } from '@mui/material'
import theme from '../theme'
import { useSelector } from 'react-redux'
import Video from './Video'
import { Delete, DeleteOutlineTwoTone, Minimize, MinimizeOutlined } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import {useMediaQuery} from '@mui/material';
import { removePlaylist, removeVideoFromPlaylist } from '../features/user/userSlice'
import Axios from '../helpers/Axios'
import { Link } from 'react-router-dom'
export default function Playlists() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const removePlaylistFunction = async (id) => {
    console.log(user);
    const remove = await Axios.post('/delete-playlist', {user: user._id, playlist: id})
    console.log(remove.data)
    dispatch(removePlaylist(id))
  }

  const removeVideoFromPLaylistFunc = async (playlistId, videoId) => {
    console.log(user);
    const remove = await Axios.post('/remove-video-from-playlist', {user: user._id, playlist: playlistId, videoId})
    console.log(remove.data)
    dispatch(removeVideoFromPlaylist({playlistId, videoId}))
  }
  
  
  return (
    <Container sx={{background: theme.palette.gradientBackground.primary, height: '100vh', paddingTop: '90px',overflow: 'scroll', paddingBottom: 3}} maxWidth={false}>
        {user?.playlists?.map(playlist=>(
            <Accordion defaultExpanded sx={{background: theme.palette.navBackground.primary}} key={playlist._id}>
              <AccordionSummary >
                <div style={{display: 'flex' ,justifyContent: 'space-between', width: '100%'}}>
                  <h3>{playlist.name}</h3>
                  <Delete onClick={()=>removePlaylistFunction(playlist._id)} />
                </div>
                
              </AccordionSummary>
              <AccordionDetails sx={{display: 'flex', width: isSmallScreen ? '90vw' : '70vw', overflowX: 'scroll'}} >
                {playlist.videos.map(video=>(
                  <div style={{padding: 10}}>
                    
                    <ImageListItem  key={video.id}>
                      <img style={{width: 250, borderRadius: 15}} src={video.thumbnailUrl} alt={video.title} />
                      <ImageListItemBar position='top' actionIcon={<DeleteOutlineTwoTone onClick={()=>removeVideoFromPLaylistFunc(playlist._id, video.videoId)}  />} sx={{
                        background:
                          'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                          'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                          borderTopRightRadius: 15, borderTopLeftRadius: 15
                      }} />
                      <Link state={{video: video, channelImage: video.channelImage, playlist: playlist}} to={`/videos/${video.videoId}`}>
                      <ImageListItemBar position='bottom'  sx={{borderBottomRightRadius: 15, borderBottomLeftRadius: 15}} title={video.title} subtitle={video.channelTitle} actionIcon={<Avatar  src={video.channelImage} />} />
                      </Link>
                    </ImageListItem>
                    
                    </div>
                ))}
              </AccordionDetails>
            </Accordion>
        ))}
    </Container>
  )
}
