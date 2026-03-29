import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const navItems = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/contacts', label: 'Kontakte (Infinite Scroll)', icon: '📋' },
  { to: '/styled', label: 'Styled Grid', icon: '🎨' },
  { to: '/virtual', label: 'Virtual Scroll', icon: '⚡' },
  { to: '/forms', label: 'Formulare', icon: '📝' },
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/libraries', label: 'Libraries', icon: '📦' },
]

export const Sidebar = () => {
  return (
    <aside className='sidebar'>
      <div className='sidebar-header'>
        <h1>React Demo</h1>
      </div>
      <nav className='sidebar-nav'>
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <span className='nav-icon'>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className='sidebar-footer'>
        <div className='tech-badge'>React 19 + Vite + TypeScript</div>
      </div>
    </aside>
  )
}
