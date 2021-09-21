import '../../styles/login.css'
import ConnectionLogo from '../../assets/logo/icon-above-font-small.png'

function Login() {
  return (
    <section className="connection">
      <img
        src={ConnectionLogo}
        className="login-logo"
        alt="Logo de Groupomania"
      />
      <form action="login" method="get" className="login-form">
        <div class="login-input">
          <label for="email">Entrez votre email :</label>
          <input
            type="email"
            name="email"
            id="email"
            class="input-champ"
            placeholder="ex : martin-petit@gmail.com"
            required
          />
        </div>
        <div class="login-input">
          <label for="password">Entrez votre mot de passe :</label>
          <input
            type="text"
            name="password"
            id="password"
            class="input-champ"
            placeholder="ex : mot-de-passe"
            required
          />
        </div>
        <div class="login-button">
          <input
            type="submit"
            value="Connexion"
            className="form-button shadow"
          />
        </div>
        <div className="login-text">
          <p>Vous n'avez pas de compte ?</p>
          <p>
            Veuillez vous{' '}
            <a href="./Signup.jsx" className="signup-link">
              inscrire
            </a>
          </p>
        </div>
      </form>
    </section>
  )
}

export default Login
