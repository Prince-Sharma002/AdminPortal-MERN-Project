import { useState } from "react";
import { useAuth } from "../store/auth";
import "../styles/contact.scss";

const Contact = () => {

  const {user} = useAuth();
  const [useData , setUserData] = useState(true);

  const defaultContact = {
    username: "",
    email: "",
    message: "",
  }

  const [contact, setContact] = useState(defaultContact);

  if( useData && user ){
    console.log(user);
    setContact({
      username: user.username,
      email: user.email,
      message : ""
    })
    setUserData(false);
  }


  // lets tackle our handleInput
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  // handle fomr getFormSubmissionInfo
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(contact);

    try{
      const response = await fetch('http://localhost:5000/auth/form' , 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact),
        }
      )

      if( response.ok ){
        setContact(defaultContact);
        const data = await response.json();
        console.log(data);
        alert("message sent successfully");
      }

    }catch(err){

    }

  };


  return (
    <>
      <section className="contact">
            <form onSubmit={handleSubmit}>
              <h1 style={{textAlign : "center"}}>CONTACT FORM</h1>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={contact.username}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="message">message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                ></textarea>
              </div>

              <div>
                <button type="submit">submit</button>
              </div>
            </form>

        <section className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2613173278896!2d73.91411937501422!3d18.562253982539413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPhoenix%20Marketcity%20Pune!5e0!3m2!1sen!2sin!4v1697604225432!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </section>
    </>
  );
};

export default Contact;