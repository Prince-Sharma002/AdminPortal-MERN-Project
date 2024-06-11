import React from 'react'
import { Link , Outlet , Navigate } from 'react-router-dom'
import "../../styles/adminportal.scss";
import { useAuth } from '../../store/auth';

const AdminPortal = () => {

  const {user , isLoading} = useAuth();
  
  if( isLoading ){
    console.log("hiiii")
    return <h1> Loading.. </h1> ;
  }
  
  
  if( user.isAdmin  ){
    console.log("hello")
    return <Navigate to="/" />
  }


  return (
    <div className='adminportal'>
        <h1> Admin Portal </h1>
        <div>
            <ul className='adminUl'>
                <li> <Link to="/admin/user">  User </Link> </li> <br />
                <li> <Link to="/admin/contacts">  contacts </Link> </li>
            </ul>
        </div>
        <Outlet />
    </div>
  )
}

export default AdminPortal