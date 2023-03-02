import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Auth from './Auth'
import Home from './Home'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Auth />} />
        <Route  path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App