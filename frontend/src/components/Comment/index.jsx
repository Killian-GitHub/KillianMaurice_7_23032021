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
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
`
const StyledButton = styled.div`
  cursor: pointer;
`

function Comment(props) {
  // Récuperation des commentaires
  const [comments, setComments] = useState([])

  useEffect(() => {
    axios({
      method: 'get',
      url: process.env.REACT_APP_API_URL + '/api/comments/',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setComments(res.data.comments)
      })
      .catch((err) => {
        window.alert('Récupération des commentaires impossible')
      })
  }, [])

  // Supprimer un commentaire
  const deleteCommentClick = (e, id) => {
    e.preventDefault()

    axios({
      method: 'delete',
      url: process.env.REACT_APP_API_URL + '/api/comments/' + id,
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
        window.alert('Suppression du commentaire impossible')
      })
  }

  return (
    <>
      {comments
        .filter((comment) => comment.PostId === props.id)
        .map((comment, id) => {
          return (
            <div key={id}>
              <div className="row d-flex justify-content-between">
                <PostUser className="col-9 mt-3 ms-3">
                  <CommentUserPhoto
                    src={comment.User.photo}
                    className="me-2 shadow"
                    alt="Logo de groupomania"
                  />
                  <div className="my-auto bg-light shadow-sm px-2 py-1">
                    <UserInfo className="font-weight-bold" id="userName">
                      {comment.User.firstName} {comment.User.lastName}
                    </UserInfo>
                    <UserInfo id="newComment" className="text-secondary">
                      {comment.message}
                    </UserInfo>
                  </div>
                </PostUser>
                <div className="col-2 me-2 my-auto">
                  {(localStorage.getItem('userId') ===
                    comment.User.id.toString() ||
                    localStorage.getItem('userId') === 1) && (
                    <StyledButton
                      className="far fa-trash-alt color-secondary p-1 border border-2 rounded bg-light shadow-sm"
                      onClick={(e) => deleteCommentClick(e, comment.id)}
                    ></StyledButton>
                  )}
                </div>
              </div>
            </div>
          )
        })}
    </>
  )
}

export default Comment
