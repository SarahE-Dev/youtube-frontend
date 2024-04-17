import { Home } from '@mui/icons-material'
import { Drawer, List, ListItemIcon, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'
import theme from '../theme'

export default function Sidebar() {
  return (
    <Drawer
    PaperProps={{
        style: {
            width: '200px',
            backgroundColor: theme.palette.navBackground.primary,
            paddingTop: '10vh',
            
        }
    }}
    variant='permanent' anchor='left'>
        <List sx={{}}>
            
            <ListItemButton>
            <ListItemIcon>
                <Home />
            </ListItemIcon>
            <ListItemText>
                Home
            </ListItemText>
            </ListItemButton>
        </List>
    </Drawer>
  )
}
