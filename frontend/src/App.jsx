import React from 'react'
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Home'
import Create from './Create'
import Read from './Read'
import Update from './Update'


const App = () => {
  return ( 
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
       <Route path='/Create' element={<Create/>}/>
       <Route path='/read/:id' element={<Read/>}/>
       <Route path='/update/:id' element={<Update/>}/>
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App

