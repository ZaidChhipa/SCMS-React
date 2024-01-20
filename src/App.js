import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Setting from './pages/Setting';
import Category from './pages/Category';
import Login from './pages/Login';
import Profile from './pages/profile';
import Dashboard from './pages/dashboard/Dashboard';
import AddCategory from './pages/AddCategory';
import AddCategoryType from './pages/AddCategoryType';
import AccountUserSetup from './pages/AccountUserSetup';
import CategoryType  from './pages/CategoryType';
import Signup from './pages/signup';
import Products from './pages/Product';
import AuthLogin from './pages/Logintest';
import ProductListing from './pages/Productlisting';
import ProductDetail from './pages/ProductDetail';
import Shop from './pages/Shop'

function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/home' exact element={<Home />}></Route>
        <Route path='about' exact element={<About />}></Route>
        <Route path='setting' exact element={<Setting />}></Route>
        <Route path='category' exact element={<Category />}></Route>
        <Route path='categorytype' exact element={<CategoryType />}></Route>
        <Route path='/login' exact element={<Login />}></Route>
        <Route path='/*' element={<Navigate to='/logintest' />} />

        <Route path='/profile' exact element={<Profile />}></Route>
        <Route path='/dashboard' exact element={<Dashboard />}></Route>
        <Route path='/addcategory' exact element={<AddCategory />}></Route>
        <Route path='/addcategorytype' exact element={<AddCategoryType/>}></Route>
        <Route path='/adduser'  exact element={<AccountUserSetup/>}></Route>
        <Route path='/signup'  exact element={<Signup/>}></Route>
        <Route path='/products'  exact element={<Products/>}></Route>
        <Route path='/allproducts'  exact element={<ProductListing/>}></Route>
        <Route path='/productdetail'  exact element={<ProductDetail/>}></Route>
        <Route path='/shop'  exact element={<Shop/>}></Route>
        <Route path='/logintest' exact element ={<AuthLogin/>}></Route>
      </Routes>
    </BrowserRouter>
  </>;
}

export default App;