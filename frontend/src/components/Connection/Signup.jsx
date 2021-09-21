import '../../styles/login.css'
import ConnectionLogo from '../../assets/logo/icon-above-font-small.png'

function Signup() {
  return (
    <div className="connection">
      <img
        src={ConnectionLogo}
        className="login-logo"
        alt="Logo de Groupomania"
      />
      <form action="sign-up" method="post" className="login-form">
        <div class="login-input">
          <label for="name">Entrez votre prénom :</label>
          <input
            type="text"
            name="name"
            id="name"
            class="input-champ"
            placeholder="ex : martin"
            required
          />
        </div>
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
            value="Inscription"
            className="form-button shadow"
          />
        </div>
      </form>
    </div>
  )
}

export default Signup
