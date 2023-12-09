import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Setting from './pages/Setting';
import Category from './pages/Category';
import Login from './pages/Login';
 
function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/home' exact element={<Home />}></Route>
        <Route path='about' exact element={<About />}></Route>
        <Route path='setting' exact element={<Setting />}></Route>
        <Route path='category' exact element={<Category />}></Route>
        <Route path='/login' exact element={<Login />}></Route>
        <Route path='/*' element={<Navigate to='/login' />} />
      </Routes>
    </BrowserRouter>
  </>;
}

export default App;