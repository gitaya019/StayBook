import { Container } from 'react-bootstrap';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer>
      <Container>
        <div className="footer-content">
          <p>© 2024 Recer-Habi. Todos los derechos reservados.</p>
          <p>Diseñado con <span role="img" aria-label="love">❤️</span> para una mejor gestión hotelera</p>
          <p><a href="/terms">Términos y Condiciones</a> | <a href="/privacy">Política de Privacidad</a></p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;