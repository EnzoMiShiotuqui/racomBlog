// CSS
import styles from './Navbar.module.css'
// Navlink
import { NavLink } from 'react-router-dom'
// hooks
import { useAuthentication } from '../../hooks/useAuthentication';
import { useAuthValue } from '../../context/AuthContext';
const Navbar = () => {

    const { user } = useAuthValue();
    const { logout } = useAuthentication()
  return (
        <nav className={styles.navbar}>
            <NavLink to="/" className={styles.brand}>Raccoon<span>Blog</span></NavLink>
            <ul className={styles.links_list}>
                <li>
                    <NavLink to="/" className={({isActive}) => (isActive ? styles.active : '')}>Home</NavLink>
                </li>
                {!user && (
                    <>
                        <li>
                            <NavLink to="/Login" className={({isActive}) => (isActive ? styles.active : '')}>Entrar</NavLink>
                        </li>
                        <li>
                            <NavLink to="/Register" className={({isActive}) => (isActive ? styles.active : '')}>Cadatrar</NavLink>
                        </li>
                    </>
                )}
                {user && (
                    <>
                        <li>
                            <NavLink to="/Posts/Create" className={({isActive}) => (isActive ? styles.active : '')}>Novo Post</NavLink>
                        </li>
                        <li>
                            <NavLink to="/Dashboard" className={({isActive}) => (isActive ? styles.active : '')}>Dashboard</NavLink>
                        </li>
                    </>
                )}
                <li>
                    <NavLink to="/About" className={({isActive}) => (isActive ? styles.active : '')}>Sobre</NavLink>
                </li>
                {user && (
                    <>
                        <li>
                            <button onClick={logout}>Sair</button>
                        </li>
                    </>
                )}
                
            </ul>
        </nav>
  )
}

export default Navbar