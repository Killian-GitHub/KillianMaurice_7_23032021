// Import
import { Link } from 'react-router-dom'

// Component
function Footer() {
  return (
    <footer>
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <ul className="list-inline list-unstyled text-center pt-2">
              <li className="list-inline-item">
                <Link to="#" className="nav-link link-secondary">
                  A propos
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="#" className="nav-link link-secondary">
                  Confidentialité
                </Link>
              </li>
              <li className="list-inline-item">
                <Link
                  className="nav-link link-secondary"
                  to="mailto:groupomania@contact.com"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
