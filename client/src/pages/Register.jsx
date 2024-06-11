import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../store/auth";
import "../styles/register.scss"
import { toast } from "react-toastify";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const {storetokenInLS} = useAuth();
  const navigate = useNavigate();

  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // handle form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
  
    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      
      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        // Handle non-2xx HTTP responses
        toast.error( data.extraDetails ? data.extraDetails : data.message );
        return;
      }
  
      toast.success( "Registration successful" );
      storetokenInLS(data.token);
      navigate("/");

    } catch (e) {
      console.error("Error during fetch:", e);
    }
  };
  

  
  return (
    <>
      <section className="register">
              
                <form onSubmit={handleSubmit}>
                <h1 style={{textAlign: "center"}}>REGISTRATION FORM</h1>
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={handleInput}
                      placeholder="username"
                    />
                  </div>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="phone"
                      value={user.phone}
                      onChange={handleInput}
                      placeholder="1234567890"
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
      </section>
    </>
  );
};

export default Register;