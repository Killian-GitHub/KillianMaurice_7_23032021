// Import
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

// Style
const PostUser = styled.div`
  display: flex;
`
const UserInfo = styled.p`
  margin: 0;
`
const CommentUserPhoto = styled.img`
  height: 55px;
  padding: 2px;
`

// Component
function Comment(params) {
  useEffect(() => {
    fetchComments(params)
  }, [])

  const [state] = useState({
    firstName: '',
    lastName: '',
    photo: '',
    message: '',
    createdAt: '',
  })

  const [comments, setComments] = useState([])

  const fetchComments = (e) => {
    // Récupération des informations
    const commentsData = {
      firstName: state.firstName,
      lastName: state.lastName,
      photo: state.photo,
      message: state.message,
      createdAt: state.createdAt,
    }

    // Envoi a l'API
    axios({
      method: 'get',
      url: 'http://localhost:3000/api/comments',
      data: commentsData,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        const comments = res.data
        setComments(comments)
        window.location('/')
        console.log(res)
      })
      .catch((err) => {
        window.alert('Récupération impossible')
        console.log(err)
      })
  }
  return (
    <>
      {/* {comments
        .filter((comment) => comment.postId === post.id)
        .map((comment, id) => {
          ;<>
            <div key={comment.id}>
              <div className="row">
                <PostUser className="col-11 mt-3 mx-auto">
                  <CommentUserPhoto
                    src={comment.User.photo}
                    className="img-fluid"
                    alt="Logo de groupomania"
                  />
                  <div className="my-auto bg-light px-2 py-1">
                    <UserInfo className="font-weight-bold" id="userName">
                      {comment.User.firstName} {comment.User.lastName}
                    </UserInfo>
                    <UserInfo id="newComment">{comment.message}</UserInfo>
                    <p className="texte-light">{comment.createdAt} test</p>
                  </div>
                </PostUser>
              </div>
            </div>
          </>
        })} */}
    </>
  )
}

export default Comment
