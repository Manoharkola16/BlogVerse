import React from 'react'
import { RouterProvider } from 'react-router-dom'
import Routes from './Routes/Router.jsx'
import './App.css'

const App = () => {
  return (
    <>
        <RouterProvider router={Routes}></RouterProvider>
    </>
  )
}

export default App

