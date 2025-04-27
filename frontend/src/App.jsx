import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import CheckOut from './pages/CheckOut/CheckOut';
import Menu from './pages/Menu/Menu';
import About from './pages/About/About';
import AdminPanel from './pages/Admin/AdminPanel';
import MyOrders from './pages/Orders/MyOrders';
import Profile from './components/Profile/Profile';

const App = () => {
  const [user, setUser] = useState({
    name: "Siraj",
    email: "siraj@binus.ac.id",
    joinDate: "2025-03-13",
    isAdmin: true
  });

  return (
    <>
      <div className='app'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<CheckOut />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/about' element={<About />} />
          <Route path='/orders' element={<MyOrders />} />
          <Route path='/admin' element={user?.isAdmin ? <AdminPanel /> : <Home />} />
          <Route path='/profile' element={<Profile user={user} setUser={setUser} />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
