import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { auth, db } from "../firebase-config";
import { signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "password") {
      setErrors({ ...errors, password: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "El email es requerido";
    if (!form.password) newErrors.password = "La contraseña es requerida";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
        const user = userCredential.user;

        if (!user.emailVerified) {
          setErrors({ email: "Por favor, verifica tu correo electrónico antes de iniciar sesión." });
          await sendEmailVerification(user);
          setLoading(false);
          return;
        }

        // Obtener datos del usuario desde Firestore
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (userData.userType === "Usuario") {
            navigate("/user-profile");
          } else if (userData.userType === "Hotel") {
            navigate("/hotel-profile");
          }
        } else {
          setErrors({ email: "Usuario no encontrado en Firestore" });
        }
      } catch (error) {
        setErrors({ email: "Credenciales inválidas" });
      } finally {
        setLoading(false);
      }
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
      <Container className="login-page-container mt-5">
        <h2 className="login-page-heading">Iniciar Sesión</h2>
        <Form className="login-page-form" onSubmit={handleSubmit}>
          <Form.Group className="login-page-form-group mb-3">
            <Form.Label className="login-page-form-label">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              className="login-page-form-control"
            />
            <Form.Control.Feedback
              type="invalid"
              className="login-page-form-control-feedback"
            >
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="login-page-form-group mb-3">
            <Form.Label className="login-page-form-label">Contraseña</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              className="login-page-form-control"
            />
            <Form.Control.Feedback
              type="invalid"
              className="login-page-form-control-feedback"
            >
              {errors.password}
            </Form.Control.Feedback>
            <Form.Check
              type="checkbox"
              label="Mostrar contraseña"
              onChange={() => setShowPassword(!showPassword)}
              className="login-page-form-check-label"
            />
          </Form.Group>
          <Button type="submit" className="login-page-submit-button">
            Iniciar Sesión
          </Button>
          <Link to="/reset-password" className="login-page-forgot-password">
            ¿Olvidaste tu contraseña?
          </Link>
        </Form>
      </Container>
      <Footer className="login-page-footer" />
    </>
  );
};

export default LoginPage;
