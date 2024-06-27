import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/NotFoundPage.css";
import error404 from "../assets/errorpages.jpg";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Container fluid className="not-found-page-container text-center">
        <div className="error-animation">
          <img src={error404} alt="Error 404" className="error-404" />
        </div>
        <h1 className="error-heading">404 - Página No Encontrada</h1>
        <p className="error-message">
          Lo sentimos, la página que buscas no existe.
        </p>
        <Button className="error-button" onClick={() => navigate("/")}>
          Volver al Inicio
        </Button>
      </Container>
      <Footer />
    </>
  );
};

export default NotFoundPage;
