import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'
import { login, register } from './services/authService.js'
import Dashboard from './pages/dashboard/Dashboard.jsx'

// ==============================
// PROTECTED ROUTE
// ==============================
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div style={{ color: '#fff', textAlign: 'center', padding: '50px' }}>Loading...</div>
  return user ? children : <Navigate to="/" />
}

// ==============================
// LOGIN MODAL
// ==============================
function LoginModal({ onClose, onSwitchToRegister }) {
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
      onClose()
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid email or password.')
    }
    setLoading(false)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}
      onClick={onClose}>
      <div style={{ backgroundColor: '#111', border: '1px solid #222', borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '420px', position: 'relative' }}
        onClick={e => e.stopPropagation()}>

        {/* Close button */}
        <button onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#666', fontSize: '20px', cursor: 'pointer' }}>✕</button>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
          <div style={{ backgroundColor: '#f97316', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🏗️</div>
          <span style={{ fontSize: '20px', fontWeight: '700', color: '#fff' }}>Builza<span style={{ color: '#f97316' }}>.</span></span>
        </div>

        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '6px' }}>Welcome back 👋</h2>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '28px' }}>Sign in to your Builza account</p>

        {error && (
          <div style={{ backgroundColor: '#1a0a0a', border: '1px solid #ff4444', borderRadius: '10px', padding: '12px', marginBottom: '20px', color: '#ff6666', fontSize: '14px' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#aaa', fontSize: '13px', marginBottom: '8px' }}>Email address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com" required
              style={{ width: '100%', backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '10px', padding: '13px 16px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: '#aaa', fontSize: '13px', marginBottom: '8px' }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" required
              style={{ width: '100%', backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '10px', padding: '13px 16px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <button type="submit" disabled={loading}
            style={{ width: '100%', backgroundColor: '#f97316', border: 'none', borderRadius: '10px', padding: '14px', color: '#fff', fontSize: '15px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', color: '#666', fontSize: '14px' }}>
          Don't have an account?{' '}
          <button onClick={onSwitchToRegister}
            style={{ background: 'none', border: 'none', color: '#f97316', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>
            Create one free →
          </button>
        </p>
      </div>
    </div>
  )
}

// ==============================
// REGISTER MODAL
// ==============================
function RegisterModal({ onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', role: 'CLIENT' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login: authLogin } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await register(formData)
      authLogin(data)
      onClose()
      navigate('/dashboard')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  const roles = [
    { value: 'CLIENT', emoji: '🏠', label: 'Client', desc: 'Building a home' },
    { value: 'CONTRACTOR', emoji: '👷', label: 'Contractor', desc: 'Managing projects' },
    { value: 'SUPPLIER', emoji: '🏪', label: 'Supplier', desc: 'Selling materials' },
  ]

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px', overflowY: 'auto' }}
      onClick={onClose}>
      <div style={{ backgroundColor: '#111', border: '1px solid #222', borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '460px', position: 'relative', margin: 'auto' }}
        onClick={e => e.stopPropagation()}>

        {/* Close button */}
        <button onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#666', fontSize: '20px', cursor: 'pointer' }}>✕</button>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
          <div style={{ backgroundColor: '#f97316', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🏗️</div>
          <span style={{ fontSize: '20px', fontWeight: '700', color: '#fff' }}>Builza<span style={{ color: '#f97316' }}>.</span></span>
        </div>

        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '6px' }}>Create your account ✨</h2>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '28px' }}>Free forever. No credit card required.</p>

        {error && (
          <div style={{ backgroundColor: '#1a0a0a', border: '1px solid #ff4444', borderRadius: '10px', padding: '12px', marginBottom: '20px', color: '#ff6666', fontSize: '14px' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name + Phone */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '13px', marginBottom: '8px' }}>Full Name</label>
              <input name="name" type="text" onChange={handleChange} placeholder="John Doe" required
                style={{ width: '100%', backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '10px', padding: '13px 16px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '13px', marginBottom: '8px' }}>Phone</label>
              <input name="phone" type="text" onChange={handleChange} placeholder="07XXXXXXXX"
                style={{ width: '100%', backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '10px', padding: '13px 16px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#aaa', fontSize: '13px', marginBottom: '8px' }}>Email Address</label>
            <input name="email" type="email" onChange={handleChange} placeholder="you@example.com" required
              style={{ width: '100%', backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '10px', padding: '13px 16px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#aaa', fontSize: '13px', marginBottom: '8px' }}>Password</label>
            <input name="password" type="password" onChange={handleChange} placeholder="••••••••" required
              style={{ width: '100%', backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '10px', padding: '13px 16px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
          </div>

          {/* Role Selection */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: '#aaa', fontSize: '13px', marginBottom: '12px' }}>I am a...</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {roles.map((role) => (
                <label key={role.value} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                  padding: '14px 10px', borderRadius: '10px', cursor: 'pointer',
                  border: `2px solid ${formData.role === role.value ? '#f97316' : '#2a2a2a'}`,
                  backgroundColor: formData.role === role.value ? '#1a0f00' : '#1a1a1a',
                  transition: 'all 0.2s'
                }}>
                  <input type="radio" name="role" value={role.value}
                    checked={formData.role === role.value} onChange={handleChange} style={{ display: 'none' }} />
                  <span style={{ fontSize: '24px', marginBottom: '6px' }}>{role.emoji}</span>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: formData.role === role.value ? '#f97316' : '#fff' }}>{role.label}</span>
                  <span style={{ fontSize: '11px', color: '#555', marginTop: '3px' }}>{role.desc}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading}
            style={{ width: '100%', backgroundColor: '#f97316', border: 'none', borderRadius: '10px', padding: '14px', color: '#fff', fontSize: '15px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Creating account...' : 'Create Account →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666', fontSize: '14px' }}>
          Already have an account?{' '}
          <button onClick={onSwitchToLogin}
            style={{ background: 'none', border: 'none', color: '#f97316', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>
            Sign in →
          </button>
        </p>
      </div>
    </div>
  )
}

// ==============================
// LANDING PAGE
// ==============================
function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [modal, setModal] = useState(null) // 'login' | 'register' | null

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  const materials = [
    { name: 'Premium Cement', price: '8,500 RWF', supplier: 'Cimerwa', image: 'https://images.unsplash.com/photo-1622302457899-1b82e57f6fc5?w=400', rating: 4.8 },
    { name: 'Quality Bricks', price: '350 RWF', supplier: 'Agrico Ltd', image: 'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=400', rating: 4.6 },
    { name: 'Iron Sheets', price: '22,000 RWF', supplier: 'Safintra', image: 'https://images.unsplash.com/photo-1581092335871-4f27c9f1c5b3?w=400', rating: 4.9 },
    { name: 'Exterior Paint', price: '15,000 RWF', supplier: 'Kansai Plascon', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400', rating: 4.7 },
  ]

  const projects = [
    { title: '3-Bedroom Villa', budget: '25M RWF', duration: '6 months', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600' },
    { title: 'Commercial Building', budget: '80M RWF', duration: '12 months', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600' },
    { title: 'Affordable Housing', budget: '12M RWF', duration: '4 months', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600' },
  ]

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#0a0a0a', color: '#ffffff', minHeight: '100vh' }}>

      {/* MODALS */}
      {modal === 'login' && (
        <LoginModal onClose={() => setModal(null)} onSwitchToRegister={() => setModal('register')} />
      )}
      {modal === 'register' && (
        <RegisterModal onClose={() => setModal(null)} onSwitchToLogin={() => setModal('login')} />
      )}

      {/* NAVBAR */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 50,
        backgroundColor: scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid #222' : 'none',
        padding: '20px 0', transition: 'all 0.3s'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => scrollToSection('home')}>
            <div style={{ backgroundColor: '#f97316', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🏗️</div>
            <span style={{ fontSize: '22px', fontWeight: '700', color: '#fff' }}>Builza<span style={{ color: '#f97316' }}>.</span></span>
          </div>

          <div style={{ display: 'flex', gap: '32px' }}>
            {['Home', 'Materials', 'Projects', 'How It Works'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase().replace(/ /g, '-'))}
                style={{ background: 'none', border: 'none', color: '#aaa', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = '#aaa'}>
                {item}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button onClick={() => setModal('login')}
              style={{ background: 'none', border: '1px solid #333', color: '#aaa', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}
              onMouseEnter={e => { e.target.style.borderColor = '#f97316'; e.target.style.color = '#f97316' }}
              onMouseLeave={e => { e.target.style.borderColor = '#333'; e.target.style.color = '#aaa' }}>
              Sign In
            </button>
            <button onClick={() => setModal('register')}
              style={{ backgroundColor: '#f97316', border: 'none', color: '#fff', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
              onMouseEnter={e => e.target.style.backgroundColor = '#ea6c0a'}
              onMouseLeave={e => e.target.style.backgroundColor = '#f97316'}>
              Get Started →
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '120px 24px 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#111', border: '1px solid #222', borderRadius: '100px', padding: '8px 16px', marginBottom: '32px' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '13px', color: '#aaa' }}>Now available in Rwanda</span>
            </div>

            <h1 style={{ fontSize: '64px', fontWeight: '700', lineHeight: '1.1', letterSpacing: '-2px', marginBottom: '24px' }}>
              Build Your Dream<br />
              <span style={{ color: '#f97316' }}>With Confidence</span>
            </h1>

            <p style={{ fontSize: '18px', color: '#666', lineHeight: '1.7', marginBottom: '40px', maxWidth: '480px' }}>
              Plan, budget, and source quality construction materials in Rwanda.
              Connect with trusted suppliers and track your project from start to finish.
            </p>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '48px' }}>
              <button onClick={() => setModal('register')}
                style={{ backgroundColor: '#f97316', border: 'none', color: '#fff', padding: '16px 32px', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
                Start Your Project →
              </button>
              <button onClick={() => scrollToSection('materials')}
                style={{ backgroundColor: 'transparent', border: '1px solid #333', color: '#fff', padding: '16px 32px', borderRadius: '10px', fontSize: '15px', fontWeight: '500', cursor: 'pointer' }}>
                Browse Materials
              </button>
            </div>

            <div style={{ display: 'flex', gap: '40px' }}>
              {[{ number: '2,500+', label: 'Projects Managed' }, { number: '500+', label: 'Suppliers' }, { number: '18%', label: 'Avg. Savings' }].map((stat) => (
                <div key={stat.label}>
                  <div style={{ fontSize: '28px', fontWeight: '700' }}>{stat.number}</div>
                  <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <img src="https://images.unsplash.com/photo-1545324411-5a1d2f7fa548?w=800" alt="Construction"
              style={{ width: '100%', borderRadius: '16px', border: '1px solid #222' }} />
            <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', backgroundColor: '#111', border: '1px solid #222', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '28px' }}>💰</span>
              <div>
                <div style={{ fontSize: '11px', color: '#666' }}>Average Savings</div>
                <div style={{ fontSize: '20px', fontWeight: '700' }}>18% Less</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MATERIALS */}
      <section id="materials" style={{ padding: '100px 24px', borderTop: '1px solid #111' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '60px' }}>
            <p style={{ color: '#f97316', fontSize: '13px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Marketplace</p>
            <h2 style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '-1px', marginBottom: '16px' }}>Popular Materials</h2>
            <p style={{ color: '#666', fontSize: '16px' }}>Quality assured from verified suppliers across Rwanda</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {materials.map((material, idx) => (
              <div key={idx} style={{ backgroundColor: '#111', border: '1px solid #1a1a1a', borderRadius: '14px', overflow: 'hidden' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#f97316'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#1a1a1a'}>
                <img src={material.image} alt={material.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                <div style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', marginBottom: '8px' }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ color: i < Math.floor(material.rating) ? '#f59e0b' : '#333', fontSize: '14px' }}>★</span>
                    ))}
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '4px' }}>{material.name}</div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>{material.supplier}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#f97316', fontWeight: '700' }}>{material.price}</span>
                    <button onClick={() => setModal('register')}
                      style={{ backgroundColor: '#f97316', border: 'none', color: '#fff', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                      Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: '100px 24px', borderTop: '1px solid #111' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '60px' }}>
            <p style={{ color: '#f97316', fontSize: '13px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Projects</p>
            <h2 style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '-1px', marginBottom: '16px' }}>Ongoing Projects</h2>
            <p style={{ color: '#666', fontSize: '16px' }}>Real projects managed with Builza across Rwanda</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {projects.map((project, idx) => (
              <div key={idx} style={{ backgroundColor: '#111', border: '1px solid #1a1a1a', borderRadius: '14px', overflow: 'hidden' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#f97316'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#1a1a1a'}>
                <img src={project.image} alt={project.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>{project.title}</h3>
                  <div style={{ display: 'flex', gap: '20px', color: '#666', fontSize: '13px', marginBottom: '16px' }}>
                    <span>💰 {project.budget}</span>
                    <span>📅 {project.duration}</span>
                  </div>
                  <div style={{ backgroundColor: '#1a1a1a', borderRadius: '100px', height: '6px' }}>
                    <div style={{ backgroundColor: '#f97316', height: '100%', width: '65%', borderRadius: '100px' }}></div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>Progress: 65%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: '100px 24px', borderTop: '1px solid #111' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p style={{ color: '#f97316', fontSize: '13px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Process</p>
            <h2 style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '-1px', marginBottom: '16px' }}>Simple 3-Step Process</h2>
            <p style={{ color: '#666', fontSize: '16px' }}>From planning to completion in Rwanda</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { emoji: '📋', title: 'Plan Your Project', desc: 'Set your budget, timeline, and list all materials needed for your construction.' },
              { emoji: '🛒', title: 'Source Materials', desc: 'Browse and compare prices from verified suppliers across Rwanda.' },
              { emoji: '🚚', title: 'Track & Build', desc: 'Monitor expenses, deliveries, and project progress in real time.' }
            ].map((step, idx) => (
              <div key={idx} style={{ backgroundColor: '#111', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '32px' }}>
                <div style={{ fontSize: '40px', marginBottom: '20px' }}>{step.emoji}</div>
                <div style={{ color: '#f97316', fontSize: '12px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Step {idx + 1}</div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>{step.title}</h3>
                <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.7' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 24px', borderTop: '1px solid #111' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '52px', fontWeight: '700', letterSpacing: '-1px', marginBottom: '20px', lineHeight: '1.1' }}>
            Ready to build <span style={{ color: '#f97316' }}>smarter?</span>
          </h2>
          <p style={{ color: '#666', fontSize: '17px', marginBottom: '40px', lineHeight: '1.7' }}>
            Join thousands of Rwandan builders, contractors, and suppliers already using Builza.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button onClick={() => setModal('register')}
              style={{ backgroundColor: '#f97316', border: 'none', color: '#fff', padding: '16px 40px', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
              Get Started Free →
            </button>
            <button onClick={() => setModal('login')}
              style={{ backgroundColor: 'transparent', border: '1px solid #333', color: '#fff', padding: '16px 32px', borderRadius: '10px', fontSize: '15px', cursor: 'pointer' }}>
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" style={{ borderTop: '1px solid #111', padding: '60px 24px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px', marginBottom: '60px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ backgroundColor: '#f97316', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🏗️</div>
                <span style={{ fontSize: '20px', fontWeight: '700' }}>Builza</span>
              </div>
              <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.7', maxWidth: '260px' }}>
                Simplifying construction management in Rwanda. Build smarter, spend less.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: '600', marginBottom: '20px' }}>Navigation</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Home', 'Materials', 'Projects', 'How It Works'].map((item) => (
                  <button key={item} onClick={() => scrollToSection(item.toLowerCase().replace(/ /g, '-'))}
                    style={{ background: 'none', border: 'none', color: '#555', fontSize: '14px', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                    onMouseEnter={e => e.target.style.color = '#f97316'}
                    onMouseLeave={e => e.target.style.color = '#555'}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: '600', marginBottom: '20px' }}>Business</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Become a Supplier', 'Partner With Us', 'Advertise'].map((item) => (
                  <button key={item} style={{ background: 'none', border: 'none', color: '#555', fontSize: '14px', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                    onMouseEnter={e => e.target.style.color = '#f97316'}
                    onMouseLeave={e => e.target.style.color = '#555'}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: '600', marginBottom: '20px' }}>Contact</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#555', fontSize: '14px' }}>
                <span>📧 hello@builza.rw</span>
                <span>📞 +250 788 123 456</span>
                <span>📍 Kigali, Rwanda</span>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #111', paddingTop: '24px', display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ color: '#444', fontSize: '13px' }}>© 2026 Builza. All rights reserved.</p>
            <p style={{ color: '#444', fontSize: '13px' }}>Built for Rwanda's construction future 🇷🇼</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ==============================
// MAIN APP
// ==============================
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App