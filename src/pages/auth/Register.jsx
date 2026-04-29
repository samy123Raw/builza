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
    setError('')
    try {
      const data = await register(formData)
      authLogin(data)
      navigate('/dashboard')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  const roles = [
    { value: 'CLIENT', label: '🏠 Individual / Client', desc: 'Building a home or managing personal projects' },
    { value: 'CONTRACTOR', label: '👷 Contractor', desc: 'Managing construction projects professionally' },
    { value: 'SUPPLIER', label: '🏪 Supplier', desc: 'Selling construction materials' },
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#ffffff', letterSpacing: '-1px' }}>
            Builza <span style={{ color: '#f97316' }}>🏗️</span>
          </h1>
          <p style={{ color: '#666', marginTop: '8px', fontSize: '15px' }}>
            Build smarter. Manage better.
          </p>
        </div>

        {/* Card */}
        <div style={{ backgroundColor: '#111111', border: '1px solid #222', borderRadius: '16px', padding: '40px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '8px' }}>Create your account</h2>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '32px' }}>Join thousands building smarter in Rwanda</p>

          {error && (
            <div style={{ backgroundColor: '#1a0a0a', border: '1px solid #ff4444', borderRadius: '8px', padding: '12px', marginBottom: '20px', color: '#ff6666', fontSize: '14px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', color: '#aaa', fontSize: '14px', marginBottom: '8px' }}>Full Name</label>
              <input name="name" type="text" onChange={handleChange} placeholder="John Doe" required
                style={{ width: '100%', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '10px', padding: '14px 16px', color: '#fff', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', color: '#aaa', fontSize: '14px', marginBottom: '8px' }}>Email Address</label>
              <input name="email" type="email" onChange={handleChange} placeholder="you@example.com" required
                style={{ width: '100%', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '10px', padding: '14px 16px', color: '#fff', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', color: '#aaa', fontSize: '14px', marginBottom: '8px' }}>Phone Number</label>
              <input name="phone" type="text" onChange={handleChange} placeholder="07XXXXXXXX"
                style={{ width: '100%', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '10px', padding: '14px 16px', color: '#fff', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', color: '#aaa', fontSize: '14px', marginBottom: '8px' }}>Password</label>
              <input name="password" type="password" onChange={handleChange} placeholder="••••••••" required
                style={{ width: '100%', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '10px', padding: '14px 16px', color: '#fff', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            {/* Role Selection */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', color: '#aaa', fontSize: '14px', marginBottom: '12px' }}>I am a...</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {roles.map((role) => (
                  <label key={role.value} style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: formData.role === role.value ? '#1a1200' : '#1a1a1a', border: `1px solid ${formData.role === role.value ? '#f97316' : '#333'}`, borderRadius: '10px', padding: '14px 16px', cursor: 'pointer' }}>
                    <input type="radio" name="role" value={role.value} checked={formData.role === role.value} onChange={handleChange} style={{ accentColor: '#f97316' }} />
                    <div>
                      <div style={{ color: '#fff', fontSize: '14px', fontWeight: '500' }}>{role.label}</div>
                      <div style={{ color: '#666', fontSize: '12px', marginTop: '2px' }}>{role.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading}
              style={{ width: '100%', backgroundColor: '#f97316', border: 'none', borderRadius: '10px', padding: '14px', color: '#fff', fontSize: '15px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Creating account...' : 'Create Account →'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '24px', color: '#666', fontSize: '14px' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#f97316', textDecoration: 'none', fontWeight: '600' }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}