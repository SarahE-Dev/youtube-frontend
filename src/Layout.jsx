import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import {  useMediaQuery } from '@mui/material'

export default function Layout({children}) {
    const isSmallScreen = useMediaQuery(theme=>theme.breakpoints.down('md'))
  return (
    <>
    {!isSmallScreen && <Sidebar />}
    <Navbar />
    <div style={{marginLeft: isSmallScreen ? 0 : 200}}>
        {children}
    </div>
    </>
  )
}
