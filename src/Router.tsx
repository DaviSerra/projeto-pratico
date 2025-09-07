import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout/Layout";
import PersonDetail from "./pages/PersonDetail";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pessoas/:id" element={<PersonDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
