import React from 'react'
import { Grid, Avatar, Typography } from '@mui/material'
import { decodeHTML } from '../helpers/helper'

export default function Video(props) {
    const {video} = props
  return (
    <Grid height='fit-content' xs={6} sm={4} md={4} lg={3} item>
    <img width='100%' style={{objectFit: 'cover', objectPosition: 'top'}}  src={video.snippet.thumbnails.medium.url} alt="" />
    <div style={{display: 'flex', alignItems: 'center',}}>
    <Avatar sx={{marginRight: .5}}  />
    <Typography className='wrap-text' title={decodeHTML(video.snippet.title)} sx={{whiteSpace: 'pre-line', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: {
    xs: '0.6rem',
    sm: '0.6rem',
    md: '0.7rem',
    lg: '0.7rem'
    }
    }} >
    {decodeHTML(video.snippet.title)}</Typography>
    </div>
    </Grid>
  )
}
