// Import
import React, { useState, useEffect } from 'react'
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
  var searchParams = new URLSearchParams(window.location.search)
  let postId = parseInt(searchParams.get('id'.value))
  const [post, setPost] = useState([])
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:3000/api/posts/' + postId,
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
  // // Modifier un post
  // const [newPostMessage, setNewPostMessage] = useState([])
  // const [newPostImage, setNewPostImage] = useState([])
  // const updatePostClick = (e, id) => {
  //   const formValues = {
  //     message: newPostMessage,
  //     image: newPostImage,
  //   }
  //   e.preventDefault()
  //   axios({
  //     method: 'put',
  //     url: 'http://localhost:3000/api/posts/' + id,
  //     data: formValues,
  //     headers: {
  //       Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => {
  //       console.log(res)
  //       window.location.reload()
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       window.alert('Modification du post impossible')
  //     })
  // }
  return (
    <>
      <div id={post.id}>
        <div className="container pt-2 pb-2">
          <div className="col-md-10 col-lg-8 border shadow-sm rounded mx-auto">
            <div className="row mx-auto mb-4">
              <PostUser className="col-10 mt-3">
                <UserPhoto
                  // src={post.User.photo}
                  className="img-fluid me-1"
                  alt="Photo de profile"
                />
                <div className="my-auto">
                  <UserInfo id="userName">
                    {/* {post.User.firstName} {post.User.lastName} */}
                  </UserInfo>
                  <UserInfo className="text-secondary" id="date">
                    <Moment format="D MMM YYYY">{post.createdAt}</Moment>
                  </UserInfo>
                </div>
              </PostUser>
            </div>
            <div className="row">
              <div className="text-center col-11 mx-auto" id="postImage">
                <img src={post.image} alt="Partagé par l'utilisateur" />
              </div>
            </div>
            <div className="row">
              <p id="postMessage" className="col-11 mx-auto">
                {post.message}
              </p>
              <span className="border-bottom col-11 my-1 mx-auto"></span>
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
