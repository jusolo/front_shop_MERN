import jwt from "jsonwebtoken";

const isTokenValid = (token) => {
  try {
    const decodedToken = jwt.decode(token);
    // Verificar si el token está presente y no ha expirado
    return decodedToken && decodedToken.exp * 1000 > Date.now();
  } catch (error) {
    // Si hay un error al decodificar el token, consideramos que no es válido
    return false;
  }
};

export default isTokenValid;
