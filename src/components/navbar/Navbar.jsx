import React from 'react'
import { useAuth } from '../../hooks/useAuth'

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
  return (
    <nav>
      <ul className='nav-links'>
        <li><a href="/Recettes">Recettes</a></li>
        { isAuthenticated ? (
            <li><a href={`/${user.slug}`}>Profil</a></li>
        ) : false}
      </ul>

      {isAuthenticated ? (
        <button onClick={logout}>Déconnexion</button>
      ):false}
    </nav>
  )
}

export default Navbar
