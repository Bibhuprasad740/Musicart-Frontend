import { redirect } from "react-router-dom";

export const getAuthTokenFromLocalStorage = () => {
  const auth = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null;

  if (!auth) {
    return null;
  }

  return auth.token;
};

export const routeProtection = () => {
  const token = getAuthTokenFromLocalStorage();
  if (!token) {
    return redirect("/signin");
  }

  return null;
};

export const authProtection = () => {
  const token = getAuthTokenFromLocalStorage();
  if (token) {
    return redirect("/");
  }

  return null;
};
