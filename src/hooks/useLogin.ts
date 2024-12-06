import axios from "axios";
import { useState } from "react";

interface LoginRequest {
  email: string;
  password: string;
}

const useLogin = () => {
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const login = async (request: LoginRequest) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `http://localhost:8080/api/auth/login`,
        request,
        config
      );

      setError("");

      setData(response.data);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      setIsLoading(false);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
  return { login, error, data, isLoading };
};

export { useLogin };
