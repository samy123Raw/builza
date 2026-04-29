 
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../../services/authService.js'
import { useAuth } from '../../context/AuthContext.jsx'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login: authLogin } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await login({ email, password })
      authLogin(data)
      navigate('/dashboard')
    } catch (err) {
      setError('Email cyangwa password ntabwo ari byo')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-orange-600 mb-6">
          Builza - Injira
        </h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Imeyili</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:border-orange-500"
              placeholder="imeyili@builza.com"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Ijambobanga</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:border-orange-500"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700"
          >
            {loading ? 'Tegereza...' : 'Injira'}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Don't have account? <Link to="/register" className="text-orange-600 font-semibold">Register</Link>
        </p>
      </div>
    </div>
  )
}