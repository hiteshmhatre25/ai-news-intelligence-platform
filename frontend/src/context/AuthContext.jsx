import { createContext, useContext, useState } from 'react'
import api from '../api/axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [email, setEmail] = useState(localStorage.getItem('email'))

  const login = async (loginEmail, password) => {
    const { data } = await api.post('/auth/login', { email: loginEmail, password })
    localStorage.setItem('token', data.token)
    localStorage.setItem('email', data.email)
    setEmail(data.email)
  }

  const register = async (registerEmail, password) => {
    const { data } = await api.post('/auth/register', { email: registerEmail, password })
    localStorage.setItem('token', data.token)
    localStorage.setItem('email', data.email)
    setEmail(data.email)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    setEmail(null)
  }

  return (
    <AuthContext.Provider value={{ email, login, register, logout, isAuthenticated: !!email }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
