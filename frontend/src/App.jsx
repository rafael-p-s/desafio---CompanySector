import React from "react";
import { BrowserRouter } from "react-router-dom";
import { MainRoutes } from "./routes/index.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <MainRoutes></MainRoutes>
      </BrowserRouter>
    </>
  );
}

export default App;
