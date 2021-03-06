import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import './LogIn.scss'

import { AuthContext } from "../context/auth";

const LogIn = ({ authenticate }) => {

  const { setUserAccount } = useContext(AuthContext);


  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [, setUsersInDatabase] = useState([]);
  const navigate = useNavigate()


  useEffect(() => {
    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            users {
              id
              email
              password

            }
          }
        `
      })
    })
      .then(r => r.json())
      .then(data => {
        if (data.errors) {
          console.log('Error: ', data.errors);
        } else {
          setUsersInDatabase(data.data.users);
        }
      })
  }, [])

  const onClick = (e) => {
    e.preventDefault();
    setUser(true)
    setUserAccount({
      email: user.email,
      password: user.password
    })
    authenticate()
    navigate('/items')
    /* if (user.email === '' || user.password === '') {
       alert('Please enter your email and password.')
     }
     else {
       if (usersInDatabase.find(userInDb => userInDb.email === user.email && userInDb.password === user.password)) {
         setUser(true)
         setUserAccount({
           email: user.email,
           password: user.password
         })
         authenticate()
         navigate('/items')
 
       }
       else {
         alert('Email or password is incorrect.')
       }
     }*/
  }

  const handleChangeEmail = (e) => {
    setUser({
      ...user,
      email: e.target.value
    })
  }

  const handleChangePassword = (e) => {
    setUser({
      ...user,
      password: e.target.value
    })
  }

  return (
    <form className="logIn__form__container">
      <input onChange={handleChangeEmail} type="text" placeholder="Email" autoComplete="new-password" required />
      <input onChange={handleChangePassword} type="password" placeholder="Password" autoComplete="new-password" required />
      <button onClick={onClick}>Log In</button>
    </form>
  )
}


export default LogIn;