import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { googleLogout } from '@react-oauth/google';

export default function Navbar(props) {

  const [logInText, setLoginText] = useState('Login');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      setLoginText("Logout")
    }
  },[])

  const cartCount = props.cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const handleClick = () => {
    if (logInText === 'Login') {
      navigate('../login');
    }
    else if (logInText === 'Logout') {
      alert("You have been logged out successfully.");
      if (localStorage.getItem('loginMode') === 'google') {
        googleLogout();
      }
      localStorage.clear();
      setLoginText("Login")
      navigate('../login');
    }
  }

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">
        SuperM
      </NavLink>
      <ul>
        <li className="nav-item">
          <NavLink to="/">
            Home
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/about">
            About us
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/products">
            Products
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/register">
            Register
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/login">
            <button style={{ marginRight: '20px' }}
              onClick={handleClick}
              className='header-nav-link-logout'>{logInText}
            </button>
          </NavLink>
        </li>

        <li>
          <NavLink to="/cart" >
            <button style={{ marginRight: '20px', backgroundColor: 'deepskyblue' }}
              className='header-nav-link-logout'> Cart ({cartCount})
            </button>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
