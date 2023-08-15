import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface ErrorResponse {
  error: string; // Define the structure of the error response
}

interface SignupProps {
  username: string;
  email: string;
  password: string;
}
export const useSignup = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signup = async ({ username, email, password }: SignupProps) => {
    setIsLoading(true);
    setError(null);

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signup`,
        { username, email, password },
        { headers },
      );

      const data = response.data;

      if (response.status === 200) {
        navigate("/");
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: "LOGIN", payload: data });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;

        if (axiosError.response) {
          setError(axiosError.response.data.error);
        } else {
          setError("An error occurred while making the request.");
        }
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
