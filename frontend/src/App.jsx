// Import
import React, { createContext } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import jwtDecode from 'jwt-decode'

// Composants
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/Login'
import Signup from './components/Signup'
import NewPost from './components/NewPost'
import Home from './components/Home'
import Profile from './components/Profile'
import ModifyPost from './components/ModifyPost'

// Securité
require('dotenv').config()

const userToken = () => {
  if (localStorage.getItem('accessToken')) {
    const decodedToken = jwtDecode(localStorage.getItem('accessToken'))
    const dateNow = new Date()
    if (decodedToken.exp > dateNow / 1000) {
      return true
    } else {
      localStorage.clear()
      window.location = '/'
    }
  }
}

// Routes privées
const PrivateRoutes = ({ component: Component, path }) => {
  return (
    <Route
      exact
      path={path}
      render={() => (userToken() ? <Component /> : <Redirect to="/login" />)}
    ></Route>
  )
}

// Eléments
const dashboard = () => {
  return (
    <Context.Provider value={userToken}>
      <Header />
      <NewPost />
      <Home />
    </Context.Provider>
  )
}
const profile = () => {
  return (
    <Context.Provider value={userToken}>
      <Header />
      <Profile />
    </Context.Provider>
  )
}
const modify = () => {
  return (
    <Context.Provider value={userToken}>
      <Header />
      <ModifyPost />
    </Context.Provider>
  )
}

// Contexte
const Context = createContext()

// App
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <PrivateRoutes path="/" exact component={dashboard} />
        <PrivateRoutes path="/account" exact component={profile} />
        <PrivateRoutes path="/modify/:id/" exact component={modify} />
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
