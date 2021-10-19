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
    const postValues = {
      message: message,
      image: selectedImage,
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
    <>
      <div className="row">
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
                    console.log(event.target.files[0])
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

// // Import
// import React, { useState } from 'react'
// import axios from 'axios'
// import styled from 'styled-components'
// import GroupLogo from '../../assets/logo/icon.svg'

// // Style
// const PostLogo = styled.img`
//   height: 30px;
// `
// const AddImage = styled.input`
//   display: none;
// `

// // Récuperation de la photo de profile
// const userPhoto = localStorage.getItem('userPhoto')

// // Component
// function NewPost() {
//   const [message, setMessage] = useState('')
//   const [selectedImage, setSelectedImage] = useState(null)

//   // Initialisation de bouton
//   const submitClick = (e) => {
//     e.preventDefault()
//     const postValues = {
//       message: message,
//       image: selectedImage,
//     }

//     // Envoi a l'API
//     axios({
//       method: 'post',
//       url: 'http://localhost:3000/api/posts/',
//       data: postValues,
//       headers: {
//         Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((res) => {
//         console.log(res)
//         // window.location.href = '/posts'
//         window.location.reload()
//       })
//       .catch((err) => {
//         console.log(err)
//         window.alert('Publication impossible')
//       })
//   }

//   return (
//     <div className="container pt-2 pb-2">
//       <div className="col-md-10 col-lg-8 border mx-auto">
//         <div className="row">
//           <img
//             src={userPhoto}
//             className="col-2 mt-2 mx-auto"
//             alt="Utilisateur"
//           />
//         </div>
//         <div className="row">
//           {selectedImage && (
//             <div>
//               <img
//                 className="text-center ms-5"
//                 alt="not fount"
//                 // width={'200px'}
//                 height={'150px'}
//                 src={URL.createObjectURL(selectedImage)}
//               />
//               <button
//                 className="btn btn-danger btn-sm ms-3"
//                 onClick={() => setSelectedImage(null)}
//               >
//                 X
//               </button>
//             </div>
//           )}
//         </div>
//         <div className="row">
//           <div className="mt-3 mb-2 col-11 mx-auto">
//             <textarea
//               type="text"
//               className="form-control"
//               id="newMessage"
//               placeholder="Ajouter une publication"
//               rows="3"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             ></textarea>
//           </div>
//           <span className="border-bottom col-11 my-2 mx-auto"></span>
//         </div>
//         <div className="row mt-2 mb-3 mx-auto d-flex justify-content-around">
//           <label className="btn btn-light btn-sm col-4 border">
//             <AddImage
//               type="file"
//               name="myImage"
//               onChange={(event) => {
//                 console.log(event.target.files[0])
//                 setSelectedImage(event.target.files[0])
//               }}
//             />
//             Ajouter une image
//           </label>
//           <PostLogo
//             src={GroupLogo}
//             alt="Logo de groupomania"
//             className="col-1"
//           />
//           <button
//             type="button"
//             onClick={submitClick}
//             className="btn btn-light btn-sm col-4 border"
//           >
//             Publier
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default NewPost
