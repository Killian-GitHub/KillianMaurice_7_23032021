// Import
import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Moment from 'react-moment'
import NewComment from '../NewComment'
import Comment from '../Comment'

// Style
const UserPhoto = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
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

class Home extends Component {
  // Récupération des publications
  state = {
    postArray: [],
  }

  componentDidMount() {
    // Récupération des publications
    axios({
      method: 'get',
      url: process.env.REACT_APP_API_URL + '/api/posts/',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        this.setState({
          postArray: res.data,
        })
      })
      .catch((err) => {
        window.alert('Récupération des publications impossible')
      })
  }

  // Supprimer une publication
  handleClick = (e, id) => {
    e.preventDefault()

    axios({
      method: 'delete',
      url: process.env.REACT_APP_API_URL + '/api/posts/' + id,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        window.location.reload()
      })
      .catch((err) => {
        window.alert('Suppression du post impossible')
      })
  }

  render() {
    return (
      <>
        {this.state.postArray.map((post) => (
          <div key={post.id}>
            <div className="container my-4 pt-2 pb-2">
              <div className="col-md-10 col-lg-6 border border-2 shadow rounded mx-auto">
                <div className="row mx-auto mb-4">
                  <PostUser className="col-9 col-md-10 mt-3">
                    <UserPhoto
                      src={post.User.photo}
                      alt="Utilisateur"
                      className="ms-1 ms-md-4 me-2 shadow"
                    />

                    <div className="my-auto">
                      <UserInfo id="userName">
                        {post.User.firstName} {post.User.lastName}
                      </UserInfo>
                      <UserInfo className="text-secondary" id="date">
                        <Moment format="D MMM YYYY">{post.updatedAt}</Moment>
                      </UserInfo>
                    </div>
                  </PostUser>
                  {(localStorage.getItem('userId') ===
                    post.User.id.toString() ||
                    localStorage.getItem('userId') === 1) && (
                    <PostMenu className="dropdown col">
                      <button
                        className="btn btn-sm border border-2 mt-4 px-2 shadow-sm dropdown-toggle"
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
                              (window.location.href = '/modify/' + post.id)
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
                {post.image !== null && (
                  <div className="row">
                    <div
                      className="text-center shadow-sm p-0 mb-4 col-10 mx-auto"
                      id="postImage"
                    >
                      <PostImage
                        src={post.image}
                        alt="Partagé par l'utilisateur"
                      />
                    </div>
                  </div>
                )}
                <div className="row">
                  <p
                    id="postMessage"
                    className="col mx-auto mb-1 px-4 text-center"
                  >
                    {post.message}
                  </p>
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
