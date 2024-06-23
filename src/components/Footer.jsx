import { Container } from 'react-bootstrap';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start">
      <Container className="p-4">
        <div className="text-center p-3">
          © 2024 Recer-Habi. Todos los derechos reservados.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
