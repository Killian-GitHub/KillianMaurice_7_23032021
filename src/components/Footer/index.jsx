import styled from 'styled-components'

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`
const FooterUl = styled.ul`
  list-style: none;
  display: flex;
`
const FooterLink = styled.div`
  color: rgb(139, 139, 139);
  text-decoration: none;
  &:hover {
    color: black;
    cursor: pointer;
  }
`
const FooterLi = styled.li`
  &:nth-child(2) {
    margin-left: 60px;
    margin-right: 30px;
  }
  ,
  &:nth-child(3) {
    margin-left: 30px;
    margin-right: 60px;
  }
`

function Footer() {
  return (
    <FooterContainer>
      <nav>
        <FooterUl>
          <FooterLink>
            <FooterLi>À propos</FooterLi>
          </FooterLink>
          <FooterLink>
            <FooterLi>Confidentialité</FooterLi>
          </FooterLink>
          <FooterLink>
            <FooterLi>Conditions</FooterLi>
          </FooterLink>
          <FooterLi>&copy; Groupomania 2021</FooterLi>
        </FooterUl>
      </nav>
    </FooterContainer>
  )
}

export default Footer
