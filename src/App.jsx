import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";

function App() {
  return (
    <>
      <Router></Router>
    </>
  );
}

const Router = () => {
  return <RouterProvider router={router} />;
};

export default App;
