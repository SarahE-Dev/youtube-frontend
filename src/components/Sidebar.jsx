import { Favorite, WatchLater, History, PlaylistPlaySharp, AndroidSharp, Draw, Home } from '@mui/icons-material'
import { Drawer, List, ListItemIcon, ListItemButton, ListItemText, Button, Container, createStyles, Slide, Dialog, DialogTitle, DialogContent, DialogActions, Fab, TextField, Typography, Avatar } from '@mui/material'
import React, {useState, useEffect} from 'react'
import theme from '../theme'
import  youtubeCategories from '../helpers/categories'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { decodeHTML } from '../helpers/helper'
import CursorSvg from './CursorSvg'
import BlueZack from './BlueZack'


const list = [
  {text: 'Favorites', icon: <Favorite/>},
  {text: 'History', icon: <History/>},
  {text: 'Playlists', icon: <PlaylistPlaySharp/>},
]

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
const model = genAI.getGenerativeModel({model: 'gemini-pro'})

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function Sidebar() {
    const [isActive, setIsActive] = useState(false)
    const user = useSelector(state=>state.user.user)
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false)
    const [chatHistory, setChatHistory] = useState([])
    const [prompt, setPrompt] = useState('')
    const [answer, setAnswer] = useState('')
    const [completedTyping, setCompletedTyping] = useState(true)
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
            <Drawer sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: theme.palette.navBackground.primary,
            height: '50vh',
            padding: 2,
            textAlign: 'center',
          },
        }} variant='temporary' anchor='bottom' open={bottomDrawerOpen} onClose={()=>setBottomDrawerOpen(false)}>
                <BlueZack />
                <Typography id='chat'  sx={{textAlign: 'center', mt: 2, height: '33vh', overflow: 'auto', overflowAnchor: 'auto'}}>{answer}{!completedTyping && <CursorSvg />}</Typography>
                <form onSubmit={run}>
                  <TextField disabled={!completedTyping} value={prompt} onChange={(e)=>setPrompt(e.target.value)} />
                  <Button sx={{mt: 1}} type='submit'>Send</Button>
                </form>
            </Drawer>

        
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
              
                   <Button startIcon={item.icon} onClick={user ? null : handleClickOpen}
                    component={user ? NavLink : Button}  key={item.text} to={`/${ item.text=== 'Home' ?'' : item.text.toLowerCase()}`} 
                   sx={{ mt: 2, borderRadius: 10, fontSize: '0.7rem', textAlign: 'center', display: "flex"}}
                   variant='outlined' color='primary'>{item.text}</Button>
                   
                        
               ))} 
               <div style={{display: 'flex', justifyContent: 'center'}}>
               <Fab onClick={()=>{setBottomDrawerOpen(true);}} sx={{mt: 2, width: '50%', borderRadius: 15}} variant='outlined' color='primary'><BlueZack /></Fab>
               </div>
               
            {youtubeCategories.map(category=>{
                let title = category.title;
                if(title.includes('&')) title = category.title.split(' & ').join('-');
                return (<Button component={NavLink}  to={`/category/${category.id}/${title}`}
                key={category.id} variant='outlined'
                color='secondary'
                size='small' sx={{mt: 2, borderRadius: 10, fontSize: '0.7rem', textAlign: 'center'}}>
                    
                    {category.title}</Button>)
                
})}
            </Container>
        
    </Drawer>
  )
}
