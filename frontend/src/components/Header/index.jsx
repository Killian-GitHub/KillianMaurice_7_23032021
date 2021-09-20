import styled from 'styled-components'

import HeaderLogo from '../../assets/logo/icon-left-font-small.png'

// --- style --- //
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 5px;
`
const Logo = styled.img`
  width: 200px;
`
const HeaderUl = styled.ul`
  list-style: none;
  display: flex;
  margin: 35px auto;
`
const HeaderLi = styled.li`
  margin-left: 35px;
`
const HeaderLink = styled.div`
  margin-right: 10px;
  color: rgb(139, 139, 139);
  text-decoration: none;
  &:hover {
    color: black;
    cursor: pointer;
  }
`

// --- component --- //
function Header() {
  return (
    <HeaderContainer>
      <Logo src={HeaderLogo} alt="Logo de groupomania" />
      <nav>
        <HeaderUl>
          <HeaderLink>
            <HeaderLi>
              <i className="fas fa-home header-icon"></i>
              Accueil
            </HeaderLi>
          </HeaderLink>
          <HeaderLink>
            <HeaderLi>
              <i className="fas fa-power-off header-icon"></i>
              Déconnexion
            </HeaderLi>
          </HeaderLink>
        </HeaderUl>
      </nav>
    </HeaderContainer>
  )
}

export default Header
