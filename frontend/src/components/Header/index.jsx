// Import
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import HeaderLogo from '../../assets/logo/icon-left-font-small.png'

// Style
const Logo = styled.img`
  @media screen and (min-width: 350px) {
    width: 45%;
  }
  @media screen and (min-width: 500px) {
    width: 30%;
  }
  @media screen and (min-width: 1000px) {
    width: 15%;
  }
  &:hover {
    cursor: pointer;
  }
`
const NavLink = styled.div`
  @media screen and (min-width: 1000px) {
    margin-left: 65%;
  }
`

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <div className="container-fluid">
          <Logo
            src={HeaderLogo}
            alt="Logo de groupomania"
            className="header-logo col-8"
            onClick={() => {
              window.location.href = '/'
            }}
          />
          <button
            className="navbar-toggler border border-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <NavLink
            className="collapse navbar-collapse"
            id="navbarTogglerDemo02"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item me-2">
                <Link to="/account" className="nav-link">
                  Paramètres
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-link"
                  onClick={() => {
                    window.localStorage.removeItem('accessToken')
                    window.localStorage.removeItem('userPhoto')
                    window.localStorage.removeItem('userId')
                  }}
                >
                  Déconnexion
                </Link>
              </li>
            </ul>
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Header
