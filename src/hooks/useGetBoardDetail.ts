import axios from "axios";
import { useState } from "react";

const useGetBoardDetail = (id) => {
  const [error, setError] = useState<string>();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);


  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  const getBoardDetail = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/boards/${id}`,
        config
      );

      setError("");
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
  return { getBoardDetail, error, data, isLoading };
};

export { useGetBoardDetail };
