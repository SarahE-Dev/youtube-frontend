import { Home } from '@mui/icons-material'
import { Drawer, List, ListItemIcon, ListItemButton, ListItemText, Button, Container } from '@mui/material'
import React, {useState} from 'react'
import theme from '../theme'
import  youtubeCategories from '../helpers/categories'
import { Link, NavLink } from 'react-router-dom'

const list = [
    {text: 'Favorites'},
    {text: 'History'},
    {text: 'Watch Later'},
    {text: 'Playlists'}
]

export default function Sidebar() {
    const [isActive, setIsActive] = useState(false)
  return (
    <Drawer
    PaperProps={{
        style: {
            width: '200px',
            backgroundColor: theme.palette.navBackground.primary,
            paddingTop: '80px',
            
        }
    }}
    className='sidebar'
    variant='permanent' anchor='left'>
        
            
            <Container 
             style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%'}}>
               {list.map(item=>(
                   <Button key={item.text} component={NavLink} to={`/${item.text === 'Watch Later' ? 'watch-later' : item.text.toLowerCase()}`} 
                   sx={{mt: 2, borderRadius: 10, fontSize: '0.7rem', textAlign: 'center', backgroundColor: isActive ? theme.palette.secondary.main : theme.palette.navBackground.primary}}
                   variant='outlined' color='primary'>{item.text}</Button>
               ))}
            {youtubeCategories.map(category=>(
                
                <Button component={NavLink} to={`/category/${category.id}/${category.title}`}
                key={category.id} variant='outlined'
                color='secondary'
                size='small' sx={{mt: 2, borderRadius: 10, fontSize: '0.7rem', textAlign: 'center', backgroundColor: isActive ? theme.palette.secondary.main : theme.palette.navBackground.secondary}}>
                    
                    {category.title}</Button>
                
            ))}
            </Container>
        
    </Drawer>
  )
}
