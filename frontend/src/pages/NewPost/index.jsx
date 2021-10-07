// Import
import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import GroupLogo from '../../assets/logo/icon.svg'

// Style
const PostLogo = styled.img`
  height: 30px;
`

// Photo de profile
const userPhoto = localStorage.getItem('photo')

// Component
function NewPost() {
  const [state, setState] = useState({
    newMessage: '',
    newImage: '',
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
    const postValues = {
      message: state.newMessage,
      image: state.newImage,
    }

    // Envoi a l'API
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/posts/new',
      data: postValues,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res)
        if (res.status === 201) {
          setState((prevState) => ({
            ...prevState,
          }))
          window.location.href = '/posts'
          history.push('/posts')
        }
      })
      .catch((err) => {
        window.alert('Publication impossible')
        console.log(err)
      })
  }

  return (
    <div className="container pt-2 pb-2">
      <div className="col-md-10 col-lg-8 border mx-auto">
        <div className="row">
          <img
            src={userPhoto}
            className="col-2 mt-2 mx-auto"
            alt="Utilisateur"
          />
        </div>
        <div className="row">
          <div className="mt-3 mb-2 col-md-11 mx-auto">
            <textarea
              type="text"
              className="form-control"
              id="newMessage"
              placeholder="Ajouter une publication"
              rows="3"
              value={state.newMessage}
              onChange={handleChange}
            ></textarea>
          </div>
          <span className="border-bottom col-11 my-2 mx-auto"></span>
        </div>
        <div className="row mt-2 mb-3 mx-auto d-flex justify-content-around">
          <button
            className="btn btn-light btn-sm col-4 "
            value={state.newImage}
            onChange={handleChange}
            type="file"
          >
            Ajouter une image
          </button>
          <PostLogo
            src={GroupLogo}
            alt="Logo de groupomania"
            className="col-1"
          />
          <button
            type="button"
            onClick={submitClick}
            className="btn btn-light btn-sm col-4"
          >
            Publier
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewPost
