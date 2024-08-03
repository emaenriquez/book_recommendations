import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/ContextGlobal";
import { loginUser } from "../services/api";
import '../styles/Form.css'

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(GlobalContext);

  const handleNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar cualquier error previo

    try {
      const data = await loginUser(username, password);
      login(data.token, { username });
      navigate("/profile");
    } catch (err) {
      setError('Usuario o contraseña incorrectos.'); // Mensaje genérico de error
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form__title">Iniciar sesión</h2>
      {error && <p className="form__error">{error}</p>}
      <div className="form__group">
        <label className="form__label">Username</label>
        <input className="form__input" type="text" value={username} onChange={handleNameChange} placeholder="usuario o email" />
      </div>
      <div className="form__group">
        <label className="form__label">Password</label>
        <input className="form__input" type="password" value={password} onChange={handlePasswordChange} placeholder="contraseña" />
      </div>
      <button className="form__button" type="submit">Ingresar</button>
    </form>
  );
}

export default LoginPage;
