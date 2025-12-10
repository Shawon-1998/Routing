import React from 'react'
import logo from '../assets/react.svg'
import { NavLink } from "react-router";

const NavBar = () => {
  return (
    <>
      <div className='= w-full '>
      {/* <div className='top-0 absolute w-full'> */}
        <nav className='container top-0 relative '>
          <div className='flex justify-between items-center py-3'>
            <div>
              <NavLink to="/" end>
                <img src={logo} alt="" />
              </NavLink>
            </div>
            <ul className='flex gap-6 text-xl '>
              <li> <NavLink to="/" end>
                Home
              </NavLink></li>
              <li> <NavLink to="/About" end>
                About
              </NavLink></li>
              <li>Our Success</li>
              <li><NavLink to="/" end>
               Services
              </NavLink></li>
            </ul>
          </div>
        </nav>
      </div>

    </>
  )
}

export default NavBar
