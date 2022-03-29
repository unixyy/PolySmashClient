import jwt_decode from "jwt-decode";

function Admin() {
  try {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    return decoded.admin;
  } catch (error) {
    return;
  }
}

function getUserEmail() {
  try {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    return decoded.email;
  } catch (error) {
    return;
  }
}

function isConnected() {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export { Admin, getUserEmail, isConnected };
