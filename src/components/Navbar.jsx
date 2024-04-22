import { AppBar, Toolbar, Button, IconButton, Box, Autocomplete, TextField, MenuItem, Menu as Menu2, Typography, Drawer, ButtonGroup, CircularProgress, dividerClasses } from '@mui/material'
import React, { useState } from 'react'
import {useMediaQuery, useTheme} from '@mui/material'
import { AccountCircleOutlined, Menu, MoreVert, SearchOutlined } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'
import { setVideos } from '../features/video/videoSlice';



const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

const sampleVideoResponse = {
    etag: 'PHfTdfpGdUAfXu4xjOs00aDmdL4',
    id: {
        kind: 'youtube#video',
        videoId: 'PZt1vnxonJk'
    },
    kind: 'youtube#searchResult',
    snippet: {
        channelId: 'UCdC0An4ZPNr_YiFiYoVbwaw',
        channelTitle: 'Daily Dose Of Internet',
        description: 'Hello everyone, this is YOUR Daily Dose',
        liveBroadcastContent: 'none',
        publishedAt: '2023-12-17T20:13:36Z',
        publishedTime: '2023-12-17T20:13:36Z',
        thumbnails: {
            default: {
                height: 90,
                url: "https://i.ytimg.com/vi/PZt1vnxonJk/default.jpg"
                ,
                width: 120
            },
            high: {
                height: 360,
                url: "https://i.ytimg.com/vi/PZt1vnxonJk/hqdefault.jpg",
                width: 480
            },
            medium: {
                height: 180,
                url: "https://i.ytimg.com/vi/PZt1vnxonJk/mqdefault.jpg",
                width: 320
            }
        },
        title: "The Best Of The Internet (2023)"
    }
}


export default function Navbar() {
    const user = useSelector(state=>state.user.user)
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch()
    const [options, setOptions] = useState([])
    const theme = useTheme();
    const [searchInput, setSearchInput] = useState('')
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
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
        console.log(searchInput);
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
        {!isSmallScreen && <Typography variant='h4'>Logo</Typography>}
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
                {/* <Autocomplete
                inputMode='search'
                onInputChange={(e, value)=>handleInputChange(value)}
                id='autocomplete'

                fullWidth
                inputValue={searchInput}
                loading={loadingText}
                loadingText={<div style={{textAlign: 'center'}}>
                    <CircularProgress color='secondary' size={20}/>
                </div>}
                sx={{flexGrow: 1, maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto', backgroundColor: theme.palette.navBackground, borderRadius: 10, '& .MuiOutlinedInput-root': {borderRadius: 10}}}
                 size='small'
                options={options}
                freeSolo
                disableClearable
                renderInput={(params)=>(
                    <TextField color='secondary' {...params}
                    sx={{mt: 1, mb: 1}}
                    InputProps={{...params.InputProps, type: 'search',}}
                    label='Search'
                    variant='outlined' />
                    
                )}
                /> */}
                
               
            {user && 
            <Box sx={{display: 'flex'}}>
             <IconButton aria-controls='menu' aria-haspopup='true' edge='end' sx={{ml: 2}} onClick={(e)=>setAnchorEl(e.currentTarget)}><AccountCircleOutlined/></IconButton>
                
             <Menu2 sx={{mt: 7}} transformOrigin={{vertical: 'top', horizontal: 'right'}} anchorOrigin={{vertical: 'top', horizontal: 'right'}} id='menu'  open={Boolean(anchorEl)} onClose={()=>setAnchorEl(null)} keepMounted anchorEl={anchorEl}>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Logout</MenuItem>
                </Menu2>
                
                </Box>
                }
            {!user && 
            <Box sx={{display: 'flex'}}>
             <IconButton aria-controls='menu' aria-haspopup='true' edge='end' sx={{ml: 2}} onClick={(e)=>setAnchorEl(e.currentTarget)}>
                <MoreVert/></IconButton>
                
             <Menu2 sx={{mt: 7}} transformOrigin={{vertical: 'top', horizontal: 'right'}} anchorOrigin={{vertical: 'top', horizontal: 'right'}} id='menu'  open={Boolean(anchorEl)} onClose={()=>setAnchorEl(null)} keepMounted anchorEl={anchorEl}>
                <MenuItem>Login</MenuItem>
                <MenuItem>Signup</MenuItem>
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
            
        }
    
    }} variant='temporary' anchor='left' open={isDrawerOpen} onClose={toggleDrawer}>
        <Typography textAlign='center' variant='h4'>Logo</Typography>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <ButtonGroup>
            <Button variant='outlined' size='small' sx={{mt: 2, borderRadius: 10, fontSize: '.5rem'}}>Home</Button>
            <Button variant='outlined' size='small' sx={{mt: 2, borderRadius: 10}}>Home</Button>
            </ButtonGroup>
            
            <Button variant='outlined' size='small' sx={{mt: 2, borderRadius: 10}}>Home</Button>
            <Button variant='outlined' size='small' sx={{mt: 2, borderRadius: 10}}>Home</Button>
            <Button variant='outlined' size='small' sx={{mt: 2, borderRadius: 10}}>Home</Button>
            <Button variant='outlined' size='small' sx={{mt: 2, borderRadius: 10}}>Home</Button>
            <Button variant='outlined' size='small' sx={{mt: 2, borderRadius: 10}}>Home</Button>
        </Box>
    </Drawer>
}
    </>
  )
    }
