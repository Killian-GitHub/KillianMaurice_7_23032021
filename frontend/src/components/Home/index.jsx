import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Moment from 'react-moment'
import NewComment from '../NewComment'
import Comment from '../Comment'

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

class Home extends Component {
  // Récupération des publications
  state = {
    postArray: [],
  }
  componentDidMount() {
    // Récupération des posts
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
        this.setState({
          postArray: res.data,
        })
      })
      .catch((err) => {
        console.log(err)
        window.alert('Récupération des publications impossible')
      })
  }

  // Supprimer une publication
  handleClick = (e, id) => {
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

  render() {
    return (
      <>
        {this.state.postArray.map((post) => (
          <div id={post.id}>
            <div className="container pt-2 pb-2">
              <div className="col-md-10 col-lg-7 border border-2 shadow-sm rounded mx-auto">
                <div className="row mx-auto mb-4">
                  <PostUser className="col-9 col-md-10 mt-3">
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
                  {(localStorage.getItem('userId') ===
                    post.User.id.toString() ||
                    localStorage.getItem('userId') === 1) && (
                    <PostMenu className="dropdown col">
                      <button
                        className="btn btn-sm btn-light border border-2 mt-4 px-2 shadow-sm dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fas fa-cog color-secondary"></i>
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <div
                            className="dropdown-item"
                            id={post.id}
                            onClick={() =>
                              (window.location.href = '/modify/?id=' + post.id)
                            }
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
                            onClick={(e) => this.handleClick(e, post.id)}
                          >
                            Supprimer
                          </div>
                        </li>
                      </ul>
                    </PostMenu>
                  )}
                </div>
                {/* A REVOIR ------- */}
                {post.image !== null && (
                  <div className="row">
                    <div className="text-center col-11 mx-auto" id="postImage">
                      <img src={post.image} alt="Partagé par l'utilisateur" />
                    </div>
                  </div>
                )}
                <div className="row">
                  <p id="postMessage" className="col mx-auto text-center">
                    {post.message}
                  </p>
                  {/* <span className="border-bottom col-11 my-1 mx-auto"></span> */}
                </div>
                <span className="border-bottom col-11 my-1 mx-auto"></span>
                <Comment id={post.id} />
                <NewComment id={post.id} />
              </div>
            </div>
          </div>
        ))}
      </>
    )
  }
}

export default Home
