// Import
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import HeaderLogo from '../../assets/logo/icon-left-font-small.png'

// Style
const Logo = styled.img`
  @media screen and (min-width: 350px) {
    width: 40%;
  }
  @media screen and (min-width: 500px) {
    width: 25%;
  }
  @media screen and (min-width: 1000px) {
    width: 12%;
  }
`
const NavLink = styled.div`
  &:hover {
    cursor: pointer;
  }
`

// Component
function Header() {
  let history = useHistory()
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Logo
            src={HeaderLogo}
            alt="Logo de groupomania"
            className="header-logo col-8"
          />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  onClick={() => {
                    window.location.href = '/users/account/'
                  }}
                >
                  Paramètres
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  onClick={() => {
                    window.localStorage.removeItem('accessToken')
                    window.localStorage.removeItem('userPhoto')
                    history.push('/')
                  }}
                >
                  Déconnexion
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
