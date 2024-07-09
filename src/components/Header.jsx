
import { Link } from 'react-router-dom'

const Header = () => {
    return <header>
        <h1>Books Recommendations</h1>
        <nav>
            <ul>
                <li>
                    <Link to="/login">Iniciar sesion</Link>
                </li>
                <li>
                    <Link to="/registrer">Registrarme</Link>
                </li>
            </ul>
        </nav>
    </header>
}

export default Header