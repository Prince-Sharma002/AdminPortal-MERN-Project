import React, { useState } from 'react'
import {useNavigate} from "react-router-dom";
import { useAuth } from '../store/auth';
import "../styles/login.scss";
import { toast } from 'react-toastify';

const Login = () => {
    
const [user , setUser] = useState({
    email : "",
    password : ""
})

const navigate = useNavigate();
const {storetokenInLS} = useAuth();

const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    console.log(e);
    
    setUser({
       ...user,
        [name] : value,
    });
}

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try{
        const response  = await fetch('http://localhost:5000/auth/login' , {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(user)
        })

        const data = await response.json();
        if (response.ok) {
            console.log("response" , response);
            console.log(data);
            
            storetokenInLS(data.token);
            toast.success("login successful");
            setUser({
                email : "",
                password : ""
            });

            navigate("/");
        }
        else{
            toast.error( data.extraDetails ? data.extraDetails : data.message );
            return ;
        }


    }catch(err){
        console.log(err , "error")
    }

}

return (
    <div className='login'>
        
        <form onSubmit={handleSubmit} style={{marginTop : "10rem"}}>
            <h1 style={{textAlign :"center" }}>LOGIN FORM</h1>
            <label htmlFor='email'>Email</label>
            <input type='text' name='email' value={user.email} onChange={handleInput} placeholder='Email' />
        
            <label htmlFor='password'>Password</label>
            <input type='text' name='password' value={user.password} onChange={handleInput} placeholder='Password' />

            <button type='submit'> Login  </button>

        </form>
    </div>
  )
}

export default Login