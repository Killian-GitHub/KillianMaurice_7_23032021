// Import
import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

// Style
const AddImage = styled.input`
  display: none;
`

// Récuperation de la photo de profile
const userPhoto = localStorage.getItem('userPhoto')

// Component
function NewPost() {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)

  // Initialisation de bouton
  const submitClick = (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('image', selectedImage)
    formData.append('message', message)

    // Envoi a l'API
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/posts/',
      // data: postValues,
      data: formData,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        console.log(res)
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
        window.alert('Publication impossible')
      })
  }

  return (
    <>
      <div className="row mt-3">
        <img
          src={userPhoto}
          className="col-4 col-md-2 col-lg-1 mt-2 mx-auto"
          alt="Utilisateur"
        />
      </div>
      <div className="row">
        <button
          className="btn  my-3 col-8 col-md-5 col-lg-3 mx-auto py-2 shadow-sm border border-2"
          onClick={() => {
            !visible ? setVisible(true) : setVisible(false)
          }}
        >
          Ajoutez une publication
        </button>
      </div>
      {visible ? (
        <div className="container pt-2 pb-2">
          <div className="col-md-10 col-lg-7 bg-light py-4 px-1 mx-auto">
            <div className="row">
              {selectedImage && (
                <div className="d-flex justify-content-center mb-4">
                  <img
                    className="text-center ms-5"
                    alt="not fount"
                    // width={'200px'}
                    height={'150px'}
                    src={URL.createObjectURL(selectedImage)}
                  />
                  <button
                    className="btn btn-danger btn-sm ms-3 h-25 my-auto"
                    onClick={() => setSelectedImage(null)}
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                </div>
              )}
            </div>
            <div className="row">
              <div className="mb-3 col-11 mx-auto">
                <textarea
                  type="text"
                  className="form-control border border-2"
                  id="newMessage"
                  placeholder="Écrivez votre texte"
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="row mt-2 mx-auto d-flex justify-content-around">
              <label className="btn bg-white col-5 col-md-4 py-2 border border-2">
                <AddImage
                  type="file"
                  name="myImage"
                  onChange={(event) => {
                    setSelectedImage(event.target.files[0])
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
