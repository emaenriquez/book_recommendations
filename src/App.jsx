import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import Lecturas from './components/Lecturas';
import MeInteresan from './components/Meinteresan';
import ProtectedRoute from './components/ProtectedRoute';
import { GlobalProvider } from './context/ContextGlobal';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/registrar' element={<RegisterPage />} />
          <Route path='/profile' element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }>
            <Route path="lecturas" element={<Lecturas />} />
            <Route path="meinteresan" element={<MeInteresan />} />
          </Route>
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
