import { Route, Routes } from "react-router-dom";
import { Layout } from "./App";
import { AboutPage } from "./pages/aboutPage";
import { NewProject } from "./pages/Project/New";
import { NewUser } from "./pages/User/New";
import { ListProjects } from "./pages/Project/List";
import { ListProjectActivity } from "./pages/ProjectActivity/List";
import { EditProject } from "./pages/Project/Edit";
import { EditProjectActivity } from "./pages/ProjectActivity/Edit";
import { EditActivityPage } from "./pages/ProjectActivity/Edit/EditActivityPage";
import { LoginPage } from "./pages/User/Enter";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} /> {/* Add this route */}
      <Route element={<Layout />}>
        <Route path="about" element={<AboutPage />} />
        <Route path="project" element={<ListProjects />} />
        <Route path="project/new" element={<NewProject />} />
        <Route path="project/edit/" element={<EditProject />} />
        <Route path="activity/:titulo" element={<ListProjectActivity />} />
        <Route
          path="activity/:projectTitle/edit/:activityId"
          element={<EditActivityPage />}
        />

      </Route>

      <Route index element={<NewUser />} />
    </Routes>
  );
}
