import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo size={44} />
          <div>
            <strong>NEURA AI CLUB</strong>
            <p>
              Department of Information Technology
              <br />
              D. Y. Patil College of Engineering, Akurdi, Pune
            </p>
          </div>
        </div>
        <nav className="footer__links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/hierarchy">Hierarchy</Link>
          <Link to="/events">Events</Link>
          <a href="https://instagram.com/aiclub_dypcoe?obrf=MWVmaDlwaTlrc2JpNA%3D%3D" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </nav>
      </div>
      <p className="footer__copy">© {new Date().getFullYear()} Neura AI Club · DYPCOE</p>
    </footer>
  )
}
