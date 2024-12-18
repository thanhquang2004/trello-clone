import axios from "axios";
import { API_ROOT } from "~/utils/constant";

export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/board/` + boardId);

  return response.data;
};
