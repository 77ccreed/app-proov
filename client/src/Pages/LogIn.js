import React, { useState, useEffect } from "react";
import { useLocaleStorage } from "../hooks/useLocaleStorage";
import { useNavigate } from "react-router-dom";
import './LogIn.scss'

const LogIn = ({ authenticate }) => {

  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [usersInDatabase, setUsersInDatabase] = useState([]);
  const navigate = useNavigate()
  const isLoggedIn = useLocaleStorage("isLoggedIn", false);


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


  const onClick = () => {
    if (user.trim().email === '' || user.trim().password === '') {
      alert('Please enter your email and password.')
    }
    else {
      if (usersInDatabase.find(userInDb => userInDb.email === user.email && userInDb.password === user.password)) {
        setUser(true)
        authenticate()
        navigate('/items')
      }
      else {
        alert('Email or password is incorrect.')
      }
    }
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