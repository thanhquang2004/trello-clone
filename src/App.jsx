import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useColorScheme,
} from "@mui/material";
import Button from "@mui/material/Button";

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

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  return (
    <Button
      onClick={() => {
        setMode(mode === "dark" ? "light" : "dark");
      }}
    >
      {mode === "dark" ? "Light" : "Dark"} mode
    </Button>
  );
}

function App() {
  return (
    <>
    <ModeSelect />
    <hr />
      <ModeToggle />
      <Button variant="contained">Hello world</Button>
      <Typography variant="h1">Hello world</Typography>
    </>
  );
}

export default App;
