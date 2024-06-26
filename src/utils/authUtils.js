import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Ajusta la ruta según sea necesario

export const useAuth = () => {
  return useContext(AuthContext);
};
