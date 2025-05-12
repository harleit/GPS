import { Route, Routes } from "react-router-dom";
import { Layout } from "./App";
import { AboutPage } from "./pages/aboutPage";
import { NewProject } from "./pages/Project/New";
import { NewUser } from "./pages/User/New";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="about" element={<AboutPage />} />
        <Route path="project/new" element={<NewProject />} />
      </Route>

      <Route index element={<NewUser />} />
    </Routes>
  );
}
