// Import
import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { validMessage } from '../../utils/Regex'

// Style
const AddImage = styled.input`
  display: none;
`
const UserPhoto = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`
const NewImage = styled.img`
  object-fit: cover;
  @media screen and (min-width: 300px) {
    height: 200px;
    width: 100%;
  }
  @media screen and (min-width: 500px) {
    height: 250px;
    width: 100%;
    padding: 0 2%;
  }
`
const DeleteBtn = styled.button`
  position: relative;
  height: 32px;
  @media screen and (min-width: 300px) {
    right: -7px;
    top: -40px;
  }
  @media screen and (min-width: 500px) {
    right: -20px;
    top: -40px;
  }
`

// Récuperation de la photo de profil
const userPhoto = localStorage.getItem('userPhoto')

function NewPost() {
  const [visible, setVisible] = useState(false)

  // Récupération des données
  const [message, setMessage] = useState('')
  const [image, setImage] = useState(null)

  // Validation de la saisie
  const [messageErr, setMessageErr] = useState(false)

  function formValid() {
    let isValid = true

    if (!validMessage.test(message)) {
      setMessageErr(true)
      isValid = false
    } else {
      setMessageErr(false)
    }

    return isValid
  }

  // Envoie de la requête
  const submitClick = (e) => {
    e.preventDefault()

    const isValid = formValid()

    if (isValid) {
      let formData = new FormData()
      formData.append('image', image)
      formData.append('message', message)

      axios({
        method: 'post',
        url: process.env.REACT_APP_API_URL + '/api/posts/',
        data: formData,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((res) => {
          window.location.reload()
        })
        .catch((err) => {
          window.alert('Publication impossible')
        })
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center mt-3">
        <UserPhoto src={userPhoto} alt="Utilisateur" className="shadow-lg" />
      </div>
      <div className="d-flex justify-content-center">
        <button
          className="btn  my-3 col-8 col-md-5 col-lg-3 mx-auto py-2 shadow-sm border border-2"
          onClick={() => {
            !visible ? setVisible(true) : setVisible(false)
          }}
        >
          Ajouter une publication
        </button>
      </div>
      {visible ? (
        <div className="container pt-2 pb-2">
          <div className="col-md-10 col-lg-6 bg-light border border-2 py-4 px-1 mx-auto">
            {image && (
              <div className="d-flex px-3 flex-wrap">
                <NewImage
                  className="mx-auto rounded"
                  alt="not fount"
                  src={URL.createObjectURL(image)}
                />
                <DeleteBtn
                  className="far fa-trash-alt btn btn-danger btn-sm"
                  onClick={() => setImage(null)}
                />
              </div>
            )}
            <div className="row">
              <div className="mb-3 col-11 mx-auto">
                <textarea
                  type="text"
                  className="form-control border border-2"
                  id="newMessage"
                  placeholder="Écrivez votre texte ici"
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
            </div>
            {messageErr && (
              <p className="text-danger text-center">
                Entrez un message de 2 caractères au minimum
              </p>
            )}
            <div className="row mt-2 mx-auto d-flex justify-content-around">
              <label className="btn bg-white col-5 col-md-4 py-2 border border-2">
                <AddImage
                  type="file"
                  name="myImage"
                  onChange={(e) => {
                    setImage(e.target.files[0])
                  }}
                />
                Ajouter une image
              </label>
              <div className="col-1"></div>
              <button
                type="button"
                onClick={submitClick}
                className="btn bg-white col-5 col-md-4 py-2 border border-2"
              >
                Publier
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default NewPost
