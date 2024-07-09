
import { useState } from "react"

function RegisterPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const hadleNameChange = (event) => {
    setUsername(event.target.value)
  }

  const hadlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // para enviar los datos al backend y verificar
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrarse</h2>
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

export default RegisterPage