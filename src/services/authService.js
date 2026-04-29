 
// This file handles all authentication API calls

import api from './api.js'

// Register new user
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData)
  return response.data
}

// Login user
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials)
  localStorage.setItem('token', response.data.token)
  localStorage.setItem('user', JSON.stringify(response.data.user))
  return response.data
}

// Logout user
export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

// Get current logged in user
export const getCurrentUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}