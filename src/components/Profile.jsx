import { Link, Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/ContextGlobal';

const Profile = () => {
    const { user, fetchReadBooks } = useContext(GlobalContext);

    useEffect(() => {
        if (user) {
            fetchReadBooks();
        }
    }, [user]);

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '20px' }}>
                <img src='/perfil.jpeg' style={{ width: '200px', height: '200px', borderRadius: '50%', objectFit: 'cover' }} alt="Profile" />
                <h2>{user.username}</h2>
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
