// Import
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Moment from 'react-moment'
import styled from 'styled-components'
import NewComment from '../NewComment'

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
const PostMenu = styled.div`
  width: 30px;
  height: 30px;
`
const CommentUserPhoto = styled.img`
  height: 55px;
  padding: 2px;
`
const StyledButton = styled.div`
  color: rgb(205, 77, 82);
  cursor: pointer;
`

// Composant
function Feed() {
  //
  // Récupération des posts
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:3000/api/posts/',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res)
        setPosts(res.data)
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

  // Supprimer un post
  const deletePostClick = (e, id) => {
    e.preventDefault()
    axios({
      method: 'delete',
      url: 'http://localhost:3000/api/posts/' + id,
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
        window.alert('Suppression du post impossible')
      })
  }

  // // Récuperation des commentaires
  // const [comments, setComments] = useState([])
  // useEffect(() => {
  //   axios({
  //     method: 'get',
  //     url: 'http://localhost:3000/api/comments/',
  //     headers: {
  //       Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => {
  //       console.log(res)
  //       setComments(res.data.comments)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       window.alert('Récupération des commentaires impossible')
  //     })
  // }, [])

  // // Nouveau commentaire
  // const [newComment, setNewComment] = useState('')
  // const submitClick = (e, id) => {
  //   e.preventDefault()
  //   const formValues = {
  //     message: newComment,
  //   }
  //   axios({
  //     method: 'post',
  //     url: 'http://localhost:3000/api/comments/' + id,
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
  //       window.alert('Publication du commentaire impossible')
  //     })
  // }

  // // Supprimer un commentaire
  // const deleteCommentClick = (e, id) => {
  //   e.preventDefault()
  //   axios({
  //     method: 'delete',
  //     url: 'http://localhost:3000/api/comments/' + id,
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
  //       window.alert('Suppression du commentaire impossible')
  //     })
  // }

  return (
    <>
      {posts.map((post, id) => {
        return (
          <div key={id}>
            <div className="container pt-2 pb-2">
              <div className="col-md-10 col-lg-8 border shadow-sm rounded mx-auto">
                <div className="row mx-auto mb-4">
                  <PostUser className="col-10 mt-3">
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
                  </PostUser>
                  <PostMenu className="dropdown col-2">
                    <button
                      className="btn btn-sm btn-light mt-4 dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <div
                          className="dropdown-item"
                          onClick={(e) => updatePostClick(e, post.id)}
                        >
                          Modifier
                        </div>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <div
                          className="dropdown-item"
                          onClick={(e) => deletePostClick(e, post.id)}
                        >
                          Supprimer
                        </div>
                      </li>
                    </ul>
                  </PostMenu>
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
                {/* {comments
                  .filter((comment) => comment.PostId === post.id)
                  .map((comment, id) => {
                    return (
                      <div key={id}>
                        <div className="row d-flex justify-content-between">
                          <PostUser className="col-9 mt-3 ms-3">
                            <CommentUserPhoto
                              src={comment.User.photo}
                              className="img-fluid me-2"
                              alt="Logo de groupomania"
                            />
                            <div className="my-auto bg-light px-2 py-1">
                              <UserInfo
                                className="font-weight-bold"
                                id="userName"
                              >
                                {comment.User.firstName} {comment.User.lastName}
                              </UserInfo>
                              <UserInfo
                                id="newComment"
                                className="text-secondary"
                              >
                                {comment.message}
                              </UserInfo>
                            </div>
                          </PostUser>
                          <div className="col-2 my-auto">
                            <StyledButton
                              className="far fa-trash-alt"
                              onClick={(e) => deleteCommentClick(e, comment.id)}
                            ></StyledButton>
                          </div>
                        </div>
                      </div>
                    )
                  })} */}
                {/* <div className="row">
                  <div className="my-3 col-11 mx-auto">
                    <textarea
                      className="form-control"
                      id="newMessage"
                      placeholder="Écrire un commentaire"
                      rows="2"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="row">
                  <button
                    type="button"
                    className="btn btn-light btn-sm col-8 mb-3 mx-auto"
                    onClick={(e) => submitClick(e, post.id)}
                  >
                    Ajouter un commentaire
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Feed

// // Import
// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import Moment from 'react-moment'
// import styled from 'styled-components'
// import NewComment from '../NewComment'

// // Style
// const UserPhoto = styled.img`
//   height: 70px;
//   padding: 5px;
// `
// const PostUser = styled.div`
//   display: flex;
// `
// const UserInfo = styled.p`
//   margin: 0;
// `
// const PostMenu = styled.div`
//   width: 30px;
//   height: 30px;
// `
// const CommentUserPhoto = styled.img`
//   height: 55px;
//   padding: 2px;
// `
// const StyledButton = styled.div`
//   color: rgb(205, 77, 82);
//   cursor: pointer;
// `

// // Composant
// function Feed() {
//   //
//   // Récupération des posts
//   const [posts, setPosts] = useState([])
//   useEffect(() => {
//     axios({
//       method: 'get',
//       url: 'http://localhost:3000/api/posts/',
//       headers: {
//         Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((res) => {
//         console.log(res)
//         setPosts(res.data)
//       })
//       .catch((err) => {
//         console.log(err)
//         window.alert('Récupération des publications impossible')
//       })
//   }, [])

//   // Modifier un post
//   const [newPostMessage, setNewPostMessage] = useState([])
//   const [newPostImage, setNewPostImage] = useState([])
//   const updatePostClick = (e, id) => {
//     const formValues = {
//       message: newPostMessage,
//       image: newPostImage,
//     }
//     e.preventDefault()
//     axios({
//       method: 'put',
//       url: 'http://localhost:3000/api/posts/' + id,
//       data: formValues,
//       headers: {
//         Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((res) => {
//         console.log(res)
//         window.location.reload()
//       })
//       .catch((err) => {
//         console.log(err)
//         window.alert('Modification du post impossible')
//       })
//   }

//   // Supprimer un post
//   const deletePostClick = (e, id) => {
//     e.preventDefault()
//     axios({
//       method: 'delete',
//       url: 'http://localhost:3000/api/posts/' + id,
//       headers: {
//         Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((res) => {
//         console.log(res)
//         window.location.reload()
//       })
//       .catch((err) => {
//         console.log(err)
//         window.alert('Suppression du post impossible')
//       })
//   }

//   // Récuperation des commentaires
//   const [comments, setComments] = useState([])
//   useEffect(() => {
//     axios({
//       method: 'get',
//       url: 'http://localhost:3000/api/comments/',
//       headers: {
//         Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((res) => {
//         console.log(res)
//         setComments(res.data.comments)
//       })
//       .catch((err) => {
//         console.log(err)
//         window.alert('Récupération des commentaires impossible')
//       })
//   }, [])

//   // // Nouveau commentaire
//   // const [newComment, setNewComment] = useState('')
//   // const submitClick = (e, id) => {
//   //   e.preventDefault()
//   //   const formValues = {
//   //     message: newComment,
//   //   }
//   //   axios({
//   //     method: 'post',
//   //     url: 'http://localhost:3000/api/comments/' + id,
//   //     data: formValues,
//   //     headers: {
//   //       Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
//   //       'Content-Type': 'application/json',
//   //     },
//   //   })
//   //     .then((res) => {
//   //       console.log(res)
//   //       window.location.reload()
//   //     })
//   //     .catch((err) => {
//   //       console.log(err)
//   //       window.alert('Publication du commentaire impossible')
//   //     })
//   // }

//   // Supprimer un post
//   const deleteCommentClick = (e, id) => {
//     e.preventDefault()
//     axios({
//       method: 'delete',
//       url: 'http://localhost:3000/api/comments/' + id,
//       headers: {
//         Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((res) => {
//         console.log(res)
//         window.location.reload()
//       })
//       .catch((err) => {
//         console.log(err)
//         window.alert('Suppression du commentaire impossible')
//       })
//   }

//   return (
//     <>
//       {posts.map((post, id) => {
//         return (
//           <div key={id}>
//             <div className="container pt-2 pb-2">
//               <div className="col-md-10 col-lg-8 border shadow-sm rounded mx-auto">
//                 <div className="row mx-auto mb-4">
//                   <PostUser className="col-10 mt-3">
//                     <UserPhoto
//                       src={post.User.photo}
//                       className="img-fluid me-1"
//                       alt="Photo de profile"
//                     />
//                     <div className="my-auto">
//                       <UserInfo id="userName">
//                         {post.User.firstName} {post.User.lastName}
//                       </UserInfo>
//                       <UserInfo className="text-secondary" id="date">
//                         <Moment format="D MMM YYYY">{post.createdAt}</Moment>
//                       </UserInfo>
//                     </div>
//                   </PostUser>
//                   <PostMenu className="dropdown col-2">
//                     <button
//                       className="btn btn-sm btn-light mt-4 dropdown-toggle"
//                       type="button"
//                       id="dropdownMenuButton1"
//                       data-bs-toggle="dropdown"
//                       aria-expanded="false"
//                     >
//                       <i class="fas fa-edit"></i>
//                     </button>
//                     <ul
//                       className="dropdown-menu"
//                       aria-labelledby="dropdownMenuButton1"
//                     >
//                       <li>
//                         <div
//                           className="dropdown-item"
//                           onClick={(e) => updatePostClick(e, post.id)}
//                         >
//                           Modifier
//                         </div>
//                       </li>
//                       <li>
//                         <hr className="dropdown-divider" />
//                       </li>
//                       <li>
//                         <div
//                           className="dropdown-item"
//                           onClick={(e) => deletePostClick(e, post.id)}
//                         >
//                           Supprimer
//                         </div>
//                       </li>
//                     </ul>
//                   </PostMenu>
//                 </div>
//                 <div className="row">
//                   <div className="text-center col-11 mx-auto" id="postImage">
//                     <img src={post.image} alt="Partagé par l'utilisateur" />
//                   </div>
//                 </div>
//                 <div className="row">
//                   <p id="postMessage" className="col-11 mx-auto">
//                     {post.message}
//                   </p>
//                   <span className="border-bottom col-11 my-1 mx-auto"></span>
//                 </div>
//                 {comments
//                   .filter((comment) => comment.PostId === post.id)
//                   .map((comment, id) => {
//                     return (
//                       <div key={id}>
//                         <div className="row d-flex justify-content-between">
//                           <PostUser className="col-9 mt-3 ms-3">
//                             <CommentUserPhoto
//                               src={comment.User.photo}
//                               className="img-fluid me-2"
//                               alt="Logo de groupomania"
//                             />
//                             <div className="my-auto bg-light px-2 py-1">
//                               <UserInfo
//                                 className="font-weight-bold"
//                                 id="userName"
//                               >
//                                 {comment.User.firstName} {comment.User.lastName}
//                               </UserInfo>
//                               <UserInfo
//                                 id="newComment"
//                                 className="text-secondary"
//                               >
//                                 {comment.message}
//                               </UserInfo>
//                             </div>
//                           </PostUser>
//                           <div className="col-2 my-auto">
//                             <StyledButton
//                               className="far fa-trash-alt"
//                               onClick={(e) => deleteCommentClick(e, comment.id)}
//                             ></StyledButton>
//                           </div>
//                         </div>
//                       </div>
//                     )
//                   })}
//                 <NewComment />
//                 {/* <div className="row">
//                   <div className="my-3 col-11 mx-auto">
//                     <textarea
//                       className="form-control"
//                       id="newMessage"
//                       placeholder="Écrire un commentaire"
//                       rows="2"
//                       value={newComment}
//                       onChange={(e) => setNewComment(e.target.value)}
//                     ></textarea>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <button
//                     type="button"
//                     className="btn btn-light btn-sm col-8 mb-3 mx-auto"
//                     onClick={(e) => submitClick(e, post.id)}
//                   >
//                     Ajouter un commentaire
//                   </button>
//                 </div> */}
//               </div>
//             </div>
//           </div>
//         )
//       })}
//     </>
//   )
// }

// export default Feed
