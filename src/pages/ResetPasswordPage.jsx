import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { sendPasswordResetEmail, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/ResetPasswordPage.css";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const checkEmailExists = async (email) => {
    try {
      // Verificar en la autenticación de Firebase
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        return true;
      }

      // Verificar en Firestore
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error al verificar el email:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const emailExists = await checkEmailExists(email);
      
      if (!emailExists) {
        setError("No existe una cuenta asociada a este correo electrónico.");
        setLoading(false);
        return;
      }

      await sendPasswordResetEmail(auth, email);
      setMessage(
        "Se ha enviado un correo electrónico para restablecer la contraseña."
      );
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      setError(
        "Error al enviar el correo electrónico de restablecimiento. Inténtalo de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      {loading && (
        <div className="loading-screen">
          <div className="loading-spinner"></div>
        </div>
      )}
      <Container className="reset-password-page-container mt-5">
        <h2 className="reset-password-page-heading">Restablecer Contraseña</h2>
        <Form className="reset-password-page-form" onSubmit={handleSubmit}>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group className="reset-password-page-form-group mb-3">
            <Form.Label className="reset-password-page-form-label">
              Email
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="reset-password-page-form-control"
            />
          </Form.Group>
          <Button type="submit" className="reset-password-page-submit-button">
            Restablecer Contraseña
          </Button>
        </Form>
      </Container>
      <Footer className="reset-password-page-footer" />
    </>
  );
};

export default ResetPasswordPage;