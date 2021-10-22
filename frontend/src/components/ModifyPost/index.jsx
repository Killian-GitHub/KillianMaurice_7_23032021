// Import
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Moment from 'react-moment'
import axios from 'axios'

// Style
const UserPhoto = styled.img`
  height: 70px;
  padding: 5px;
`
const PostUser = styled.div`
  display: flex;
`
const UserInfo = styled.p`
  margin: 0;
`

function ModifyPost() {
  // Récupération du post
  const { id } = useParams()
  const [post, setPost] = useState([])
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:3000/api/posts/' + id,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res)
        setPost(res.data)
      })
      .catch((err) => {
        console.log(err)
        window.alert('Récupération des publications impossible')
      })
  }, [])
  // Modifier un post
  const [newPostMessage, setNewPostMessage] = useState([])
  const [newPostImage, setNewPostImage] = useState([])
  const updatePostClick = (e, id) => {
    const formValues = {
      message: newPostMessage,
      image: newPostImage,
    }
    e.preventDefault()
    axios({
      method: 'put',
      url: 'http://localhost:3000/api/posts/' + id,
      data: formValues,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res)
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
        window.alert('Modification du post impossible')
      })
  }
  return (
    <>
      <div key={post.id}>
        <div className="container pt-4 pb-2">
          <div className="col-md-10 col-lg-8 border shadow-sm rounded mx-auto">
            <div className="row mx-auto mb-4">
              {/* <PostUser className="col-10 mt-3">
                <UserPhoto
                  src={post.User.photo}
                  className="img-fluid me-1"
                  alt="Photo de profile"
                />
                <div className="my-auto">
                  <UserInfo id="userName">
                    {post.User.firstName} {post.User.lastName}
                  </UserInfo>
                  <UserInfo className="text-secondary" id="date">
                    <Moment format="D MMM YYYY">{post.createdAt}</Moment>
                  </UserInfo>
                </div>
              </PostUser> */}
            </div>
            <div className="row">
              <div
                className="text-center shadow-sm my-4 col-10 mx-auto"
                id="postImage"
              >
                <img
                  className="w-75"
                  src={post.image}
                  alt="Partagé par l'utilisateur"
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-10 p-0 mx-auto">
                <textarea
                  type="text"
                  className="form-control border border-2"
                  id="newMessage"
                  placeholder={post.message}
                  rows="3"
                  value={newPostMessage}
                  onChange={(e) => setNewPostMessage(e.target.value)}
                ></textarea>
              </div>
            </div>
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
      {/* <div className="row">
        <textarea
          className="form-control"
          id="newMessage"
          placeholder={props.message}
          rows="2"
          value={newPostMessage}
          onChange={(e) => setNewPostMessage(e.target.value)}
        ></textarea>
        <span className="border-bottom col-11 my-1 mx-auto"></span>
      </div> */}
    </>
  )
}

export default ModifyPost
