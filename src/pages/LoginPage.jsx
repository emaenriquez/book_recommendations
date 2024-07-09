
import { useState } from "react"
import { useNavigate } from "react-router"

function LoginPage() {
  const [username, setUsername] = useState('hola123')
  const [password, setPassword] = useState('hola123')
  const navigate = useNavigate()

  const hadleNameChange = (event) => {
    setUsername(event.target.value)
  }

  const hadlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const userNamePre = 'hola123'
    const userPasswordPre = 'hola123'
    if(username === userNamePre && password === userPasswordPre ){
      navigate('/profile')
    } else {
      alert('usuario incorrecto')
    }
    // para enviar los datos al backend y verificar
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>iniciar sesion</h2>
      <div>
        <label>Username</label>
        <input type="text" value={username} onChange={hadleNameChange} placeholder="usuario o email" />
      </div>
      <div>
        <label>Password</label>
        <input type="text" value={password} onChange={hadlePasswordChange} placeholder="contraseña" />
      </div>
      <button type="submit">Ingresar</button>
    </form>
  )
}

export default LoginPage