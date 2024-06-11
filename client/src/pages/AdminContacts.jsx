import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth'

const AdminContacts = () => {

  const {authorizationToken} = useAuth();
  const [contacts , setContact ] = useState([]);
  
  
  const getAllContacts = async ()=>{
    try{
      const response = await fetch('http://localhost:5000/admin/contacts',
        {
          method : 'GET',
          headers : {
            'Authorization' : authorizationToken,
          }
        }
      )

      const data = await response.json();
      if( response.ok ){
        setContact(data);
        console.log("contacts" , contacts);
        return data;
      }
      
      
    }catch(err){
      console.log(err)
    }
  }
  
  useEffect(()=>{
    getAllContacts();
  }, [])



  const deleteContact = async(id)=>{
    try{
      const response = await fetch(`http://localhost:5000/admin/contacts/delete/${id}`,
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
        getAllContacts();
      }

    }catch (e) {
      console.log(e)
    }

  }

  
  
  return (
    <div>

<h1>Contacts Table</h1>
      <table className='user-table'>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((item) => (
            <tr key={item._id}>
              
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.message}</td>
              <td> <button onClick={() => deleteContact(item._id)}> Delete </button> </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default AdminContacts