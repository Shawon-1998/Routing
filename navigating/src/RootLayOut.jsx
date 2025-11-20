import React from 'react'
import { Outlet } from "react-router";
import NavBar from './components/NavBar';
import Footer from './components/Footer';


const RootLayOut = () => {
  return (
    <div>
      <NavBar/>
      <Outlet/>
    <Footer/>
    </div>
  )
}

export default RootLayOut
