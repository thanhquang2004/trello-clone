import { Box } from "@mui/material";

function BoardContent() {
  return (
    <Box
      sx={{
        width: 1,
        height: (theme) =>
          `calc(100vh - ${theme.trelloCustomizations.appBarHeight} - ${theme.trelloCustomizations.boardBarHeight})`,
        display: "flex",
        alignItems: "center",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#dark" : "#1976d2",
      }}
    >
      Board Content
    </Box>
  );
}

export default BoardContent;
