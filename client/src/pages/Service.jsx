import React, { useEffect } from 'react'
import { useAuth } from '../store/auth'
import "../styles/services.scss"

const Service = () => {
  
  const {servicedata} = useAuth();

  useEffect(()=>{
    console.log("data" , servicedata);
  },[]);
  
  return (

    <div className="service">
    {servicedata.map((service) => (
      <div className="card" key={service._id}>
        <h3>{service.service}</h3>
        <p>{service.description}</p>
        <p>Provider: {service.provider}</p>
        <p>Price: {service.price}</p>
      </div>
    ))}
  </div>
  )
}

export default Service