import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";

function App() {
  return (
    // <ThemeProvider theme={theme}>
      // <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results stressLevel={"medium"} />} />
        </Routes>
      </BrowserRouter>
    // </ThemeProvider>
  );
}

export default App;
