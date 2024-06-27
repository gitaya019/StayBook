import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/TermsPage.css';

const TermsPage = () => {
  return (
    <>
      <Header />
      <Container className="terms-page mt-5">
        <h1>Términos y Condiciones</h1>
        <p>Bienvenido a nuestra aplicación. Si continúa navegando y utilizando este sitio web, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones de uso, que junto con nuestra política de privacidad rigen la relación de nuestra compañía con usted en relación con este sitio web. Si no está de acuerdo con alguna parte de estos términos y condiciones, por favor no utilice nuestro sitio web.</p>
        <h2>Uso del Sitio</h2>
        <p>Este sitio web puede usar cookies para monitorear las preferencias de navegación. Si permite el uso de cookies, la siguiente información personal puede ser almacenada por nosotros para su uso por terceros.</p>
        <h2>Enlaces a Otros Sitios Web</h2>
        <p>Nuestro sitio web puede contener enlaces a otros sitios de interés. Sin embargo, una vez que haya utilizado estos enlaces para salir de nuestro sitio, debe tener en cuenta que no tenemos control sobre ese otro sitio web. Por lo tanto, no podemos ser responsables de la protección y privacidad de cualquier información que proporcione mientras visita esos sitios y esos sitios no se rigen por esta declaración de privacidad.</p>
        <h2>Limitación de Responsabilidad</h2>
        <p>Ni nosotros ni ningún tercero proporcionamos ninguna garantía en cuanto a la precisión, puntualidad, rendimiento, integridad o idoneidad de la información y materiales encontrados u ofrecidos en este sitio web para ningún propósito particular.</p>
      </Container>
      <Footer />
    </>
  );
};

export default TermsPage;
