
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Home from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import Lecturas from './components/Lecturas'
import Meinteresan from './components/Meinteresan'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/registrer' element={<RegisterPage />}></Route>
          <Route path='/profile' element={<ProfilePage />}></Route>
          <Route path='/lecturas' element={<Lecturas />}></Route>
          <Route path='/meinteresan' element={<Meinteresan />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
