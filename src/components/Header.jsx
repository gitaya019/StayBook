import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/RecerHABI.png';
import '../styles/Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <Navbar expand="lg" className="header-navbar">
      <Container className="header-container">
        <Navbar.Brand as={Link} to="/" className="header-brand">
          <img src={logo} alt="Recer-Habi" className="header-logo" />
          <h2 className='header-logo-text'>Recer-Habi</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="header-toggler" />
        <Navbar.Collapse id="basic-navbar-nav" className="header-collapse">
          <Nav className="header-nav">
            <Nav.Link as={Link} to="/" active={location.pathname === "/"} className="header-nav-link">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/register" active={location.pathname === "/register"} className="header-nav-link">
              Registrarse
            </Nav.Link>
            <Nav.Link as={Link} to="/login" active={location.pathname === "/login"} className="header-nav-link">
              Iniciar Sesión
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;