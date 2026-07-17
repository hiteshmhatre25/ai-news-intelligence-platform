import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

function NavBar() {
  const { email, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()

  const linkClass = ({ isActive }) =>
    `text-sm px-3 py-1.5 rounded ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
    }`

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          AI News Intelligence Platform
        </h1>
        <nav className="flex gap-2">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/bookmarks" className={linkClass}>Bookmarks</NavLink>
          <NavLink to="/history" className={linkClass}>History</NavLink>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="text-sm px-2 py-1 rounded border dark:border-gray-700 text-gray-600 dark:text-gray-300"
          title="Toggle dark mode"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
        <span className="text-sm text-gray-500 dark:text-gray-400">{email}</span>
        <button onClick={logout} className="text-sm text-red-600 hover:underline">
          Log out
        </button>
      </div>
    </div>
  )
}

export default NavBar
