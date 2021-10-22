// Import
import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ConnectionLogo from '../../assets/logo/icon-above-font-small.png'
import { validEmail, validPassword } from '../../utils/Regex'

function Login() {
  // Récupération des saisies
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Validation des saisies
  const [emailErr, setEmailErr] = useState(false)
  const [passwordErr, setPasswordErr] = useState(false)

  function formValid() {
    let isValid = true

    if (!validEmail.test(email)) {
      setEmailErr(true)
      isValid = false
    } else {
      setEmailErr(false)
    }
    if (!validPassword.test(password)) {
      setPasswordErr(true)
      isValid = false
    } else {
      setPasswordErr(false)
    }

    return isValid
  }

  // Envoie de la requête
  const submitClick = (e) => {
    e.preventDefault()

    const isValid = formValid()

    if (isValid) {
      const formValues = {
        email: email,
        password: password,
      }

      axios({
        method: 'post',
        url: process.env.REACT_APP_API_URL + '/api/users/login',
        data: formValues,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          window.localStorage.setItem('accessToken', res.data.userToken)
          window.localStorage.setItem('userPhoto', res.data.photo)
          window.localStorage.setItem('userId', res.data.id)
          window.location.href = '/'
        })
        .catch((err) => {
          window.alert('Adresse email ou mot de passe incorrect')
        })
    }
  }

  return (
    <section className="container mb-5 mt-5">
      <div className="text-center">
        <img
          src={ConnectionLogo}
          className="login-logo mb-3 col-9 col-md-8 col-lg-5"
          alt="Logo de Groupomania"
        />
      </div>
      <div className="row">
        <div className="mb-3 col-11 col-md-9 col-lg-6 text-center mx-auto">
          <label htmlFor="email" className="login-form mb-1">
            Entrez votre email :
          </label>
          <input
            type="email"
            className="form-control bg-light text-center"
            id="email"
            placeholder="ex : martin-petit@gmail.com.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {emailErr && (
          <p className="text-danger text-center">
            Adresse email invalide, veuillez entré votre adresse email
          </p>
        )}
      </div>
      <div className="row ">
        <div className="mb-3 col-11 col-md-9 col-lg-6 text-center mx-auto">
          <label htmlFor="password" className="login-form mb-1">
            Entrez votre mot de passe :
          </label>
          <input
            type="password"
            className="form-control bg-light text-center"
            id="password"
            placeholder="ex : mot-de-passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {passwordErr && (
          <p className="text-danger text-center">
            Mot de passe invalide, entrez huit caractères au minimum et au moins
            un chiffre
          </p>
        )}
      </div>
      <div className="row">
        <button
          type="button"
          id="signupButton"
          className="btn btn-light border col-5 col-md-4 col-lg-3 mt-3 mx-auto"
          onClick={submitClick}
        >
          Connexion
        </button>
      </div>
      <div className="row">
        <p className="text-center mt-4 mb-1">Vous n'avez pas de compte ?</p>
        <Link
          to="/signup"
          className="btn btn-sm mx-auto mt-1 col-4 col-md-2 col-lg-1 border"
        >
          Inscription
        </Link>
      </div>
    </section>
  )
}

export default Login
