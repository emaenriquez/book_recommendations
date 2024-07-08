

function LoginForm() {
  return (
    <form>
      <div>
        <label>Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm