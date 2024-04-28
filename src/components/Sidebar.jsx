import { Favorite, WatchLater, History, PlaylistPlaySharp } from '@mui/icons-material'
import { Drawer, List, ListItemIcon, ListItemButton, ListItemText, Button, Container, createStyles, Slide, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import React, {useState} from 'react'
import theme from '../theme'
import  youtubeCategories from '../helpers/categories'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const list = [
  {text: 'Favorites', icon: <Favorite/>},
  {text: 'History', icon: <History/>},
  {text: 'Watch Later', icon: <WatchLater />},
  {text: 'Playlists', icon: <PlaylistPlaySharp/>}
]

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Sidebar() {
    const [isActive, setIsActive] = useState(false)
    const user = useSelector(state=>state.user.user)
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
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
        
            <Dialog TransitionComponent={Transition} open={open} onClose={handleClose} sx={{textAlign: 'center'}}>
                <DialogTitle>Login or Signup</DialogTitle>
                <DialogContent>You must be logged in.</DialogContent>
                <DialogActions>
                    <Button sx={{flexGrow: 1}} component={NavLink} to='/login' onClick={handleClose}>Login</Button>
                    <Button color='secondary' component={NavLink} to='/signup' sx={{flexGrow: 1}} onClick={handleClose}>Signup</Button>
                </DialogActions>
            </Dialog>
            <Container 
             style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '110%', marginLeft: '-10px'}}>
               {list.map(item=>(
                <>
                   <Button startIcon={item.icon} onClick={user ? null : handleClickOpen}
                    component={user ? NavLink : Button}  key={item.text} to={`/${item.text === 'Watch Later' ? 'watch-later' : item.text.toLowerCase()}`} 
                   sx={{ mt: 2, borderRadius: 10, fontSize: '0.7rem', textAlign: 'center', display: "flex"}}
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
