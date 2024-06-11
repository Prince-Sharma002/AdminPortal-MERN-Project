import React, { useEffect } from 'react'
import {Link} from "react-router-dom";
import "../styles/navbar.scss"
import { useAuth } from '../store/auth';

const Navbar = () => {

  const {isLoggedIn} = useAuth();


  return (
    <header>
        <div className="container">
            <span className="logo-brand">
                Mern App
            </span>

            <nav>
                <ul>
                    <li> <Link to={"/"}> Home </Link> </li>

                    {
                        isLoggedIn?
                        (
                            <li> <Link to={"/logout"}> Logout </Link> </li>
                        ) :
                        (
                         <>
                         <li> <Link to={"/login"}> Login </Link> </li>
                         <li> <Link to={"/register"}> Register </Link> </li>
                         </>   
                        )
                        
                    }

                    <li> <Link to={"/contact"}> Contact </Link> </li>
                    <li> <Link to={"/about"}> About </Link> </li>
                    <li> <Link to={"/service"}> Service </Link> </li>
                </ul>    
            </nav>
        </div>
    </header>
  )
}

export default Navbar