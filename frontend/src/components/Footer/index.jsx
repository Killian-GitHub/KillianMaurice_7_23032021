// Import
import styled from 'styled-components'

//Style
const StyledLink = styled.a`
  &:hover {
    cursor: pointer;
  }
`

// Component
function Footer() {
  return (
    <footer>
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <ul className="list-inline list-unstyled text-center pt-2">
              <li className="list-inline-item">
                <StyledLink className="nav-link text-secondary">
                  A propos
                </StyledLink>
              </li>
              <li className="list-inline-item">
                <StyledLink className="nav-link text-secondary">
                  Confidentialité
                </StyledLink>
              </li>
              <li className="list-inline-item">
                <StyledLink
                  className="nav-link  text-secondary"
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
