import { AppBar, Toolbar, Button, IconButton, Box, Autocomplete, TextField, MenuItem, Menu as Menu2, Typography, Drawer, ButtonGroup, CircularProgress, Container, MenuList, ListItemIcon } from '@mui/material'
import React, { useState } from 'react'
import {useMediaQuery, useTheme} from '@mui/material'
import { AccountCircleOutlined, Favorite, History, Home, Login, Logout, Menu, MoreVert, Person, PersonAdd, PlaylistPlaySharp, SearchOutlined, WatchLater } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'
import { setVideos } from '../features/video/videoSlice';
import { useNavigate } from 'react-router';
import youtubeCategories from '../helpers/categories';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../features/user/userSlice';


const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

const list = [
    {text: 'Favorites', icon: <Favorite/>},
    {text: 'History', icon: <History/>},
    {text: 'Watch Later', icon: <WatchLater/>},
    {text: 'Playlists', icon: <PlaylistPlaySharp/>}
]


export default function Navbar() {
    const navigate = useNavigate()
    const user = useSelector(state=>state.user.user)
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch()
    const [options, setOptions] = useState([])
    const theme = useTheme();
    const [searchInput, setSearchInput] = useState('')
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [loading, setLoading] = useState(false)
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
        setLoading(true)
        setSearchInput(input)
        suggest(input)
    }

    const handleMenuClick=(text)=>{
        setAnchorEl(null);
        navigate(`/${text}`)
    }
    
    const handleSearchSubmit = async(e)=>{
        e.preventDefault()
        
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    part: 'snippet',
                    key: API_KEY,
                    q: searchInput,
                    maxResults: 20
                }
            })
            console.log(response.data.items);
            localStorage.setItem('searchedVideos', JSON.stringify(response.data.items))
            dispatch(setVideos(response.data.items))
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
        {!isSmallScreen && <Link to='/'><Typography variant='h4'>Logo</Typography></Link>}
            {isSmallScreen && <IconButton
            onClick={toggleDrawer}
            edge='start' color='inherit'
            aria-label='menu' sx={{mr: 2}}
            ><Menu/></IconButton>}
                <Box  sx={{flexGrow: 1,display: 'flex', justifyContent: 'center'}} onSubmit={handleSearchSubmit}>
                    <form style={{display: 'flex', width: '100%', maxWidth: 500}} onSubmit={()=>handleSearchSubmit()}>
                <Autocomplete
                value={searchInput}
                
                disableClearable
                onSelect={(e)=>handleInputChange(e.target.value)}
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
                
               
            {user && 
            <Box sx={{display: 'flex'}}>
             <IconButton aria-controls='menu' aria-haspopup='true' edge='end' sx={{ml: 2}} onClick={(e)=>setAnchorEl(e.currentTarget)}><AccountCircleOutlined/></IconButton>
                
             <Menu2 sx={{mt: 7}} transformOrigin={{vertical: 'top', horizontal: 'right'}} anchorOrigin={{vertical: 'top', horizontal: 'right'}} id='menu'  open={Boolean(anchorEl)} onClose={()=>setAnchorEl(null)} keepMounted anchorEl={anchorEl}>
                <MenuItem><ListItemIcon><Person/></ListItemIcon>Profile</MenuItem>
                <MenuItem onClick={()=>{dispatch(logout()); setAnchorEl(null)}}><ListItemIcon><Logout/></ListItemIcon>Logout</MenuItem>
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
    {isSmallScreen &&
    <Drawer PaperProps={{
        style: {
            width: '200px',
            backgroundColor: theme.palette.navBackground.primary,
            paddingTop: '80px',
            paddingBottom: 20
        }
    
    }} variant='temporary' anchor='left' open={isDrawerOpen} onClose={toggleDrawer}>
        <Container
             style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%'}}>
                
               {list.map(item=>(
                
                   <Button key={item.text}  component={NavLink} to={`/${item.text === 'Watch Later' ? 'watch-later' : item.text.toLowerCase()}`} 
                   sx={{mt: 2, borderRadius: 10, fontSize: '0.7rem', textAlign: 'center', backgroundColor: theme.palette.navBackground.primary}}
                   startIcon={item.icon}
                   variant='outlined' color='primary'>{item.text}</Button>
               ))}
               
                
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
