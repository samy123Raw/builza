 
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../../services/authService.js'
import { useAuth } from '../../context/AuthContext.jsx'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', role: 'CLIENT'
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login: authLogin } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await register(formData)
      authLogin(data)
      navigate('/dashboard')
    } catch (err) {
      setError('Hari ikibazo. Gerageza nanone.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-orange-600 mb-6">
          Builza - Register
        </h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Names</label>
            <input name="name" type="text" onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:border-orange-500"
              placeholder="Full names" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input name="email" type="email" onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:border-orange-500"
              placeholder="username@builza.com" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Phone number</label>
            <input name="phone" type="text" onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:border-orange-500"
              placeholder="07XXXXXXXX" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input name="password" type="password" onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:border-orange-500"
              placeholder="••••••••" required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Profile</label>
            <select name="role" onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:border-orange-500">
              <option value="CLIENT">Client</option>
              <option value="CONTRACTOR">Contructor</option>
              <option value="SUPPLIER">Supplier</option>
            </select>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700">
            {loading ? 'Loading...' : 'Register'}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Do you have an account? <Link to="/login" className="text-orange-600 font-semibold">Login</Link>
        </p>
      </div>
    </div>
  )
}