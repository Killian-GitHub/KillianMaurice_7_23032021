// Import
import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import ConnectionLogo from '../../assets/logo/icon-above-font-small.png'

// Style
const StyledLink = styled.a`
  color: rgb(139, 139, 139);
  text-decoration: none;
  &:hover {
    color: red;
    cursor: pointer;
  }
`

// Component
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Initialisation de bouton
  const submitClick = (e) => {
    e.preventDefault()
    const formValues = {
      email: email,
      password: password,
    }

    // Envoi a l'API
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/users/login',
      data: formValues,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res)
        window.localStorage.setItem('accessToken', res.data.userToken)
        window.localStorage.setItem('userPhoto', res.data.photo)
        window.location.href = '/posts'
      })
      .catch((err) => {
        console.log(err)
        window.alert('Adresse email ou mot de passe incorrect')
      })
  }
  // Component
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
      </div>
      <div className="row">
        <button
          type="button"
          id="signupButton"
          className="btn btn-success col-5 col-md-4 col-lg-3 mt-3 mx-auto"
          onClick={submitClick}
        >
          Connexion
        </button>
      </div>
      <div className="row">
        <p className="text-center mt-5 mb-1">Vous n'avez pas de compte ?</p>
        <StyledLink href="/signup" className="text-center">
          Inscription
        </StyledLink>
      </div>
    </section>
  )
}

export default Login
