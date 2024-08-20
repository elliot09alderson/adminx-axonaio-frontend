import { useContext } from "react";
import { AuthContext } from "./AuthContext"; // This should be your authentication context
import { useSelector } from "react-redux";

export const useAuth = () => {
 

  return { isAuthenticated, user };
};
