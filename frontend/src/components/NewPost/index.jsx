// Import
import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import GroupLogo from '../../assets/logo/icon.svg'

// Style
const PostLogo = styled.img`
  height: 30px;
`
const AddImage = styled.input`
  display: none;
`

// Récuperation de la photo de profile
const userPhoto = localStorage.getItem('userPhoto')

// Component
function NewPost() {
  const [message, setMessage] = useState('')
  const [image, setImage] = useState('')

  // Initialisation de bouton
  const submitClick = (e) => {
    e.preventDefault()
    const postValues = {
      message: message,
      image: image,
    }

    // Envoi a l'API
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/posts/',
      data: postValues,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res)
        // window.location.href = '/posts'
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
        window.alert('Publication impossible')
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
          <div className="mt-3 mb-2 col-11 mx-auto">
            <textarea
              type="text"
              className="form-control"
              id="newMessage"
              placeholder="Ajouter une publication"
              rows="3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <span className="border-bottom col-11 my-2 mx-auto"></span>
        </div>
        <div className="row mt-2 mb-3 mx-auto d-flex justify-content-around">
          {/* <button
            className="btn btn-light btn-sm col-4 "
            value={image}
            onChange={(e) => setImage(e.target.value)}
            type="file"
          >
            Ajouter une image
          </button> */}
          <label className="btn btn-light btn-sm col-4">
            <AddImage
              type="file"
              multiple
              onChange={(e) => setImage(e.target.value)}
            />
            Ajouter une image
          </label>
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
