// Import
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

// Style
const AddImage = styled.input`
  display: none;
`
const PostImage = styled.img`
  object-fit: cover;
  width: 100%;
  @media screen and (min-width: 300px) {
    height: 250px;
  }
  @media screen and (min-width: 500px) {
    height: 400px;
  }
`

function ModifyPost() {
  // Récupération du post
  const { id } = useParams()
  const [post, setPost] = useState([])

  useEffect(() => {
    axios({
      method: 'get',
      url: process.env.REACT_APP_API_URL + '/api/posts/' + id,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setPost(res.data)
      })
      .catch((err) => {
        window.alert('Récupération de la publications impossible')
      })
  }, [id])

  // Modifier un post
  const [newPostMessage, setNewPostMessage] = useState([])
  const [newImage, setNewImage] = useState(null)
  const updatePostClick = (e) => {
    e.preventDefault()

    let formData = new FormData()
    formData.append('image', newImage)
    formData.append('message', newPostMessage)

    axios({
      method: 'put',
      url: 'http://localhost:3000/api/posts/' + id,
      data: formData,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        window.location.href = '/'
      })
      .catch((err) => {
        window.alert('Modification du post impossible')
      })
  }

  return (
    <>
      <div key={post.id}>
        <div className="container pt-4 pb-2">
          <div className="col-md-10 col-lg-6 mt-3 border shadow rounded mx-auto">
            {post.image !== null && (
              <div className="row">
                <div
                  className="text-center border shadow-sm mt-5 mb-3 col-10 mx-auto"
                  id="postImage"
                >
                  {newImage && (
                    <div className="d-flex justify-content-center mb-4">
                      <img
                        className="text-center w-75 ms-5"
                        alt="not fount"
                        src={URL.createObjectURL(newImage)}
                      />
                      <button
                        className="btn btn-danger btn-sm ms-3 h-25 my-auto"
                        onClick={() => setNewImage(null)}
                      >
                        <i class="far fa-trash-alt"></i>
                      </button>
                    </div>
                  )}
                  {!newImage && (
                    <div className="row">
                      <div
                        className="text-center shadow-sm p-0 col-112 mx-auto"
                        id="postImage"
                      >
                        <PostImage
                          src={post.image}
                          alt="Partagé par l'utilisateur"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="row">
              <div className="mb-3 col-10 p-0 mx-auto">
                <textarea
                  type="text"
                  className="form-control border border-2 text-center"
                  id="newMessage"
                  placeholder={post.message}
                  rows="3"
                  value={newPostMessage}
                  onChange={(e) => setNewPostMessage(e.target.value)}
                ></textarea>
              </div>
            </div>
            {post.image !== null && (
              <>
                {!newImage && (
                  <div className="row">
                    <label className="btn btn-sm btn-light border border-2 my-2 col-8 mx-auto">
                      <AddImage
                        type="file"
                        name="myImage"
                        onChange={(event) => {
                          setNewImage(event.target.files[0])
                        }}
                      />
                      Modifier votre image
                    </label>
                  </div>
                )}
              </>
            )}
            <div className="row">
              <button
                className="btn btn-light border border-2 mb-3 mt-2 col-6 mx-auto"
                onClick={updatePostClick}
              >
                Enregistrer vos modifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModifyPost
