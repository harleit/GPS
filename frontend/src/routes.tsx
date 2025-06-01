import { Route, Routes } from "react-router-dom";
import { Layout } from "./App";
import { AboutPage } from "./pages/aboutPage";
import { NewProject } from "./pages/Project/New";
import { NewUser } from "./pages/User/New";
import { ListActivity } from "./pages/ActiviyHub/List";
import { ListProjects } from "./pages/Project/List";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="about" element={<AboutPage />} />
        <Route path="project" element={<ListProjects />} />
        <Route path="project/new" element={<NewProject />} />
        <Route path="activity" element={<ListActivity />} />
      </Route>

      <Route index element={<NewUser />} />
    </Routes>
  );
}
