import axios from "axios";
import { useState } from "react";

interface LoginRequest {
  email: string;
  password: string;
  name: string;
  dob: string;
  gender: string;
  location: string;
  occupation: string;
}

const useRegister = () => {
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const register = async (request: LoginRequest) => {
    try {
      console.log(request);
      setIsLoading(true);
      const res = await axios.post(
        `http://localhost:8080/api/auth/register`,
        request,
        config
      );
      console.log(res);
      setError("");
      setIsLoading(false);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
  return { register, error, isLoading };
};

export { useRegister };
