import { Container, Grid, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'
import theme from '../theme'
import { useParams } from 'react-router'
import Video from './Video'
import axios from 'axios'


export default function VideoShell({children}) {
    const categoryID = useParams().categoryID
    const categoryTitle = useParams().categoryTitle
    const [videos, setVideos] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                    params: {
                        part: 'snippet',
                        chart: 'mostPopular',  
                        videoCategoryId: categoryID, 
                        maxResults: 25,
                        key: import.meta.env.VITE_YOUTUBE_API_KEY
                    }
                });
                console.log(response.data.items);
                setVideos(response.data.items);
            } catch (error) {
                console.log(error); 
            } 
        };

        fetchData();
    }, [categoryID])
  return (
    <Container sx={{background: theme.palette.gradientBackground.primary, height: '100vh', paddingTop: '90px',overflow: 'scroll', paddingBottom: 3}} maxWidth={false}>
        <Typography component='h1' p={1} textAlign='center'>{categoryTitle.split('-').join(' & ')}</Typography>
        <Grid alignItems='center' spacing={{xs: 4, sm: 4, md: 5, lg: 6}} wrap='wrap' container>
            {videos?.map(video=>(
                video.id.kind === 'youtube#channel' ? null :
                <Video key={video.snippet.title} video={video} />
            ))}
        </Grid>
    </Container>
  )
}
