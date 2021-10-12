// Import
import React, { useState } from 'react'
import axios from 'axios'
import UserIcon from '../../assets/logo/user.png'
import ConnectionLogo from '../../assets/logo/icon-above-font-small.png'
import '../../styles/login.css'

function Signup() {
  // Initialisation du state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Initialisation de bouton
  const submitClick = (e) => {
    e.preventDefault()
    // Récupération des saisie + photo par défaut
    const formValues = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      photo: UserIcon,
    }
    // Requète API
    axios({
      method: 'POST',
      url: 'http://localhost:3000/api/users/signup',
      data: formValues,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res)
        window.alert(
          'Votre compte a bien été créé, a présent veuillez vous connecter'
        )
        window.location.href = '/login'
      })
      .catch((err) => {
        console.log(err)
        alert(
          "Une érreur est survenue, veillez à bien remplir le formulaire d'inscription"
        )
      })
  }
  // Injection du composant
  return (
    <section className="container mb-5">
      <div className="text-center">
        <img
          src={ConnectionLogo}
          className="login-logo mb-3 col-9 col-md-8 col-lg-5"
          alt="Logo de Groupomania"
        />
      </div>
      <div className="row">
        <div className="mb-3 col-11 col-md-9 col-lg-6 text-center mx-auto">
          <label htmlFor="firstName" className="signup-form mb-1">
            Entrez votre prénom :
          </label>
          <input
            type="text"
            className="form-control bg-light text-center"
            id="firstName"
            placeholder="ex : Martin"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
      </div>
      <div className="row ">
        <div className="mb-3 col-11 col-md-9 col-lg-6 text-center mx-auto">
          <label htmlFor="lastName" className="signup-form mb-1">
            Entrez votre nom :
          </label>
          <input
            type="text"
            className="form-control bg-light text-center"
            id="lastName"
            placeholder="ex : Petit"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="mb-3 col-11 col-md-9 col-lg-6 text-center mx-auto">
          <label htmlFor="email" className="login-form mb-1">
            Entrez votre email :
          </label>
          <input
            type="text"
            className="form-control bg-light text-center"
            id="email"
            placeholder="ex : martin-petit@gmail.com.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="mb-3 col-11 col-md-9 col-lg-6 text-center mx-auto">
          <label htmlFor="password" className="login-form mb-1">
            Saisissez un mot de passe :
          </label>
          <input
            type="password"
            className="form-control bg-light text-center"
            id="password"
            placeholder="ex : Votremotdepasse"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <button
          type="button"
          id="signupButton"
          className="btn btn-success col-5 col-md-4 col-lg-3 mt-4 mx-auto"
          onClick={submitClick}
        >
          Inscription
        </button>
      </div>
    </section>
  )
}

export default Signup
