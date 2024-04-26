import { Favorite, WatchLater, History, PlaylistPlaySharp } from '@mui/icons-material'
import { Drawer, List, ListItemIcon, ListItemButton, ListItemText, Button, Container, createStyles } from '@mui/material'
import React, {useState} from 'react'
import theme from '../theme'
import  youtubeCategories from '../helpers/categories'
import { NavLink } from 'react-router-dom'

const list = [
  {text: 'Favorites', icon: <Favorite/>},
  {text: 'History', icon: <History/>},
  {text: 'Watch Later', icon: <WatchLater/>},
  {text: 'Playlists', icon: <PlaylistPlaySharp/>}
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
            paddingBottom: 20
        }
    }}
    className='sidebar'
    variant='permanent' anchor='left'>
        
            
            <Container 
             style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%'}}>
               {list.map(item=>(
                <>
                   <Button startIcon={item.icon}
                    component={NavLink}  key={item.text} to={`/${item.text === 'Watch Later' ? 'watch-later' : item.text.toLowerCase()}`} 
                   sx={{ mt: 2, borderRadius: 10, fontSize: '0.7rem', textAlign: 'center'}}
                   variant='outlined' color='primary'>{item.text}</Button>
                   
                        </>
               ))} 
            {youtubeCategories.map(category=>{
                let title = category.title;
                if(title.includes('&')) title = category.title.split(' & ').join('-');
                return (<Button component={NavLink} className={(state)=>console.log(state)} to={`/category/${category.id}/${title}`}
                key={category.id} variant='outlined'
                color='secondary'
                size='small' sx={{mt: 2, borderRadius: 10, fontSize: '0.7rem', textAlign: 'center'}}>
                    
                    {category.title}</Button>)
                
})}
            </Container>
        
    </Drawer>
  )
}
