import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import {  useMediaQuery } from '@mui/material'
import { Outlet, useLocation } from 'react-router'

export default function Layout({children}) {
    const { pathname} = useLocation()
    const isSmallScreen = useMediaQuery(theme=>theme.breakpoints.down('md'))
    const noSidebar = pathname === '/login' || pathname === '/signup' || isSmallScreen
  return (
    <>
    {!noSidebar && <Sidebar />}
    <Navbar />
    <div style={{marginLeft: noSidebar ? 0 : 200}}>
        <Outlet />
    </div>
    </>
  )
}
