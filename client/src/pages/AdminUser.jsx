import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth'
import "../styles/adminUser.scss"
import {Link} from "react-router-dom";

const AdminUser = () => {

  const {authorizationToken} = useAuth();
  const [users , setUsers]  = useState([]);

  const getallUserData = async () => {
    console.log("user")
    try{
      const response = await fetch('http://localhost:5000/admin/users',
        {
          method : 'GET',
          headers : {
            'Authorization' : authorizationToken,
          }
        }
      )

      const data = await response.json();
      if( response.ok ){
        console.log("the data is " , data);
        setUsers(data);
        return data;
      }

    }
    catch(e){
      console.log(e);
    }
  }

  useEffect(()=>{
    getallUserData();
  },[])

  const deleteUser = async(id)=>{
    try{
      const response = await fetch(`http://localhost:5000/admin/users/delete/${id}`,
        {
          method : 'DELETE',
          headers : {
            'Authorization' : authorizationToken,
          }
        }
      )
      const data = await response.json();
      console.log("delete itme" , data);

      if( response.ok ){
        getallUserData();
      }

    }catch (e) {
      console.log(e)
    }

  }

  return (
    <div className='adminUser'>
      
      <h2>Admin Users</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Admin Status</th>
            <th> Update </th>
            <th> Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.isAdmin ? 'Yes' : 'No'}</td>
              <td> <Link to={`/admin/user/${user._id}/edit`}> Edit </Link>  </td>
              <td> <button className='deletebtn' onClick={() => deleteUser(user._id)}> Delete </button> </td>
              
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default AdminUser;