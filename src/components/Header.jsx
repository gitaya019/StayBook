import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/RecerHABI.png';
import '../styles/Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Recer-Habi" className="header-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" active={location.pathname === "/"}>
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/register" active={location.pathname === "/register"}>
              Registrarse
            </Nav.Link>
            <Nav.Link as={Link} to="/login" active={location.pathname === "/login"}>
              Iniciar Sesión
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;