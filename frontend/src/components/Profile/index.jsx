// Import
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

// Style
const Picture = styled.img`
  width: 130px;
`
const StyledText = styled.p`
  text-align: center;
  color: grey;
  &:hover {
    color: rgb(86, 95, 123);
    cursor: pointer;
  }
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

function Profile() {
  // Initialisation du state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  // Récupération du profile
  const [profile, setProfile] = useState([])
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:3000/api/users/account/',
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
  const deleteClick = (e) => {
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
        window.location.href = '/login'
      })
      .catch((err) => {
        console.log(err)
        window.alert('Suppression du compte impossible')
      })
  }

  // Modification du profile
  const modifyClick = (e) => {
    e.preventDefault()
    const formValues = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    }
    axios({
      method: 'put',
      url: 'http://localhost:3000/api/users/account/modify/',
      data: formValues,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res)
        window.alert('Modifications enregistré')
        window.location.href = '/account/'
      })
      .catch((err) => {
        console.log(err)
        window.alert('Modification du compte impossible')
      })
  }

  return (
    <div className="container">
      <div className="border shadow-sm rounded col-10 mx-auto mt-5">
        <div className="row">
          <Picture
            src={profile.photo}
            alt="Profile"
            className="mx-auto mt-4 mb-2"
          />
        </div>
        <StyledText>Modifier la photo de profile</StyledText>
        <div className="row mt-2 mb-3">
          <p className="text-center mb-2">Prénom :</p>
          <StyledInput
            type="text"
            class="form-control"
            placeholder={profile.firstName}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="row mt-2 mb-3">
          <p className="text-center mb-2">Nom :</p>
          <StyledInput
            type="text"
            class="form-control"
            placeholder={profile.lastName}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="row mt-2 mb-4">
          <p className="text-center mb-2">Adresse email :</p>
          <StyledInput
            type="text"
            class="form-control"
            placeholder={profile.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <StyledText onClick={(e) => modifyClick(e)}>
          Modifier votre profile
        </StyledText>
        <StyledText
          className="text-danger mb-3"
          onClick={(e) => deleteClick(e)}
        >
          Supprimer votre compte
        </StyledText>
      </div>
    </div>
  )
}

export default Profile

// // Import
// import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import axios from 'axios'
// import styled from 'styled-components'

// // Style
// const Picture = styled.img`
//   width: 130px;
// `
// const StyledText = styled.p`
//   text-align: center;
//   color: grey;
//   &:hover {
//     color: rgb(86, 95, 123);
//     cursor: pointer;
//   }
// `
// const StyledInput = styled.input`
//   width: 70%;
//   margin: 0 auto;
//   text-align: center;
//   border: none;
//   padding: 5px 0;
//   background-color: rgb(245, 245, 245);
//   outline: none;
// `

// function Profile() {
//   // Initialisation du state
//   const [firstName, setFirstName] = useState('')
//   const [lastName, setLastName] = useState('')
//   const [email, setEmail] = useState('')
//   // Récupération du profile
//   const [profile, setProfile] = useState([])
//   useEffect(() => {
//     axios({
//       method: 'get',
//       url: 'http://localhost:3000/api/users/account/',
//       headers: {
//         Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((res) => {
//         console.log(res)
//         setProfile(res.data)
//       })
//       .catch((err) => {
//         console.log(err)
//         window.alert('Récupération du profile impossible')
//       })
//   }, [])

//   // Suppression du profile
//   const deleteClick = (e, id) => {
//     e.preventDefault()
//     axios({
//       method: 'delete',
//       url: 'http://localhost:3000/api/users/account/delete' + id,
//       headers: {
//         Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((res) => {
//         console.log(res)
//         localStorage.removeItem('accessToken')
//         localStorage.removeItem('userPhoto')
//         window.location.href = '/'
//       })
//       .catch((err) => {
//         console.log(err)
//         window.alert('Suppression du compte impossible')
//       })
//   }

//   // Modification du profile
//   const modifyClick = (e) => {
//     e.preventDefault()
//     const formValues = {
//       firstName: firstName,
//       lastName: lastName,
//       email: email,
//     }
//     axios({
//       method: 'put',
//       url: 'http://localhost:3000/api/users/account/modify/',
//       data: formValues,
//       headers: {
//         Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((res) => {
//         console.log(res)
//         window.alert('Modifications enregistré')
//         window.location.href = '/account/'
//       })
//       .catch((err) => {
//         console.log(err)
//         window.alert('Modification du compte impossible')
//       })
//   }

//   return (
//     <div className="container">
//       <div className="border shadow-sm rounded col-10 mx-auto mt-5">
//         <div className="row">
//           <Picture
//             src={profile.photo}
//             alt="Profile"
//             className="mx-auto mt-4 mb-2"
//           />
//         </div>
//         <StyledText>Modifier la photo de profile</StyledText>
//         <div className="row mt-2 mb-3">
//           <p className="text-center mb-2">Prénom :</p>
//           <StyledInput
//             type="text"
//             class="form-control"
//             placeholder={profile.firstName}
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//           />
//         </div>
//         <div className="row mt-2 mb-3">
//           <p className="text-center mb-2">Nom :</p>
//           <StyledInput
//             type="text"
//             class="form-control"
//             placeholder={profile.lastName}
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//           />
//         </div>
//         <div className="row mt-2 mb-4">
//           <p className="text-center mb-2">Adresse email :</p>
//           <StyledInput
//             type="text"
//             class="form-control"
//             placeholder={profile.email}
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <StyledText onClick={(e) => modifyClick(e)}>
//           Modifier votre profile
//         </StyledText>
//         <StyledText
//           className="text-danger mb-3"
//           onClick={(e) => deleteClick(e)}
//         >
//           Supprimer votre compte
//         </StyledText>
//       </div>
//     </div>
//   )
// }

// export default Profile
