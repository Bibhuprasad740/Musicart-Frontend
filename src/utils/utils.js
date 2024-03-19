import { redirect } from "react-router-dom";

export const getAuthTokenFromLocalStorage = () => {
  const user = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null;

  if (!user) {
    return null;
  }

  return user.token;
};

export const routeProtection = () => {
  const token = getAuthTokenFromLocalStorage();
  if (!token) {
    return redirect("/signin");
  }

  return null;
};
