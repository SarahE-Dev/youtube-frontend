import { AppBar, Toolbar, Button, IconButton, Box, Autocomplete, TextField, MenuItem, Menu as Menu2, Typography, Drawer, ButtonGroup, CircularProgress, dividerClasses } from '@mui/material'
import React, { useState } from 'react'
import {useMediaQuery, useTheme} from '@mui/material'
import { AccountCircleOutlined, Menu, MoreVert, SearchOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'



const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY


export default function Navbar() {
    const user = useSelector(state=>state.user.user)
    const [anchorEl, setAnchorEl] = useState(null);
    const [options, setOptions] = useState([])
    const theme = useTheme();
    const [searchInput, setSearchInput] = useState('')
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [loadingText, setLoadingText] = useState(false)
    const suggest = async(term) =>{
        setLoadingText(true)
        const response = await axios(`https://suggestqueries-clients6.youtube.com/complete/search?client=youtube&hl=en&gl=us&ds=yt&q=${term}`, {
            mode: 'no-cors',
            method: 'GET',
            adapter: jsonpAdapter,
        })
        setLoadingText(false)
        console.log(response);
        setOptions(response.data[1].map(item=>item[0]))
        
    }
    
    const toggleDrawer = ()=>setIsDrawerOpen(!isDrawerOpen)
    const handleInputChange =async(input) => {
        setSearchInput(input)
        suggest(input)
        console.log(searchInput);
    }
    
    const handleSearchSubmit = async(e)=>{
        e.preventDefault()
        console.log(searchInput);
        setSearchInput('')
        setOptions([])
        // fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=video&q=${searchInput}&maxResults=20&strictSearch=true&regionCode=US&relevanceLanguage=en`)
        // .then(res=>res.json())
        // .then(data=>{
        //     console.log(data);
        //     setSearchInput('')
        // })
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

                {/* autocomplete button that you can submit */}
                <Box  sx={{flexGrow: 1,display: 'flex', justifyContent: 'center'}} onSubmit={handleSearchSubmit}>
                    <form style={{display: 'flex', width: '100%', maxWidth: 500}} onSubmit={()=>handleSearchSubmit()}>
                <Autocomplete
                value={searchInput}
                onInputChange={(event, newValue) => {
                handleInputChange(newValue)
                }}
                disableClearable
                
                freeSolo
                inputMode='search'
                options={options}
                loading={loadingText}
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
