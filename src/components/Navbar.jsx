import { AppBar, Toolbar, Button, IconButton, Box, Autocomplete, TextField, MenuItem, Menu as Menu2 } from '@mui/material'
import React, { useState } from 'react'
import {useMediaQuery, useTheme} from '@mui/material'
import { AccountCircleOutlined, Menu, MoreVert, SearchOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';




export default function Navbar() {
    const user = useSelector(state=>state.user.user)
    const [anchorEl, setAnchorEl] = useState(null);
    const [options, setOptions] = useState([])
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <AppBar sx={{backgroundColor: theme.palette.navBackground.primary}} position='fixed'>
        <Toolbar>
            {isSmallScreen && <IconButton edge='start' color='inherit'
            aria-label='menu' sx={{mr: 2}}
            ><Menu/></IconButton>}
            <Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'center'}}>
                <Autocomplete size='small'
                options={options}
                sx={{width: '90%', maxWidth: 500}}
                renderInput={(params)=>(
                    <TextField  color='secondary' {...params}
                    sx={{mt: 1, mb: 1}}
                    label={<SearchOutlined/>} variant='outlined' />
                )}
                />
            </Box>
            
            {user && 
            <Box sx={{display: 'flex'}}>
             <IconButton aria-controls='menu' aria-haspopup='true' edge='end' sx={{ml: 2}} onClick={(e)=>setAnchorEl(e.currentTarget)}><AccountCircleOutlined/></IconButton>
                
             <Menu2 sx={{mt: 4}} transformOrigin={{vertical: 'top', horizontal: 'right'}} anchorOrigin={{vertical: 'top', horizontal: 'right'}} id='menu'  open={Boolean(anchorEl)} onClose={()=>setAnchorEl(null)} keepMounted anchorEl={anchorEl}>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Logout</MenuItem>
                </Menu2>
                
                </Box>
                }
            {!user && 
            <Box sx={{display: 'flex'}}>
             <IconButton aria-controls='menu' aria-haspopup='true' edge='end' sx={{ml: 2}} onClick={(e)=>setAnchorEl(e.currentTarget)}>
                <MoreVert/></IconButton>
                
             <Menu2 sx={{mt: 4}} transformOrigin={{vertical: 'top', horizontal: 'right'}} anchorOrigin={{vertical: 'top', horizontal: 'right'}} id='menu'  open={Boolean(anchorEl)} onClose={()=>setAnchorEl(null)} keepMounted anchorEl={anchorEl}>
                <MenuItem>Login</MenuItem>
                <MenuItem>Signup</MenuItem>
                </Menu2>
                
                </Box>
                }
        </Toolbar>
    </AppBar>
  )
}
