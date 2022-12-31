import { BrowserRouter } from "react-router-dom";
import Main from "./routes/Main";
import "./theme/Theme.jsx";
import theme from "./theme/Theme";
import { ThemeProvider } from "@mui/material";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default App;
