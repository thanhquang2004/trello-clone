/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import Card from "./Card/Card";

function ListCards({ cards }) {
  return (
    <Box
      sx={{
        p: "0 5px",
        m: "0 5px",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        overflowY: "auto",
        overflowX: "hidden",
        maxHeight: (theme) => `calc(${
          theme.trelloCustomizations.boardContentHeight
        } - ${theme.spacing(5)}
        - ${theme.trelloCustomizations.columnHeaderHeight} - ${
          theme.trelloCustomizations.columnFooterHeight
        }
        )`,
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ced0da",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#bfc2df",
          borderRadius: "4px",
        },
      }}
    >
      {cards?.map((card) => (
        <Card key={card?._id} card={card} />
      ))}
    </Box>
  );
}

export default ListCards;
