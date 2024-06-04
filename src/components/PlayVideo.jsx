import React, { Suspense, useEffect, useState } from 'react'
import { Avatar, Container, Grid, Stack, Typography, ImageList, ImageListItem, ImageListItemBar, Card, CardContent, CardHeader, Accordion, AccordionDetails, Rating, IconButton, Fab, AccordionSummary, Button, TextField, Input, Slide, Dialog, DialogActions, DialogContent, DialogTitle, Skeleton, List, ListItem, ListItemSecondaryAction, ListItemAvatar, ListItemText, FormControl, Select, InputLabel, MenuItem, DialogContentText } from '@mui/material'
import YouTube from 'react-youtube'
import { useLocation } from 'react-router'
import {useMediaQuery} from '@mui/material'
import { useTheme } from '@mui/material'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { decodeHTML } from '../helpers/helper';
import getChannelAvatar from '../helpers/getAvatar'
import { Add, Comment, ExpandMoreOutlined, Favorite, FavoriteBorderOutlined } from '@mui/icons-material'
import {styled} from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import { addComment, addFavorite, addHistory, addPlaylist, addVideoToPlaylist, removeFavorite } from '../features/user/userSlice'
import Axios from '../helpers/Axios'
import { returnVideObject } from '../helpers/videoReturn'
import { setChannelImageOnVideo, setVideos } from '../features/video/videoSlice'
import { useParams } from 'react-router'
import {alien, alien2, bird, bobtail, bulldog, bunny, cat, cat1, eva, husky, husky2, koala, lab, othercat, owl, panda2, puppy, robotwhite, sealion, wallrus, whitecat } from '../assets'

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff0000',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function returnImageFromPath(path){
  switch(path){
    case 'src/assets/images/alien.png':
      return alien
    case 'src/assets/images/alien2.png':
      return alien2
    case 'src/assets/images/bird.jpg':
      return bird
    case 'src/assets/images/bobtail.png':
      return bobtail
    case 'src/assets/images/bulldog.png':
      return bulldog
    case 'src/assets/images/bunny.png':
      return bunny
    case 'src/assets/images/cat.jpg':
      return cat
    case 'src/assets/images/cat1.png':
      return cat1
    case 'src/assets/images/eva.jpg':
      return eva
    case 'src/assets/images/husky.png':
      return husky
    case 'src/assets/images/husky2.png':
      return husky2
    case 'src/assets/images/koala.png':
      return koala
    case 'src/assets/images/lab.png':
      return lab
    case 'src/assets/images/othercat.png':
      return othercat
    case 'src/assets/images/owl.jpg':
      return owl
    case 'src/assets/images/panda2.png':
      return panda2
    case 'src/assets/images/puppy.jpg':
      return puppy
    case 'src/assets/images/sealion.png':
      return sealion
    case 'src/assets/images/wallrus.png':
      return wallrus
    case 'src/assets/images/whitecat.png':
      return whitecat
    case 'src/assets/images/robotwhite.jpg':
      return robotwhite
    default:
      return alien
  }

}

