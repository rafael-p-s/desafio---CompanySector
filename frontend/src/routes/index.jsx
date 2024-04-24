import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/home/index.jsx";
import { CadCompany } from "../pages/cadcompany/index.jsx";
import { CadSector } from "../pages/cadsector/index.jsx";
import { EditCompany } from "../pages/editcompany/index.jsx";

export const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/cadcompany" element={<CadCompany />} />
    <Route path="/cadsector" element={<CadSector />} />
    <Route path="/editcompany" element={<EditCompany />} />
  </Routes>
);
