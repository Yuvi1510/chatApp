import React from 'react'
import { Route, Routes } from 'react-router'
import App from '../App'
import ChatPage from '../component/ChatPage'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<App/>}></Route>
        <Route path='/chat' element={<ChatPage/>}></Route>
    </Routes>
  )
}

export default AppRoutes
