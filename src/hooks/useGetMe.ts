import axios from "axios";
import { useState } from "react";

const useGetMe = () => {
  const [error, setError] = useState<string>();
  const [data, setData] = useState();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  const getMe = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/getme`,
        config
      );

      setError("");
      setData(response.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
  return { getMe, error, data };
};

export { useGetMe };
