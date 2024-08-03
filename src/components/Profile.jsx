import { Link, Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/ContextGlobal';
import '../styles/Profile.css'

const Profile = () => {
    
  const { user, fetchReadBooks, fetchInterestedBooks } = useContext(GlobalContext);

  useEffect(() => {
    if (user) {
      fetchReadBooks();
      fetchInterestedBooks();
    }
  }, [user, fetchReadBooks, fetchInterestedBooks]);
  return (
    <div className="profile">
      <div className="profile__header">
        <img src='/perfil.jpeg' alt="Profile" className="profile__image" />
        <h2 className="profile__username">{user?.username}</h2>
        <ul className="profile__nav">
          <li className="profile__nav-item"><Link to="lecturas" className="profile__link">Lecturas</Link></li>
          <li className="profile__nav-item"><Link to="meinteresan" className="profile__link">Me Interesan</Link></li>
          <li className="profile__nav-item"><Link to="/" className="profile__link">Inicio</Link></li>
        </ul>
      </div>
      <div className="profile__content">
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
