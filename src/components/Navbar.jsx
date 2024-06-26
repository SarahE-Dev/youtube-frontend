import { AppBar, Toolbar, Button, IconButton, Box, Autocomplete, TextField, MenuItem, Menu as Menu2, Typography, Drawer, CircularProgress, Container, ListItemIcon, Dialog, DialogTitle, DialogContent, DialogActions, Slide, Fab, Avatar, } from '@mui/material'
import React, { useState, useEffect } from 'react'
import {useMediaQuery, useTheme} from '@mui/material'
import { AccountCircleOutlined, AndroidSharp, Favorite, History, Home, Login, Logout, Menu, MoreVert, Person, PersonAdd, PlaylistPlaySharp, SearchOutlined, WatchLater, YouTube as YouTubeIcon } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'
import { setSearched, setVideos } from '../features/video/videoSlice';
import { useNavigate } from 'react-router';
import youtubeCategories from '../helpers/categories';
import { Link, NavLink } from 'react-router-dom';
import { login, logout } from '../features/user/userSlice';
import { useLocation } from 'react-router';
import Axios from '../helpers/Axios';
import Cookies from 'js-cookie';
import { GoogleGenerativeAI } from '@google/generative-ai';
import CursorSvg from './CursorSvg';
import { checkAuthUser } from '../hooks/checkAuthUser';
import { Navigate } from 'react-router';
import BlueZack from './BlueZack';
import { returnImageFromPath } from './PlayVideo';
import getChannelAvatar from '../helpers/getAvatar';


const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
const model = genAI.getGenerativeModel({model: 'gemini-pro'})

const list = [
    {text: 'Favorites', icon: <Favorite/>},
    {text: 'History', icon: <History/>},
    {text: 'Playlists', icon: <PlaylistPlaySharp/>}
]

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


