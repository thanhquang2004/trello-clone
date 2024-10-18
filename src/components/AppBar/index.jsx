import { Box } from "@mui/material";
import ModeSelect from "../ModeSelect";


function AppBar() {
  return (
    <Box
      sx={{
        backgroundColor: "primary.light",
        width: 1,
        height: (theme) => theme.trelloCustomizations.appBarHeight,
        display: "flex",
        alignItems: "center",
      }}
    >
      <ModeSelect />
    </Box>
  );
}

export default AppBar;
