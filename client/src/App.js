import {BrowserRouter , Routes , Route} from "react-router-dom";
import Service from "./pages/Service";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Error from "./components/Error";
import Logout from "./pages/Logout";
import AdminPortal from "./components/layouts/AdminPortal";
import AdminUser from "./pages/AdminUser";
import AdminContacts from "./pages/AdminContacts";
import AdminUpdate from "./pages/AdminUpdate";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Error />} />
            <Route path="/admin" element={<AdminPortal />}>
              <Route path="user" element={<AdminUser />} />
              <Route path="/admin/user/:id/edit" element={<AdminUpdate />} />
              <Route path="contacts" element={<AdminContacts />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
