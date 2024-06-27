import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/PrivacyPage.css';

const PrivacyPage = () => {
  return (
    <>
      <Header />
      <Container className="privacy-page mt-5">
        <h1>Política de Privacidad</h1>
        <p>Esta política de privacidad establece cómo nuestra aplicación utiliza y protege cualquier información que usted proporciona cuando utiliza este sitio web. Estamos comprometidos a garantizar que su privacidad esté protegida. Si le pedimos que proporcione cierta información mediante la cual puede ser identificado al usar este sitio web, puede estar seguro de que solo se utilizará de acuerdo con esta declaración de privacidad.</p>
        <h2>Qué Datos Recopilamos</h2>
        <p>Podemos recopilar la siguiente información: nombre, información de contacto incluyendo la dirección de correo electrónico, información demográfica como el código postal, preferencias e intereses.</p>
        <h2>Lo que Hacemos con la Información que Recopilamos</h2>
        <p>Requerimos esta información para entender sus necesidades y brindarle un mejor servicio, y en particular por las siguientes razones: mantenimiento de registros internos, mejora de nuestros productos y servicios, envío de correos electrónicos promocionales sobre nuevos productos, ofertas especiales u otra información que creemos que puede encontrar interesante.</p>
        <h2>Seguridad</h2>
        <p>Estamos comprometidos a garantizar que su información esté segura. Con el fin de evitar el acceso no autorizado o la divulgación, hemos puesto en marcha procedimientos físicos, electrónicos y administrativos adecuados para salvaguardar y asegurar la información que recopilamos en línea.</p>
      </Container>
      <Footer />
    </>
  );
};

export default PrivacyPage;
