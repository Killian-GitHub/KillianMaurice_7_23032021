// Import
import React, { useState } from 'react'
import { validMessage } from '../../utils/Regex'
import styled from 'styled-components'
import axios from 'axios'

// Style
const AddComment = styled.div`
  &:hover {
    cursor: pointer;
  }
`

function NewComment(props) {
  const [visible, setVisible] = useState(false)

  // Récupération de la saisie
  const [newComment, setNewComment] = useState('')

  // Validation de la saisie
  const [messageErr, setMessageErr] = useState(false)

  function formValid() {
    let isValid = true

    if (!validMessage.test(newComment)) {
      setMessageErr(true)
      isValid = false
    } else {
      setMessageErr(false)
    }

    return isValid
  }

  // Envoie de la requête
  const submitClick = (e, id) => {
    e.preventDefault()

    const isValid = formValid()

    if (isValid) {
      const formValues = {
        message: newComment,
      }

      axios({
        method: 'post',
        url: process.env.REACT_APP_API_URL + '/api/comments/' + id,
        data: formValues,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          window.location.reload()
        })
        .catch((err) => {
          window.alert('Publication du commentaire impossible')
        })
    }
  }

  return (
    <>
      <div className="row">
        <span className="col-10 border-bottom mt-3 mx-auto"></span>
        <AddComment
          className="my-1 col-10 text-secondary col-md-5 text-center mx-auto py-2"
          onClick={() => (!visible ? setVisible(true) : setVisible(false))}
        >
          Ajoutez un commentaire
        </AddComment>
      </div>
      {visible ? (
        <>
          <div className="row">
            <div className="mt-0 mb-3 col-11 mx-auto">
              <textarea
                className="form-control border border-2"
                id="newMessage"
                placeholder="Écrivez votre commentaire"
                rows="2"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
            </div>
          </div>
          {messageErr && (
            <p className="text-danger text-center">
              Entrez un message de 2 caractères au minimum
            </p>
          )}
          <div className="row">
            <button
              type="button"
              className="btn btn-light col-8 col-md-5 mb-3 py-2 mx-auto shadow-sm border border-2"
              onClick={(e) => submitClick(e, props.id)}
            >
              Publier
            </button>
          </div>
        </>
      ) : null}
    </>
  )
}

export default NewComment
