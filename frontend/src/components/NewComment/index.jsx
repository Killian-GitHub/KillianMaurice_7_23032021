// Import
import React, { useState } from 'react'
import axios from 'axios'

// Component
function NewComment() {
  const [message, setMessage] = useState('')

  // Initialisation de bouton
  const submitClick = (e) => {
    e.preventDefault()

    // Récupération de l'id de la publication
    const id = URLSearchParams.id

    // Récupération des valeurs du formulaire
    const commentValues = {
      message: message,
    }

    // Envoi a l'API
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/posts/' + id + '/comments/new/',
      data: commentValues,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res)
        window.location.href = '/posts'
      })
      .catch((err) => {
        console.log(err)
        window.alert('Publication impossible')
      })
  }

  return (
    <>
      {/* <div className="row">
                  <div className="my-3 col-11 mx-auto">
                    <textarea
                      className="form-control"
                      id="newMessage"
                      placeholder="Écrire un commentaire"
                      rows="2"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="row">
                  <button
                    type="button"
                    className="btn btn-light btn-sm col-8 mb-3 mx-auto"
                    onClick={(e) => submitClick(e, post.id)}
                  >
                    Ajouter un commentaire
                  </button>
                </div> */}
    </>
  )
}

export default NewComment
