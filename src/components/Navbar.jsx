import { AppBar, Toolbar, Button, IconButton, Box, Autocomplete, TextField } from '@mui/material'
import React, { useState } from 'react'
import {useMediaQuery, useTheme} from '@mui/material'
import { AccountCircleOutlined, Menu, SearchOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';




export default function Navbar() {
    const user = useSelector(state=>state.user.user)
    const [options, setOptions] = useState([])
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <AppBar sx={{backgroundColor: theme.palette.navBackground.primary}} position='static'>
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
                    label={<SearchOutlined/>} variant='outlined' />
                )}
                />
            </Box>
            {user && <IconButton
            
            edge='end'><AccountCircleOutlined/></IconButton>}
        </Toolbar>
    </AppBar>
  )
}
