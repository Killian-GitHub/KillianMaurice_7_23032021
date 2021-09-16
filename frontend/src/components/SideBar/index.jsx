import styled from 'styled-components'

const SbContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const SideBarNav = styled.div`
  width: 95px;
  height: 600px;
  background-color: #f2f2f2;
`
const NavUl = styled.ul`
  list-style: none;
  padding: 0;
  text-align: center;
`
const NavLi = styled.li`
  margin: 40px auto;
  display: flex;
  flex-direction: column;
`
const NavLink = styled.div`
  color: rgb(139, 139, 139);
  text-decoration: none;
  &:hover {
    color: black;
    cursor: pointer;
  }
`

function SideBar() {
  return (
    <SbContainer>
      <SideBarNav>
        <NavUl>
          <NavLink>
            <NavLi>
              <i className="fas fa-user news-icon"></i>
              Profil
            </NavLi>
          </NavLink>
          <NavLink>
            <NavLi>
              <i className="fas fa-users news-icon"></i>
              Amis
            </NavLi>
          </NavLink>
          <NavLink>
            <NavLi>
              <i className="fas fa-bell news-icon"></i>
              Notifications
            </NavLi>
          </NavLink>
          <NavLink>
            <NavLi>
              <i className="fas fa-envelope news-icon"></i>
              Messagerie
            </NavLi>
          </NavLink>
          <NavLink>
            <NavLi>
              <i className="fas fa-calendar-alt news-icon"></i>
              Événements
            </NavLi>
          </NavLink>
          <NavLink>
            <NavLi>
              <i className="fas fa-cogs news-icon"></i>
              Paramètres
            </NavLi>
          </NavLink>
        </NavUl>
      </SideBarNav>
    </SbContainer>
  )
}

export default SideBar
