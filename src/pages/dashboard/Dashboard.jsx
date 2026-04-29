 
import { useAuth } from '../../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-orange-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Builza 🏗️</h1>
        <div className="flex items-center gap-4">
          <span>Murakaza neza, {user?.name}!</span>
          <button onClick={handleLogout}
            className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold">
            Sohoka
          </button>
        </div>
      </nav>
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Imishinga</h3>
            <p className="text-3xl font-bold text-orange-600 mt-2">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Amatumiza</h3>
            <p className="text-3xl font-bold text-orange-600 mt-2">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Ubuzimagatozi</h3>
            <p className="text-lg font-bold text-orange-600 mt-2">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}