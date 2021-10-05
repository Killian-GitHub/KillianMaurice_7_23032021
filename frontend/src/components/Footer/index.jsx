import styled from 'styled-components'

const StyledLink = styled.a`
  color: rgb(139, 139, 139);
  &:hover {
    color: red;
    cursor: pointer;
  }
`

function Footer() {
  return (
    <footer>
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <ul className="list-inline list-unstyled text-center pt-2">
              <li className="list-inline-item">
                <StyledLink className="nav-link">A propos</StyledLink>
              </li>
              <li className="list-inline-item">
                <StyledLink className="nav-link">Confidentialité</StyledLink>
              </li>
              <li className="list-inline-item">
                <StyledLink
                  className="nav-link danger"
                  href="mailto:groupomania@contact.com"
                >
                  Contact
                </StyledLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
