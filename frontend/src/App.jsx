// - Import - //
import React, { createContext } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import jwtDecode from 'jwt-decode'

// - Components - //
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/Connection/Login'
import Signup from './components/Connection/Signup'
import NewPost from './pages/NewPost'
import NewsFeed from './pages/NewsFeed'

// - Security - //

const userToken = () => {
  if (localStorage.getItem('token')) {
    const decodedToken = jwtDecode(localStorage.getItem('token'))
    const dateNow = new Date()
    if (decodedToken.exp > dateNow / 1000) {
      return true
    } else {
      localStorage.clear()
      window.location = '/'
    }
  }
}

// - Auth routes - //
const PrivateRoutes = ({ component: Component, path }) => {
  return (
    <Route
      exact
      path={path}
      render={() => (userToken() ? <Component /> : <Redirect to="/login" />)}
    ></Route>
  )
}

// - Private routes - //
const dashboard = () => {
  return (
    <Context.Provider value={userToken}>
      <Header />
      <NewPost exact path="/posts/new" />
      <NewsFeed exact path="/posts" />
    </Context.Provider>
  )
}
// - Context - //
const Context = createContext()

// - APP - //
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <PrivateRoutes component={dashboard} />
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
