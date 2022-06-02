import { useState, createContext } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [userAccount, setUserAccount] = useState({
    email: '',
    password: ''
  })


  return (
    <AuthContext.Provider value={{ userAccount, setUserAccount }}>
      {children}
    </AuthContext.Provider>
  )
}

