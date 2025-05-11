import { Route, Routes } from 'react-router-dom';
import { Layout } from './App';
import { HomePage } from './pages/homePage';
import { AboutPage } from './pages/aboutPage';
import { NewProject } from './pages/Project/New';
import { NewUser } from './pages/User/New';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} /> {/* Página inicial */}
        <Route path="about" element={<AboutPage />} />
        <Route path="project/new" element={<NewProject/>}/>
        <Route path = "user/new" element = {<NewUser/>}/>
      </Route>
    </Routes>
  );
}