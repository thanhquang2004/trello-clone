import { Box } from "@mui/material";

function BoardContent() {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        width: 1,
        height: (theme) =>
          `calc(100vh - ${theme.trelloCustomizations.appBarHeight} - ${theme.trelloCustomizations.boardBarHeight})`,
        display: "flex",
        alignItems: "center",
      }}
    >
      Board Content
    </Box>
  );
}

export default BoardContent;
