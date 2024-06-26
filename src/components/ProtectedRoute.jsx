import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/authUtils";
import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";

const ProtectedRoute = ({ children, userType }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkUserType = async () => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (userData.userType === userType) {
            setAuthorized(true);
          } else {
            setAuthorized(false);
          }
        }
      }
      setLoading(false);
    };

    checkUserType();
  }, [currentUser, userType]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (!authorized) {
    return <Navigate to={userType === "Usuario" ? "/user-profile" : "/hotel-profile"} />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  userType: PropTypes.string.isRequired,
};

export default ProtectedRoute;
