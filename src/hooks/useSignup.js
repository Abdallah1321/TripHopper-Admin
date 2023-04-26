import { useState } from "react";
import axios from "axios"
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/config";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate()

  const signup = async (username, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BASE_URL}auth/register`, { username, email, password }, {
        headers: {'Content-Type': 'application/json'}
      });

      const user = response.data;

      if (!response.status === 200) {
        throw new Error(user.error);
      }

      // save user to local storage
      localStorage.setItem("user", JSON.stringify(user));

      //update auth context
      dispatch({ type: "LOGIN", payload: user });

      setIsLoading(false);
      navigate("/")
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};