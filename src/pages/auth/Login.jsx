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
    setError('')
    try {
      const data = await login({ email, password })
      authLogin(data)
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid email or password. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#ffffff', letterSpacing: '-1px' }}>
            Builza <span style={{ color: '#f97316' }}>🏗️</span>
          </h1>
          <p style={{ color: '#666', marginTop: '8px', fontSize: '15px' }}>
            Build smarter. Manage better.
          </p>
        </div>

        {/* Card */}
        <div style={{ backgroundColor: '#111111', border: '1px solid #222', borderRadius: '16px', padding: '40px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '8px' }}>Welcome back</h2>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '32px' }}>Sign in to your Builza account</p>

          {error && (
            <div style={{ backgroundColor: '#1a0a0a', border: '1px solid #ff4444', borderRadius: '8px', padding: '12px', marginBottom: '20px', color: '#ff6666', fontSize: '14px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#aaa', fontSize: '14px', marginBottom: '8px' }}>Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{ width: '100%', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '10px', padding: '14px 16px', color: '#fff', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', color: '#aaa', fontSize: '14px', marginBottom: '8px' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ width: '100%', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '10px', padding: '14px 16px', color: '#fff', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', backgroundColor: '#f97316', border: 'none', borderRadius: '10px', padding: '14px', color: '#fff', fontSize: '15px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '24px', color: '#666', fontSize: '14px' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#f97316', textDecoration: 'none', fontWeight: '600' }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}