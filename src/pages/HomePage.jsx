import { Container, Row, Col, Button } from 'react-bootstrap';
import hotelImage from '../assets/hotel-management.jpg';
import dashboardImage from '../assets/dashboard.jpg';
import '../styles/Home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
    <Header/>
      <div className="hero-section">
        <div className="bubble-1"></div>
        <div className="bubble-2"></div>
        <div className="bubble-3"></div>
        <div className="bubble-4"></div>
        <Container>
          <h1>Administra tu hotel de manera fácil y sencilla</h1>
          <p>Crea, gestiona y haz crecer tu negocio hotelero con nuestra plataforma intuitiva</p>
          <Button variant="primary" size="lg">Comienza ahora</Button>
        </Container>
      </div>

      <div className="feature-section">
        <Container>
          <Row className="align-items-center mb-5">
            <Col md={6}>
              <div className="feature-card">
                <h2>Gestión simplificada</h2>
                <p>Nuestra plataforma te permite administrar reservas, habitaciones y servicios desde un solo lugar.</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="image-container">
                <img src={hotelImage} alt="Hotel Management" />
              </div>
            </Col>
          </Row>

          <Row className="align-items-center">
            <Col md={6}>
              <div className="image-container">
                <img src={dashboardImage} alt="Dashboard" />
              </div>
            </Col>
            <Col md={6}>
              <div className="feature-card">
                <h2>Analíticas en tiempo real</h2>
                <p>Obtén información valiosa sobre el rendimiento de tu hotel con nuestros paneles de control intuitivos.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer/>
    </>
  );
};

export default Home;