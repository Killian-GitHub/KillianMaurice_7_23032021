// - pluggin - //
import React from 'react'
import ReactDOM from 'react-dom'

// - utils - //
import './styles/index.css'
import './styles/fas-logo.css'

// - components - //
import Header from './components/Header'
import Footer from './components/Footer'
import SideBar from './components/SideBar'

// - render - //
ReactDOM.render(
  <React.StrictMode>
    <Header />
    <SideBar />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
)
