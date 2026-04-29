// This file creates a global state for authentication
// Any component in the app can know if user is logged in or not

import { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentUser, logout as logoutService } from '../services/authService.js'

// Create the context — like a global variable for the whole app
const AuthContext = createContext()

// AuthProvider wraps the whole app so every page can access auth state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in when app starts
    const loggedInUser = getCurrentUser()
    if (loggedInUser) {
      setUser(loggedInUser)
    }
    setLoading(false)
  }, [])

  // Called after successful login
  const login = (userData) => {
    setUser(userData.user)
  }

  // Called when user logs out
  const logout = () => {
    logoutService()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context easily in any component
export const useAuth = () => useContext(AuthContext)