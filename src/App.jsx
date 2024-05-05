import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import  Router  from './router';

export default function App() {
  
  return (
    <>
    <RouterProvider router={Router}  />
    </>
  )
}