export default function PlayVideo({children, ...props}) {
  const location = useLocation()
  let videos = useSelector(state=>state.videos.videos)
  const user = useSelector(state=>state.user.user)
  const dispatch = useDispatch()
  const vidId = useParams()
  const video = location?.state?.video
  const channelImage = location?.state?.channelImage
  const [open, setOpen] = useState(false)
  const [videoToPlay, setVideoToPlay] = useState(video)
  const [expanded, setExpanded] = useState(false)
  const [comments, setComments] = useState([{comment: 'comment'}])
  const [commentInput, setCommentInput] = useState('')
  const [openCommentDialog, setOpenCommentDialog] = useState(false)
  const [showEditInput, setShowEditInput] = useState(false)
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md') && theme.breakpoints.up('sm'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down('lg') && theme.breakpoints.up('md'));
  const isXLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const smallForImage = useMediaQuery(theme.breakpoints.down('md'));
  const [history, setHistory] = useState([])
  const [playlistAddOpen, setPlaylistAddOpen] = useState(false)
  const [playlistInput, setPlaylistInput] = useState('')
  const [commentSelected, setCommentSelected] = useState('')
  const [playlistSelection, setPlaylistSelection] = useState('')
  const [commentSelectedValue, setCommentSelectedValue] = useState('')
  const [commentEditInput, setCommentEditInput] = useState('')
  const [playlistsListed, setPlaylistsListed] = useState([])

  
  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  async function getVideoComments(){
    const response = await Axios.get(`/get-video-comments/${videoToPlay.videoId}`)
    setComments(response.data.comments)
  }

  

  const addToFavorites = async () => {
    const response = await Axios.post('/add-favorite', {...videoToPlay, user: user?._id})
    dispatch(addFavorite(response.data.video))
  }

  const removeFavoriteFunc = async (id) => {
     const remove = await Axios.post('/remove-favorite', {user: user._id, videoId: id})
     dispatch(removeFavorite(id))
}

  const handleHeartClick = () => {
    user && !user.favorites.some(i=>i.videoId === videoToPlay.videoId) ? addToFavorites() : !user ? handleClickOpen() : user && user.favorites.some(i=>i.videoId === videoToPlay.videoId) ? removeFavoriteFunc(videoToPlay.videoId) : null
  }

  const handlePlaylistClick = () => {
    !user ? handleClickOpen() : setPlaylistAddOpen(true)

  }
  

  useEffect(() => {
    
    if(!video?.videoId && video){
    const videoObject = returnVideObject(video, user?._id, video?.channelImage)
    setVideoToPlay(videoObject)
    
    }else{
      setVideoToPlay(video)
      
    }
  }, [video])

  useEffect(() => {
    if(videoToPlay?.videoId){
      getVideoComments()
    }
    if(videoToPlay){localStorage.setItem('lastVideoPlayed', JSON.stringify(videoToPlay))}
    if(!videoToPlay){
      setVideoToPlay(JSON.parse(localStorage.getItem('lastVideoPlayed')))
    }
  }, [videoToPlay])
  
  

  const handleCommentSubmit =async(e)=>{
    e.preventDefault()
    if(!user){
      handleClickOpen()
      return
    }
    if(user && commentInput){
      const comment = await Axios.post('/add-comment', {content: commentInput, video: videoToPlay.videoId, user: user._id, avatar: user.avatar})
      console.log(comment);
      setPlaylistAddOpen(false)
      dispatch(addComment(comment.data.comment))
      getVideoComments()
      setCommentInput('')
    }
    
  }

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const testVideos = JSON.parse(localStorage.getItem('searchedVideos'))
  
  useEffect(() => {
    if(videos.length === 0){
      dispatch(setVideos(testVideos))
      
    
    }
  }, [])

  
  const addNewPlaylist = async (e) => {
    e.preventDefault()
    const response = await Axios.post('/add-playlist', {name: playlistInput, user: user._id})
    console.log(response);
    setPlaylistInput('')
    dispatch(addPlaylist(response.data.playlist))
  }

  

  const handleAddVideoToPlaylist=async(e)=>{
    e.preventDefault()
    const response = await Axios.post('/add-video-to-playlist', {playlist: playlistSelection, user: user._id, channelImage: videoToPlay.channelImage, channelId: videoToPlay.channelId, videoId: videoToPlay.videoId, title: videoToPlay.title, description: videoToPlay.description, thumbnailUrl: videoToPlay.thumbnailUrl, channelTitle: videoToPlay.channelTitle, publishedAt: videoToPlay.publishedAt, duration: videoToPlay.duration, viewCount: videoToPlay.viewCount, likeCount: videoToPlay.likeCount, dislikeCount: videoToPlay.dislikeCount, commentCount: videoToPlay.commentCount, favoriteCount: videoToPlay.favoriteCount, user: user._id, avatar: user.avatar})
    console.log(response);
    setPlaylistAddOpen(false)
    dispatch(addVideoToPlaylist({playlistId: playlistSelection, video: videoToPlay}))
    
  }
  
  
  useEffect(() => {
    
    if(user){
      let videoObject;
      if(video?.videoId){
          videoObject = video
      }else{
        videoObject = returnVideObject(video, user._id, video?.channelImage) 
        async function addToHistory(){
          const history = await Axios.post('/add-to-history', videoObject)
          dispatch(addHistory(history.data.video))
          console.log(history); 
        }
        
        addToHistory()
      
      }
    
      location.state.history ? setVideos(location.state.history) : videos = videos
  }
  
  
  }, [location])

  const deleteCommentFunc=async(id)=>{
    const deleteComment = await Axios.post('/delete-comment', {user: user._id, comment: commentSelected})
    console.log(deleteComment);
    getVideoComments()
  }

  const encodeChannelTitle=(title)=>{
    return title.split(' ').join('-')
  }

  const editCommentFunc=async(id)=>{
    const editedComment = await Axios.post('/edit-comment', {comment: commentSelected, content: commentSelectedValue})
    console.log(editedComment);
    getVideoComments()
    setShowEditInput(false)
    setOpenCommentDialog(false)
  }
  
  return (
    <Container sx={{background: theme.palette.gradientBackground.primary, height: '110vh', paddingTop: '90px', paddingBottom: 3, overflow: 'scroll'}} maxWidth='xl'>
      <div style={{display: 'flex'}}>
      <div style={{display: 'flex', flexDirection: 'column'}} className={`${isSmallScreen ? 'small-container' : ''} ${isMediumScreen ? 'medium-container' : ''} ${isLargeScreen ? 'large-container' : ''} ${isXLargeScreen ? 'xlarge-container' : ''}`}>
        
      {videoToPlay?.videoId ? <YouTube videoId={videoToPlay.videoId} opts={{width: '100%', height: '100%'}} /> : <Skeleton variant='rect' width='100%' height='100%' />}
      <Dialog PaperProps={{component: 'form', sx: {padding: '0px 20px'}}} TransitionComponent={Transition} open={playlistAddOpen} onClose={()=>setPlaylistAddOpen(false)} sx={{textAlign: 'center'}}>
                <DialogTitle>Add to Playlist</DialogTitle>
                <DialogContentText>
                <form style={{display: 'flex', flexDirection: 'column'}} >
                    <TextField value={playlistInput} onChange={(e)=>setPlaylistInput(e.target.value)} label='Playlist Name' />
                    <Button onClick={addNewPlaylist}>Add</Button>
                  </form>
                  <form>
                    <FormControl fullWidth>
                      <InputLabel>Select Playlist</InputLabel>
                      <Select onChange={(e)=>setPlaylistSelection(e.target.value)}>
                        {user?.playlists.map((item, i)=>(
                          <MenuItem key={i} value={item._id}>{item.name}</MenuItem>
                        ))  
                        }
                      </Select>
                    </FormControl>
                  </form>
                </DialogContentText>
                <DialogActions>
                    <Button onClick={()=>setPlaylistAddOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddVideoToPlaylist}>Add</Button>
                </DialogActions>
            </Dialog>
      
      <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{overflowY: 'scroll', marginBottom: 5}}>
        <Accordion disableGutters sx={{background: theme.palette.navBackground.primary}} >
          <AccordionSummary  >
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
          <div style={{display: 'flex', alignItems: 'center',}}>
            
        <Avatar sx={{width: smallForImage ? 40 : 50, height: smallForImage ? 40 : 50, m: 2}} alt={videoToPlay?.channelTitle} src={videoToPlay?.channelImage}  />
      <Typography variant='p'>{videoToPlay?.channelTitle}</Typography>
      </div>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <IconButton onClick={handlePlaylistClick}><Add color='primary' /></IconButton>
        {user && user.favorites.some(i=>i.videoId === videoToPlay.videoId) ? <IconButton onClick={handleHeartClick}><Favorite color='secondary' /></IconButton> : <IconButton onClick={handleHeartClick}><FavoriteBorderOutlined color='secondary' /></IconButton>}
      </div>
      
      </div>
          </AccordionSummary>
        </Accordion>
        <Accordion sx={{background: theme.palette.navBackground.primary}}>
            <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
              {decodeHTML(videoToPlay?.title)}
            </AccordionSummary>
            <AccordionDetails sx={{textWrap: 'wrap'}}>
              <Typography>{decodeHTML(videoToPlay?.description)}</Typography>
            </AccordionDetails>
            
        </Accordion>
        <Accordion sx={{background: theme.palette.navBackground.primary}}>
            <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
              Comments
            </AccordionSummary>
            <AccordionDetails>
              <form onSubmit={handleCommentSubmit} style={{display: 'flex', alignItems: 'center'}}>
                
                <TextField  value={commentInput} onChange={(e)=>setCommentInput(e.target.value)} sx={{ flexGrow: 1, '& .MuiOutlinedInput-root': {borderRadius: 10}}} label='Add a comment' />
                <Fab onClick={handleCommentSubmit} type='submit' sx={{ml: 1}} color='white' size='small'><Add /></Fab>
              </form>
              <List sx={{overflowY: 'scroll', height: 'fit-content'}}>
                {user && comments.toReversed().map((item, i)=>(
                    <>
                    
                  <ListItem onClick={()=>{item.user._id === user._id ? setOpenCommentDialog(true) : ''; setCommentSelected(item._id); setCommentSelectedValue(item.content)}} key={i}>
                    <ListItemAvatar>
                      <Avatar src={returnImageFromPath(item?.user?.avatar)} alt={item?.user?.username} />
                    </ListItemAvatar>
                    <ListItemText primary={item?.content} />
                    <ListItemSecondaryAction>
                      <IconButton><Comment /></IconButton>
                      {item?.user?.username}
                    </ListItemSecondaryAction>
                    
                  </ListItem>
                  <Dialog TransitionComponent={Transition} open={openCommentDialog} onClose={()=>{setOpenCommentDialog(false); setShowEditInput(false)}} sx={{textAlign: 'center'}}>
        <DialogTitle>Edit or Delete</DialogTitle>
        <DialogContent>
          {showEditInput ? <Input value={commentSelectedValue} onChange={(e)=>setCommentSelectedValue(e.target.value)} /> : ''}
        </DialogContent>
        <DialogActions sx={{display: 'flex', justifyContent: 'center'}}>
          {showEditInput ? <><Button color='secondary' onClick={()=>setShowEditInput(false)}>Cancel</Button><Button onClick={editCommentFunc}>Save</Button></> : <> <Button onClick={()=>setShowEditInput(true)}>Edit</Button><Button onClick={()=>{setOpenCommentDialog(false); deleteCommentFunc(item._id)}} color='secondary'>Delete</Button></>}
        
          
        </DialogActions>
      </Dialog>
                  </>
                ))}
              </List>
            </AccordionDetails>
        </Accordion>
      </div>
        {useMediaQuery(theme.breakpoints.up('sm')) ? null : (
          <ImageList cols={1} sx={{overflowY: 'scroll', height: '200vh'}}>
          {videos?.map((item, i)=>(
            item === null ||
            item?.id?.kind === 'youtube#channel' || item?.id?.kind === 'youtube#playlist' ? null:
            <Link state={{video: item, channelImage: item.channelImage}} to={`/videos/${item.id.videoId ? item.id.videoId : item.id}`}>
            <ImageListItem sx={{width: '100%', mb: 1, ml: -.26}} key={item.snippet.title}>
              <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
              <ImageListItemBar
                width='100%'
                subtitle={decodeHTML(item.snippet.title)}
                actionIcon={
                  <Avatar sx={{width: 30, height: 30, mr: 1}} src={item.channelImage} alt={item.snippet.channelTitle} />
                }
              />
            </ImageListItem>
            </Link>
          ))  
          }
        </ImageList>
        )}
      </div>
      
      <Dialog TransitionComponent={Transition} open={open} onClose={handleClose} sx={{textAlign: 'center'}}>
                <DialogTitle>Login or Signup</DialogTitle>
                <DialogContent>You must be logged in.</DialogContent>
                <DialogActions>
                    <Button sx={{flexGrow: 1}} component={NavLink} to='/login' onClick={handleClose}>Login</Button>
                    <Button color='secondary' component={NavLink} to='/signup' sx={{flexGrow: 1}} onClick={handleClose}>Signup</Button>
                </DialogActions>
            </Dialog>
      
      </div>
      <ImageList cols={useMediaQuery(theme.breakpoints.up('lg')) ? 2 : 1} sx={{overflowY: 'scroll', height: '100vh', mr: -2, display: useMediaQuery(theme.breakpoints.down('sm')) ? 'none' : '', ml: .75}}>
          {videos?.map((item, i)=>(
            item === null ||
            item?.id?.kind === 'youtube#channel' || item?.id?.kind==='youtube#playlist' ? null:
            <Link state={{video: item, channelImage: channelImage}} to={`/videos/${item?.id?.videoId ? item?.id?.videoId : item?.id}`}>
            <ImageListItem sx={{width: '90%', mb: 1, ml: 1}} key={item.snippet.title}>
              <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
              <ImageListItemBar
                width='100%'
                subtitle={decodeHTML(item.snippet.title)}
                actionIcon={
                  <Avatar sx={{width: 30, height: 30}} src={item.channelImage} alt={item?.snippet?.channelTitle} />
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
