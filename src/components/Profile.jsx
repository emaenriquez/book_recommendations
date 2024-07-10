
import { Link, Outlet } from 'react-router-dom';

const Profile = () => {
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '20px' }}>
                <img src='/perfil.jpeg' style={{ width: '200px', height: '200px', borderRadius: '50%', objectFit: 'cover' }} alt="Profile" />
                <ul>
                    <li><Link to="lecturas">Lecturas</Link></li>
                    <li><Link to="meinteresan">Me Interesan</Link></li>
                    <li><Link to="/">Inicio</Link></li>
                </ul>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
}

export default Profile;
