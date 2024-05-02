import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { useMediaQuery } from '@mui/material'
import { Outlet, useLocation } from 'react-router'
import { checkAuthUser } from './hooks/checkAuthUser'
import { useEffect } from 'react'

export default function Layout({children}) {
    const { pathname} = useLocation()
    const {checkIfCookieExists, loginUser} = checkAuthUser()
    
    if(checkIfCookieExists()){
      loginUser()
    }
  
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
