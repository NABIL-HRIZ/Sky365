import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './componants/Navbar'
import Footer from './componants/Footer'
import Home from './pages/Home'
import AllRooms from './pages/AllRooms'
import RoomDetails from './pages/RoomDetails'
import About from './pages/About'
import MyBookings from './pages/MyBookings'
const App = () => {
  return (
     <BrowserRouter>
     <Navbar />
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/all-rooms' element={<AllRooms />} />
      <Route path='/rooms/:roomId' element={<RoomDetails />} />
      <Route path='/about' element={<About />} />
      <Route path='/bookings' element={<MyBookings />} />
      

     </Routes>
     <Footer />
     </BrowserRouter>
  )
}

export default App
