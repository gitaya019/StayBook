import { useState } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { auth, db } from "../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
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
    telefono: "",
    userType: "",
    acceptedTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    upperCase: false,
    lowerCase: false,
    number: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "password") {
      validatePassword(value);
    }
  };

  const handleUserTypeChange = (type) => {
    setForm({
      ...form,
      userType: type,
    });
  };

  const validatePassword = (password) => {
    setPasswordRequirements({
      length: password.length >= 8,
      upperCase: /[A-Z]/.test(password),
      lowerCase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nombre) newErrors.nombre = "El nombre es requerido";
    if (!form.email) newErrors.email = "El email es requerido";
    if (!form.password) newErrors.password = "La contraseña es requerida";
    if (!form.telefono) newErrors.telefono = "El teléfono es requerido";
    if (!/^\d{10}$/.test(form.telefono))
      newErrors.telefono = "El teléfono debe tener 10 dígitos";
    if (!form.userType) newErrors.userType = "Seleccione un tipo de usuario";
    if (!form.acceptedTerms)
      newErrors.acceptedTerms = "Debe aceptar los términos y políticas";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);

      const q = query(
        collection(db, "users"),
        where("telefono", "==", form.telefono)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setErrors({
          telefono: "El teléfono ya está en uso",
        });
        setIsLoading(false);
        return;
      }

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
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              isInvalid={!!errors.nombre}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombre}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              isInvalid={!!errors.telefono}
            />
            <Form.Control.Feedback type="invalid">
              {errors.telefono}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              onFocus={() => setShowPassword(true)}
              onBlur={() => setShowPassword(false)}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
            {showPassword && (
              <div className="password-requirements">
                <p
                  className={passwordRequirements.length ? "valid" : "invalid"}
                >
                  Mínimo 8 caracteres
                </p>
                <p
                  className={
                    passwordRequirements.upperCase ? "valid" : "invalid"
                  }
                >
                  Una letra mayúscula
                </p>
                <p
                  className={
                    passwordRequirements.lowerCase ? "valid" : "invalid"
                  }
                >
                  Una letra minúscula
                </p>
                <p
                  className={passwordRequirements.number ? "valid" : "invalid"}
                >
                  Un número
                </p>
              </div>
            )}
          </Form.Group>
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
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label={
                <>
                  Acepto los{" "}
                  <Link to="/terms" className="footer-link">
                    Términos y Condiciones
                  </Link>
                  {" "} y {" "}
                  <Link to="/privacy" className="footer-link">
                    Políticas de Privacidad
                  </Link>{" "}
                  de Recer-Habi
                </>
              }
              name="acceptedTerms"
              checked={form.acceptedTerms}
              onChange={handleChange}
              isInvalid={!!errors.acceptedTerms}
            />
            <Form.Control.Feedback type="invalid">
              {errors.acceptedTerms}
            </Form.Control.Feedback>
          </Form.Group>
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
      <Footer />
      {isLoading && (
        <div className="loading-screen">
          <div className="loading-spinner"></div>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
