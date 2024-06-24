// src/pages/UserProfile.js
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db, auth } from '../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        }
      }
    };

    fetchProfileData();
  }, [currentUser]);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  return (
    <Container className="profile-page-container mt-5">
      {profileData && (
        <>
          <h2>Bienvenido, {profileData.nombre}</h2>
          <p>Email: {profileData.email}</p>
          <p>Teléfono: {profileData.telefono}</p>
          <Button onClick={handleLogout}>Cerrar sesión</Button>
        </>
      )}
    </Container>
  );
};

export default UserProfile;

