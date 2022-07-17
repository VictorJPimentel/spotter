// import logo from './logo.svg';
import './App.css';
// import Login from './components/login';
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import fire, { auth } from './firebase-config';
import {signOut} from 'firebase/auth'
import { Auth } from 'firebase/auth';
import Home from './pages/Home';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import {BrowserRouter as Router, Rautes, Route, Link, Routes} from "react-router-dom"

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <><Router>
      <nav>
      <Link to="/"> Home </Link>
{!isAuth ? (
  <Link to="/login"> Login </Link>
) : (
  <>
    <Link to="/create"> Create Post </Link>
    <button onClick={signUserOut}> Log Out</button>
  </>
)}
      </nav>
        <Routes>
          <Route path="/" element={<Home isAuth={isAuth}/>}/>
          <Route path="/create" element={<CreatePost isAuth={isAuth}/>}/>
          <Route path="/login" element={<Login setIsAuth={setIsAuth}/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
