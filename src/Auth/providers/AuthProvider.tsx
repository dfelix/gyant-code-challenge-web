import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth.service";
import { TokenStorageService } from "../services/token-storage.service";

export const AuthContext = React.createContext<any | null>(null);
const authService = new AuthService();
const tokenStorageService = new TokenStorageService();

const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();

  const signIn = async (
    credentials: {
      username: string;
      password: string;
    },
    pathname = "/"
  ) => {
    authService.login(credentials).then(
      (data) => {
        toast.success("logged-in");
        navigate(pathname);
      },
      (error) => {
        toast.error(
          error?.response?.data.message
            ? error.response.data.message
            : error.message
        );
      }
    );
  };

  const signOut = (pathname = "/auth") => {
    authService.logout();
    toast("signed-out");
    navigate(pathname);
  };

  const isAuthenticated = () => {
    return authService.isLoggedIn();
  };

  const getUser = () => {
    if (!authService.isLoggedIn()) return null;
    return tokenStorageService.getUser();
  };

  const value = {
    isAuthenticated,
    getUser,
    signIn,
    signOut,
  };

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
};
export default AuthProvider;
