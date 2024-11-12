import { Box } from "@mui/material";
import ListColumns from "./ListColumns/ListColumns";

function BoardContent() {
  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.trelloCustomizations.boardContentHeight,
        display: "flex",
        // alignItems: "center",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
        p: "10px 0",
      }}
    >
      <ListColumns />
    </Box>
  );
}

export default BoardContent;
