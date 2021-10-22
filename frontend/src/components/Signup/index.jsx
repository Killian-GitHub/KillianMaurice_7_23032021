// Import
import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import UserIcon from '../../assets/logo/user-grey.png'
import ConnectionLogo from '../../assets/logo/icon-above-font-small.png'
import { validName, validEmail, validPassword } from '../../utils/Regex'
import '../../styles/login.css'

function Signup() {
  // Récupération des saisies
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Validation des saisies
  const [firstNameErr, setFirstNameErr] = useState(false)
  const [lastNameErr, setLastNameErr] = useState(false)
  const [emailErr, setEmailErr] = useState(false)
  const [passwordErr, setPasswordErr] = useState(false)

  function formValid() {
    let isValid = true

    if (!validName.test(firstName)) {
      setFirstNameErr(true)
      isValid = false
    } else {
      setFirstNameErr(false)
    }
    if (!validName.test(lastName)) {
      setLastNameErr(true)
      isValid = false
    } else {
      setLastNameErr(false)
    }
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
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        photo: UserIcon,
      }

      axios({
        method: 'POST',
        url: process.env.REACT_APP_API_URL + '/api/users/signup',
        data: formValues,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          window.alert(
            'Votre compte a bien été créé, a présent veuillez vous connecter'
          )
          window.location.href = '/login'
        })
        .catch((err) => {
          alert(
            "Une érreur est survenue, veillez à bien remplir le formulaire d'inscription"
          )
        })
    }
  }

  return (
    <section className="container mb-4">
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
        {firstNameErr && (
          <p className="text-danger text-center">
            Les chiffres et symboles ne sont pas autorisés, utilisez entre 3 et
            20 caractères
          </p>
        )}
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
        {lastNameErr && (
          <p className="text-danger text-center">
            Les chiffres et symboles ne sont pas autorisés, utilisez entre 3 et
            20 caractères
          </p>
        )}
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
            placeholder="ex : martin-petit@gmail.com"
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
          className="btn btn-light border col-5 col-md-4 col-lg-3 mt-4 mx-auto"
          onClick={submitClick}
        >
          Inscription
        </button>
      </div>
      <div className="row">
        <Link
          to="/login"
          className="btn btn-sm mx-auto mt-3 col-4 col-md-2 col-lg-1 border"
        >
          Retour
        </Link>
      </div>
    </section>
  )
}

export default Signup
