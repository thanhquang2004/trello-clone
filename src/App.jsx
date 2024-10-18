import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useColorScheme,
} from "@mui/material";
import theme from "./theme";

function ModeSelect() {
  const { mode, setMode } = useColorScheme();

  const handleChange = (event) => {
    const selectedMode = event.target.value;
    setMode(selectedMode);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value="light">Light</MenuItem>
        <MenuItem value="dark">Dark</MenuItem>
        <MenuItem value="system">System</MenuItem>
      </Select>
    </FormControl>
  );
}

function App() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
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
      <Box
        sx={{
          backgroundColor: "primary.main",
          width: 1,
          height: (theme) => `calc(100vh - ${theme.trelloCustomizations.appBarHeight} - ${theme.trelloCustomizations.boardBarHeight})`,
          display: "flex",
          alignItems: "center",
        }}
      >
        Board Content
      </Box>
    </Container>
  );
}

export default App;
