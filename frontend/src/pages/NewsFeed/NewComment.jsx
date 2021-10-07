// Import
import React, { useState } from 'react'
import axios from 'axios'
// import { useHistory } from 'react-router-dom'

// Component
function NewComment() {
  const [state, setState] = useState({
    newComment: '',
  })

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
    const commentValues = {
      message: state.newComment,
    }

    // Envoi a l'API
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/comments/new/',
      data: commentValues,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res)
        setState((prevState) => ({
          ...prevState,
        }))
        window.location.href = '/posts'
        //   history.push('/posts')
      })
      .catch((err) => {
        window.alert('Publication impossible')
        console.log(err)
      })
  }

  return (
    <>
      <div className="row">
        <div className="my-3 col-11 mx-auto">
          <textarea
            type="text"
            className="form-control"
            id="newComment"
            placeholder="Écrire un commentaire"
            rows="2"
            value={state.newComment}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>
      <div className="row">
        <button
          type="button"
          className="btn btn-light btn-sm col-8 mb-3 mx-auto"
          onClick={submitClick}
        >
          Ajouter un commentaire
        </button>
      </div>
    </>
  )
}

export default NewComment
