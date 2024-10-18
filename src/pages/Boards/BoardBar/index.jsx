import { Box } from "@mui/material";

function BoardBar() {
  return (
    <Box
      sx={{
        backgroundColor: "primary.dark",
        width: 1,
        height: (theme) => theme.trelloCustomizations.boardBarHeight,
        display: "flex",
        alignItems: "center",
      }}
    >
      Board Bar
    </Box>
  );
}

export default BoardBar;
