import { useState } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { auth, db } from "../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FaUser, FaBuilding } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/RegisterPage.css";

const RegisterPage = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    telefono: "",
    userType: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    // Clear password field errors if the user starts typing again
    if (e.target.name === "password" || e.target.name === "confirmPassword") {
      setErrors({
        ...errors,
        password: "",
        confirmPassword: "",
      });
    }
  };

  const handleUserTypeChange = (type) => {
    setForm({
      ...form,
      userType: type,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nombre) newErrors.nombre = "El nombre es requerido";
    if (!form.email) newErrors.email = "El email es requerido";
    if (!form.password) newErrors.password = "La contraseña es requerida";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    if (!form.telefono) newErrors.telefono = "El teléfono es requerido";
    if (!/^\d{10}$/.test(form.telefono))
      newErrors.telefono = "El teléfono debe tener 10 dígitos";
    if (!form.userType) newErrors.userType = "Seleccione un tipo de usuario";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          nombre: form.nombre,
          email: form.email,
          telefono: form.telefono,
          userType: form.userType,
        });
        navigate("/login");
      } catch (error) {
        setErrors({
          email: "El email ya está en uso o hay un error en el registro",
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Header />
      <Container className="register-page-container mt-5">
        <h2 className="register-page-heading">Registro</h2>
        <Form className="register-page-form" onSubmit={handleSubmit}>
          <Form.Group className="register-page-form-group mb-3">
            <Form.Label className="register-page-form-label">Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              isInvalid={!!errors.nombre}
              className="register-page-form-control"
            />
            <Form.Control.Feedback
              type="invalid"
              className="register-page-form-control-feedback"
            >
              {errors.nombre}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="register-page-form-group mb-3">
            <Form.Label className="register-page-form-label">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              className="register-page-form-control"
            />
            <Form.Control.Feedback
              type="invalid"
              className="register-page-form-control-feedback"
            >
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="register-page-form-group mb-3">
            <Form.Label className="register-page-form-label">
              Teléfono
            </Form.Label>
            <Form.Control
              type="text"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              isInvalid={!!errors.telefono}
              className="register-page-form-control"
            />
            <Form.Control.Feedback
              type="invalid"
              className="register-page-form-control-feedback"
            >
              {errors.telefono}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="register-page-form-group mb-3">
            <Form.Label className="register-page-form-label">
              Contraseña
            </Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              className="register-page-form-control"
            />
            <Form.Control.Feedback
              type="invalid"
              className="register-page-form-control-feedback"
            >
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="register-page-form-group mb-3">
            <Form.Label className="register-page-form-label">
              Confirmar Contraseña
            </Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              isInvalid={!!errors.confirmPassword}
              className="register-page-form-control"
            />
            <Form.Control.Feedback
              type="invalid"
              className="register-page-form-control-feedback"
            >
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Check
            type="checkbox"
            label="Mostrar contraseñas"
            onChange={() => setShowPassword(!showPassword)}
            className="register-page-form-check-label"
          />
          <div className="user-type-selection">
            <h5 className="user-type-selection-heading">
              Seleccione el tipo de usuario:
            </h5>
            <div className="user-type-options">
              <div
                className={`user-type-option ${
                  form.userType === "Usuario" ? "selected" : ""
                }`}
                onClick={() => handleUserTypeChange("Usuario")}
              >
                <FaUser className="user-type-icon" />
                <span>Usuario</span>
              </div>
              <div
                className={`user-type-option ${
                  form.userType === "Hotel" ? "selected" : ""
                }`}
                onClick={() => handleUserTypeChange("Hotel")}
              >
                <FaBuilding className="user-type-icon" />
                <span>Hotel</span>
              </div>
            </div>
            {errors.userType && (
              <div className="invalid-feedback d-block">{errors.userType}</div>
            )}
          </div>
          <Button
            type="submit"
            className="register-page-submit-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Registrarse"
            )}
          </Button>
        </Form>
      </Container>
      <Footer className="register-page-footer" />
      {isLoading && (
        <div className="loading-screen">
          <div className="loading-spinner"></div>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
