import { createContext } from 'react'

import userAuth from '../../hooks/useAuth'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const { authenticated, loading, login, logout, user, setUser } = userAuth()

  return (
    <AuthContext.Provider
      value={{ authenticated, user, setUser, handleLogin: login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}
