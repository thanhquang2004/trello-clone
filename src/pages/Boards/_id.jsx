//Board details
import { Container } from "@mui/material";
import AppBar from "../../components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { mockData } from "~/apis/mock-data";
import { useGetBoardDetail } from "~/hooks/useGetBoardDetail";
import LoadingPage from "~/components/Loader/Loader";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Board() {
  const { id } = useParams();
  const { getBoardDetail, data, isLoading } = useGetBoardDetail(id);

  useEffect(() => {
    console.log(id)
    getBoardDetail();

  }, []);

  // if (isLoading) {
  //   return <LoadingPage />;
  // }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={data} />
      <BoardContent board={data} />
    </Container>
  );
}

export default Board;
