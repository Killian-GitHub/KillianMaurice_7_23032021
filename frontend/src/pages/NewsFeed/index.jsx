// Import
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import UserIcon from '../../assets/logo/user-icon.png'
import Comment from './Comment'
import NewComment from './NewComment'

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

const CommentUserPhoto = styled.img`
  height: 55px;
  padding: 2px;
`

// Render
function NewsFeed(params) {
  useEffect(() => {
    fetchPosts(params)
  }, [])

  const [state] = useState({
    firstName: '',
    lastName: '',
    photo: '',
    message: '',
    image: '',
    createdAt: '',
  })

  const [posts, setPosts] = useState([])

  const fetchPosts = (e) => {
    // Récupération des informations
    const postsData = {
      firstName: state.firstName,
      lastName: state.lastName,
      photo: state.photo,
      message: state.message,
      image: state.image,
      createdAt: state.createdAt,
    }

    // Envoi a l'API
    axios({
      method: 'get',
      url: 'http://localhost:3000/api/posts',
      data: postsData,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        const posts = res.data
        setPosts(posts)
        console.log(res)
      })
      .catch((err) => {
        window.alert('Récupération impossible')
        console.log(err)
      })
  }
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <div className="container pt-2 pb-2">
            <div className="col-md-10 col-lg-8 border mx-auto">
              <div className="row">
                <PostUser className="col-11 mt-3 mx-auto">
                  <UserPhoto
                    src={post.User.photo}
                    className="img-fluid"
                    alt="Photo de profile"
                  />
                  <div className="my-auto">
                    <UserInfo id="userName">
                      {post.User.firstName} {post.User.lastName}
                    </UserInfo>
                    <UserInfo className="text-secondary" id="date">
                      {post.createdAt}
                    </UserInfo>
                  </div>
                </PostUser>
              </div>
              <div className="row">
                <div className="text-center col-11 mx-auto" id="postImage">
                  {post.image}
                </div>
              </div>
              <div className="row">
                <p id="postMessage" className="col-11 mx-auto">
                  {post.message}
                </p>
              </div>
              {/* <Comment /> */}
              <NewComment />
            </div>
            <span className="border-bottom col-11 my-1 mx-auto"></span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NewsFeed

// // Import
// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import styled from 'styled-components'
// import UserIcon from '../../assets/logo/user-icon.png'

// // Style
// const UserPhoto = styled.div`
//   height: 70px;
//   padding: 5px;
// `

// const PostUser = styled.div`
//   display: flex;
// `

// const UserInfo = styled.p`
//   margin: 0;
// `

// const CommentUserPhoto = styled.img`
//   height: 55px;
//   padding: 2px;
// `

// // Render
// function NewsFeed(params) {
//   useEffect(() => {
//     fetchPosts(params)
//   }, [])

//   const [state] = useState({
//     firstName: '',
//     lastName: '',
//     photo: '',
//     message: '',
//     image: '',
//     createdAt: '',
//   })

//   const [posts, setPosts] = useState([])

//   const fetchPosts = (e) => {
//     // Récupération des informations
//     const postsData = {
//       firstName: state.firstName,
//       lastName: state.lastName,
//       photo: state.photo,
//       message: state.message,
//       image: state.image,
//       createdAt: state.createdAt,
//     }

//     // Envoi a l'API
//     axios({
//       method: 'get',
//       url: 'http://localhost:3000/api/posts',
//       data: postsData,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((res) => {
//         const posts = res.data
//         setPosts(posts)
//         console.log(res)
//       })
//       .catch((err) => {
//         window.alert('Récupération impossible')
//         console.log(err)
//       })
//   }
//   return (
//     <div>
//       {posts.map((post) => (
//         <div key={post.id}>
//           <div className="container pt-2 pb-2">
//             <div className="col-md-10 col-lg-8 border mx-auto">
//               <div className="row">
//                 <PostUser className="col-11 mt-3 mx-auto">
//                   <UserPhoto
//                     src={post.photo}
//                     className="img-fluid"
//                     alt="Photo de profile"
//                   />
//                   <div className="my-auto">
//                     <UserInfo id="userName">
//                       {post.User.firstName} {post.User.lastName}
//                     </UserInfo>
//                     <UserInfo className="text-secondary" id="date">
//                       {post.createdAt}
//                     </UserInfo>
//                   </div>
//                 </PostUser>
//               </div>
//               <div className="row">
//                 <div className="text-center col-11 mx-auto" id="postImage">
//                   {post.image}
//                 </div>
//               </div>
//               <div className="row">
//                 <p id="postMessage" className="col-11 mx-auto">
//                   {post.message}
//                 </p>
//                 <span className="border-bottom col-11 my-1 mx-auto"></span>
//               </div>
//               <div className="row">
//                 <PostUser className="col-11 mt-3 mx-auto">
//                   <CommentUserPhoto
//                     src={UserIcon}
//                     className="img-fluid"
//                     alt="Logo de groupomania"
//                   />
//                   <div className="my-auto bg-light px-2 py-1">
//                     <UserInfo className="font-weight-bold" id="userName">
//                       {/* Sandra Taisant */}
//                     </UserInfo>
//                     <UserInfo id="newComment">
//                       {/* Bravo pour ce site web tu est vraiment le meilleur! */}
//                     </UserInfo>
//                   </div>
//                 </PostUser>
//               </div>
//               <div className="row">
//                 <div className="my-3 col-11 mx-auto">
//                   <textarea
//                     className="form-control"
//                     id="newMessage"
//                     placeholder="Écrire un commentaire"
//                     rows="2"
//                   ></textarea>
//                 </div>
//               </div>
//               <div className="row">
//                 <button
//                   type="button"
//                   className="btn btn-light btn-sm col-8 mb-3 mx-auto"
//                 >
//                   Ajouter un commentaire
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default NewsFeed
