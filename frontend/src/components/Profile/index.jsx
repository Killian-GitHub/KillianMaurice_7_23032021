// Import
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

// Style
const UserPhoto = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`
const StyledInput = styled.input`
  width: 70%;
  margin: 0 auto;
  text-align: center;
  border: none;
  padding: 5px 0;
  background-color: rgb(245, 245, 245);
  outline: none;
`
const AddImage = styled.input`
  display: none;
`

function Profile() {
  // Récupération des saisies
  const [newPhoto, setNewPhoto] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  // Récupération du profil
  const [profile, setProfile] = useState([])
  useEffect(() => {
    axios({
      method: 'get',
      url: process.env.REACT_APP_API_URL + '/api/users/account/',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setProfile(res.data)
        localStorage.removeItem('userPhoto')
        localStorage.setItem('userPhoto', res.data.photo)
      })
      .catch((err) => {
        window.alert('Récupération du profile impossible')
      })
  }, [])

  // Modification du profil
  const modifyClick = (e) => {
    e.preventDefault()

    let formData = new FormData()
    formData.append('image', newPhoto)
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('email', email)

    axios({
      method: 'put',
      url: process.env.REACT_APP_API_URL + '/api/users/account/modify/',
      data: formData,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        window.alert('Modifications enregistré')
        window.location.href = '/account/'
      })
      .catch((err) => {
        window.alert('Modification du compte impossible')
      })
  }

  // Suppression du profile
  const deleteClick = (e) => {
    e.preventDefault()

    axios({
      method: 'delete',
      url: process.env.REACT_APP_API_URL + '/api/users/account/delete',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userPhoto')
        window.location.href = '/login'
      })
      .catch((err) => {
        window.alert('Suppression du compte impossible')
      })
  }

  return (
    <div className="container">
      <div className="border border-2 shadow rounded col-10 col-lg-7 mx-auto mt-5">
        {!newPhoto && (
          <div className="d-flex justify-content-center mt-4">
            <UserPhoto
              src={profile.photo}
              alt="Utilisateur"
              className="shadow"
            />
          </div>
        )}
        {newPhoto && (
          <>
            <div className="d-flex justify-content-center">
              <UserPhoto
                src={URL.createObjectURL(newPhoto)}
                alt="Profile"
                className="mx-auto mt-4 mb-1"
              />
            </div>
            <div className="row">
              <label
                className="btn col-10 col-md-5 link-danger mx-auto"
                onClick={() => setNewPhoto(null)}
              >
                Annuler la modification
              </label>
            </div>
          </>
        )}
        {!newPhoto && (
          <div className="row">
            <label className="btn col-10 col-md-5 link-secondary mx-auto">
              <AddImage
                type="file"
                name="myImage"
                onChange={(event) => {
                  setNewPhoto(event.target.files[0])
                }}
              />
              Modifier la photo de profil
            </label>
          </div>
        )}
        <div className="row mt-2 mb-3">
          <p className="text-center mb-2">Prénom :</p>
          <StyledInput
            type="text"
            className="form-control"
            placeholder={profile.firstName}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="row mt-2 mb-3">
          <p className="text-center mb-2">Nom :</p>
          <StyledInput
            type="text"
            className="form-control"
            placeholder={profile.lastName}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="row mt-2 mb-4">
          <p className="text-center mb-2">Adresse email :</p>
          <StyledInput
            type="text"
            className="form-control"
            placeholder={profile.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="row">
          <p
            className="btn link-secondary mb-1 col-10 col-md-5 mx-auto"
            onClick={(e) => modifyClick(e)}
          >
            Valider vos modifications
          </p>
        </div>
        <div className="row">
          <p
            className="btn link-danger col-10 col-md-5 mx-auto"
            onClick={(e) => deleteClick(e)}
          >
            Supprimer votre compte
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile
