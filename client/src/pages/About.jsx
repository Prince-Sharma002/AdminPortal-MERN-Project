import React, { useEffect } from 'react'
import { useAuth } from '../store/auth'
import "../styles/about.scss";


const About = () => {

  const { user } = useAuth();

  useEffect(()=>{
      console.log("user" , user)
  }, [user]);

  
  return (
    <div className='about'>

      <h1>ABOUT</h1>

      {
        user ? ( <p> hi {user.username}  </p>) : <p> hi friend </p>
      }

      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis repellendus nobis accusantium mollitia voluptatum cupiditate debitis eos quo dicta veritatis blanditiis fugiat quod, ipsa ipsam. Tenetur, nemo! Nisi, sed culpa.</p>

    </div>
  )
}

export default About