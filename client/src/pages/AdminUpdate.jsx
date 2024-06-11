import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import "../styles/updateAdmin.scss"

const AdminUpdate = () => {
 
  const { id } = useParams(); 

  const {authorizationToken} = useAuth();


  const [data, setData] = useState({
    username: '',
    email: '',
    phone: '',
  });



  const fetchUserdata = async () => {
    try{
        console.log("id is " , id);
        const response = await fetch(`http://localhost:5000/admin/users/${id}` , {
            method : 'GET',
            headers : {
                'Authorization' : authorizationToken,
            }
        })

        const data = await response.json();
        console.log("user data " , data);
        setData(data);

    }catch(e){
        console.log(e)
    }
  }

  useEffect(()=>{
      fetchUserdata();
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));




  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
        const response = await fetch(`http://localhost:5000/admin/users/update/${id}` , {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : authorizationToken,
            },
            body : JSON.stringify(data)
        })

        if( response.ok ){
            toast.success("update successful");
        }
        

    }catch(e){
        toast.error("update unsuccessful");
        console.log(e)
    }

    console.log('Form submitted with data:', data);

  };

  return (
    <div className='updateAdmin'>
      <h1> UPDATE USER </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={data.phone}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AdminUpdate;
