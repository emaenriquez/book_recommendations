
import { useContext } from "react";
import { GlobalContext } from "../context/ContextGlobal";
import { Link } from 'react-router-dom'

const Header = () => {
    const { user, logout } = useContext(GlobalContext)
    return <header>
        <h1>Books Recommendations</h1>
        <nav>
            {
                user ? (
                    <ul>
                        <li>
                            <img src="/perfil.jpeg" alt="Profile" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                        </li>
                        <li>
                            <button onClick={logout}>Cerrar sesión</button>
                        </li>
                        <li>
                            <Link to={'/profile'}>Mi perfil</Link>
                        </li>
                    </ul>
                ) : (
                    <ul>
                        <li>
                            <Link to="/login">Iniciar sesion</Link>
                        </li>
                        <li>
                            <Link to="/registrar">Registrarme</Link>
                        </li>
                    </ul>
                )
            }

        </nav>
    </header>
}

export default Header