// Import
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

// Style
const Picture = styled.img`
  width: 130px;
`

function Profile() {
  // Récupération du profile
  const [profile, setProfile] = useState([])
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:3000/api/users/account',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res)
        setProfile(res.data)
      })
      .catch((err) => {
        console.log(err)
        window.alert('Récupération du profile impossible')
      })
  }, [])

  // Suppression du profile
  const submitClick = (e) => {
    e.preventDefault()
    axios({
      method: 'delete',
      url: 'http://localhost:3000/api/users/account/delete',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userPhoto')
        window.location.href = '/'
      })
      .catch((err) => {
        console.log(err)
        window.alert('Suppression du compte impossible')
      })
  }

  return (
    <div className="container">
      <div className="border col-10 mx-auto mt-5">
        <div className="row">
          <Picture src={profile.photo} alt="Profile" className="mx-auto my-4" />
        </div>
        <div className="row ms-3 mb-2">
          Prénom :{' '}
          <span className="text-secondary col-8">{profile.firstName}</span>
        </div>
        <div className="row ms-3 mb-2">
          Nom : <span className="text-secondary col-8">{profile.lastName}</span>
        </div>
        <div className="row ms-3">
          Adresse email :{' '}
          <span className="text-secondary col-8">{profile.email}</span>
        </div>
        <div
          className="text-center text-danger mt-3 mb-2"
          onClick={(e) => submitClick(e)}
        >
          Supprimer votre compte
        </div>
      </div>
    </div>
  )
}

export default Profile
