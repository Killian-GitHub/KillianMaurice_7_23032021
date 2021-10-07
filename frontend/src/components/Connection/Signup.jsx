import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import UserIcon from '../../assets/logo/user.png'
import axios from 'axios'

import '../../styles/login.css'
import ConnectionLogo from '../../assets/logo/icon-above-font-small.png'

function Signup() {
  // Initialisation du state
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  // History
  let history = useHistory()

  // Récupération des valeurs
  const handleChange = (e) => {
    const { id, value } = e.target
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }

  // Initialisation de bouton
  const submitClick = (e) => {
    e.preventDefault()
    const formValues = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      password: state.password,
      photo: UserIcon,
    }
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/users/signup',
      data: formValues,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res)
        if (res.status === 201) {
          setState((prevState) => ({
            ...prevState,
          }))
          window.alert(
            'Votre compte a bien été créé, a présent veuillez vous connecter'
          )
          history.push('/login')
        } else {
          window.alert('Une erreur est survenue')
          console.log(res)
        }
      })
      .catch((err) => {
        alert("Veuillez bien remplir le formulaire d'inscription")
        console.log(err)
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
            value={state.firstName}
            onChange={handleChange}
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
            value={state.lastName}
            onChange={handleChange}
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
            value={state.email}
            onChange={handleChange}
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
            value={state.password}
            onChange={handleChange}
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
