import { Container } from "react-bootstrap";
import "../styles/Footer.css";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <Container>
        <div className="footer-content">
          <p>© 2024 Recer-Habi. Todos los derechos reservados.</p>
          <p>
            Diseñado con{" "}
            <span role="img" aria-label="love">
              ❤️
            </span>{" "}
            para una mejor gestión hotelera
          </p>
          <p>
            <Link to="/terms" className="footer-link">
              Términos y Condiciones
            </Link>{" "}
            |{" "}
            <Link to="/privacy" className="footer-link">
              Política de Privacidad
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