export default function Navbar() {
    const {checkIfCookieExists, loginUser} = checkAuthUser()
    const navigate = useNavigate()
    const user = useSelector(state=>state.user.user)
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch()
    const [options, setOptions] = useState([])
    const theme = useTheme();
    const [searchInput, setSearchInput] = useState('')
    const { pathname} = useLocation()
    const isSmallScreen = useMediaQuery(theme=>theme.breakpoints.down('md'))
    const loginSignup = pathname === '/login' || pathname === '/signup';
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false)
    const [chatHistory, setChatHistory] = useState('')
    const [prompt, setPrompt] = useState('')
    const [answer, setAnswer] = useState('')
    const [completedTyping, setCompletedTyping] = useState(true)
    useEffect(()=>{
        !user && loginUser()
    }, [user])
    
    async function run(e, t){
        e.preventDefault()
        
        const chat = await model.startChat({prompt: 'be a friedly chat bot on a youtube app, your name is BlueZack'})
        const res = await chat.sendMessage(prompt)
        setPrompt('')
        const response = await res.response
        const text = response.text()
        console.log(text)
        
        setChatHistory(text)
      }
      let interval;
      useEffect(() => {
        if(chatHistory.length === 0) return
        setCompletedTyping(false)
        console.log(chatHistory);
        let i = 0;
        const stringResponse = chatHistory
        interval = setInterval(() => {
          setAnswer(stringResponse.slice(0, i))
          i++
          const chatbox = document.getElementById('chat')
          chatbox.scrollTop = chatbox.scrollHeight
          if(i > stringResponse.length) {
            clearInterval(interval)
            setCompletedTyping(true)
          }
        }, 10)
      }, [chatHistory])
  
      useEffect(()=>{
        if(!bottomDrawerOpen){
            clearInterval(interval)
          setCompletedTyping(true)
        }
      }, [bottomDrawerOpen])
    const suggest = async(term) =>{
        const response = await axios(`https://suggestqueries-clients6.youtube.com/complete/search?client=youtube&hl=en&gl=us&ds=yt&q=${term}`, {
            mode: 'no-cors',
            method: 'GET',
            adapter: jsonpAdapter,
        })
        setLoading(false)
        setOptions(response.data[1].map(item=>item[0]))
        
        
    }
    
    const toggleDrawer = ()=>setIsDrawerOpen(!isDrawerOpen)
    const handleInputChange =async(input) => {
        console.log(input);
        setLoading(true)
        setSearchInput(input)
        suggest(input)
    }

    const handleMenuClick=(text)=>{
        setAnchorEl(null);
        navigate(`/${text}`)
    }

    const handleClose = () => setOpen(false)

    const handleOpen = () => setOpen(true)
    
    const handleLogout = () =>{
        dispatch(logout())
        Cookies.remove('youtube-jwt')
    }

    const handleSearchSubmit = async(e)=>{
        e.preventDefault()
        console.log('hj');
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    part: 'snippet',
                    key: API_KEY,
                    q: searchInput,
                    maxResults: 25
                }
            })
            
            let responseArray = response.data.items;
            console.log(responseArray);
            let promiseArray = responseArray.map(async item=>{
                if(item.id.kind === 'youtube#channel' || item.id.kind === 'youtube#playlist') return null
                const channelID = item.snippet.channelId
                const channelImage = await getChannelAvatar(channelID)
                return {...item, channelImage}
            })
            const videoWithImages = await Promise.all(promiseArray)
            console.log(videoWithImages);
            localStorage.setItem('searchedVideos', JSON.stringify(videoWithImages))
            dispatch(setSearched(true))
            dispatch(setVideos(videoWithImages))
            navigate('/')
            setSearchInput('')
            setOptions([])
            
        
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
    <AppBar sx={{backgroundColor: theme.palette.navBackground.primary, zIndex: 2000}} position='fixed'>
        
        <Toolbar >
        {!isSmallScreen && <Link to='/' style={{textDecoration: 'none'}}><Button variant='text' color='success'><BlueZack/><Typography  className='bluezack' >BlueZack</Typography></Button></Link>}
            {isSmallScreen && !loginSignup &&
            <IconButton
            onClick={()=>setIsDrawerOpen(true)}
            edge='start' color='inherit'
            aria-label='menu' sx={{mr: 2}}
            ><Menu/></IconButton>}
            {isSmallScreen && loginSignup && 
            <Link to='/' style={{textDecoration: 'none'}} >
            <IconButton
            edge='start' color='white'
            aria-label='home' sx={{mr: 2}}
            ><BlueZack/></IconButton></Link>}
                <Box  sx={{flexGrow: 1,display: 'flex', justifyContent: 'center'}} onSubmit={handleSearchSubmit}>
                    <form style={{display: 'flex', width: '100%', maxWidth: 500}} onSubmit={handleSearchSubmit}>
                <Autocomplete
                value={searchInput}
                
                disableClearable
                onSelectCapture={(e)=>handleInputChange(e.target.value)}
                freeSolo
                inputMode='search'
                options={options}
                loading={loading}
                sx={{ marginLeft: 'auto', marginRight: 'auto', borderRadius: 10, '& .MuiOutlinedInput-root': {borderRadius: 10}, width: '90%'}}
                loadingText={<div style={{textAlign: 'center'}}>
                    <CircularProgress color='secondary' size={20}/>
                </div>}
                renderInput={(params) => <TextField {...params} 
                sx={{mt: 1, mb: 1, color: 'primary'}}
                    InputProps={{...params.InputProps, type: 'search',}}
                label='Search' />}
                />
                <IconButton sx={{width: '10%'}} onClick={handleSearchSubmit} type='submit'><SearchOutlined/></IconButton>
                </form>
                </Box>
                {isSmallScreen && <Fab color='primary' onClick={()=>setBottomDrawerOpen(true)} sx={{position: 'fixed', bottom: 30, left: 30}}>
                    <BlueZack />
                    </Fab>}
                <Drawer sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: theme.palette.navBackground.primary,
            height: '50vh',
            ml: 1,
            mr: 1
          },
        }} variant='temporary' anchor='bottom' open={bottomDrawerOpen} onClose={()=>setBottomDrawerOpen(false)}>
                <Typography id='chat'  sx={{textAlign: 'center', mt: 2, height: '33vh', overflow: 'auto', overflowAnchor: 'auto'}}>{answer}{!completedTyping && <CursorSvg />}</Typography>
                <form onSubmit={run}>
                <div style={{display: 'flex', justifyContent: 'center', marginLeft: 30}}>
                    <TextField disabled={!completedTyping} value={prompt} onChange={(e)=>setPrompt(e.target.value)} />
                    
                    <Button sx={{mt: 1}} type='submit'>Send</Button>
                    </div>
                    
                </form>
            </Drawer>
               
            {user && 
            <Box sx={{display: 'flex'}}>
             <IconButton aria-controls='menu' aria-haspopup='true' edge='end' sx={{ml: 2}} onClick={(e)=>setAnchorEl(e.currentTarget)}>
                <Avatar src={returnImageFromPath(user?.avatar)} />
             </IconButton>
                
             <Menu2 sx={{mt: 7}} transformOrigin={{vertical: 'top', horizontal: 'right'}} anchorOrigin={{vertical: 'top', horizontal: 'right'}} id='menu'  open={Boolean(anchorEl)} onClose={()=>setAnchorEl(null)} keepMounted anchorEl={anchorEl}>
                <MenuItem component={NavLink} to='/profile' onClick={()=>setAnchorEl(null)}><ListItemIcon><Person/></ListItemIcon>Profile</MenuItem>
                <MenuItem onClick={()=>{handleLogout(); setAnchorEl(null)}}><ListItemIcon><Logout/></ListItemIcon>Logout</MenuItem>
                </Menu2>
                
                </Box>
                }
            {!user && 
            <Box sx={{display: 'flex'}}>
             <IconButton aria-controls='menu' aria-haspopup='true' edge='end' sx={{ml: 2}} onClick={(e)=>setAnchorEl(e.currentTarget)}>
                <MoreVert/></IconButton>
                
             <Menu2 sx={{mt: 7}} transformOrigin={{vertical: 'top', horizontal: 'right'}} anchorOrigin={{vertical: 'top', horizontal: 'right'}} id='menu'  open={Boolean(anchorEl)} onClose={()=>setAnchorEl(null)} keepMounted anchorEl={anchorEl}>
                <MenuItem onClick={()=>handleMenuClick('login')}><ListItemIcon><Login/></ListItemIcon>Login</MenuItem>
                <MenuItem onClick={()=>handleMenuClick('signup')}><ListItemIcon><PersonAdd/></ListItemIcon>Signup</MenuItem>
                </Menu2>
                
                </Box>
                }
        </Toolbar>
    </AppBar>
    {isSmallScreen && !loginSignup &&
    <Drawer PaperProps={{
        style: {
            width: '200px',
            backgroundColor: theme.palette.navBackground.primary,
            paddingTop: '80px',
            paddingBottom: 100
        }
    
    }} variant='temporary' anchor='left' open={isDrawerOpen} onClose={()=>setIsDrawerOpen(false)}>
        <Container
             style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '110%', marginLeft: '-10px'}}>
                <div style={{ marginTop: 20}}>
                    <Link style={{textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center'}} to='/'>
                    <BlueZack/>
                    <Typography sx={{color: theme.palette.success.main}} className='bluezack' variant='h4'>BLUEZACK</Typography>
                    </Link>
                </div>
               {list.map(item=>(
                
                   <Button key={item.text} onClick={user ? null : handleOpen}  component={user ? NavLink : Button} to={`/${item.text === 'Home' ? '' : item.text.toLowerCase()}`} 
                   sx={{mt: 2, borderRadius: 10, fontSize: '0.7rem', textAlign: 'center', backgroundColor: theme.palette.navBackground.primary}}
                   startIcon={item.icon}
                   variant='outlined' color='primary'>{item.text}</Button>
               ))}
               <Dialog TransitionComponent={Transition} open={open} onClose={handleClose} sx={{textAlign: 'center'}}>
                <DialogTitle>Login or Signup</DialogTitle>
                <DialogContent>You must be logged in.</DialogContent>
                <DialogActions>
                    <Button sx={{flexGrow: 1}} component={NavLink} to='/login' onClick={handleClose}>Login</Button>
                    <Button color='secondary' component={NavLink} to='/signup' sx={{flexGrow: 1}} onClick={handleClose}>Signup</Button>
                </DialogActions>
            </Dialog>
                
            {youtubeCategories.map(category=>{
                let title = category.title;
                if(title.includes('&')) title = category.title.split(' & ').join('-');
                return (<Button component={NavLink} to={`/category/${category.id}/${category.title}`}
                variant='outlined'
                key={category.id} sx={{
                    mt: 2, borderRadius: 10, fontSize: '0.7rem', textAlign: 'center', backgroundColor: '&:active' ?  theme.palette.navBackground.primary : theme.palette.primary.main}}
                color='secondary'
                size='small' >
                    
                    {category.title}</Button>)
                    
                
})}         
                
            </Container>
    </Drawer>
}
    </>
  )
    }
