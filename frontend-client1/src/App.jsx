import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ProfileSection from "./components/ProfileSection";
import SkillsSection from "./components/SkillsSection";
import Collaborations from "./components/Collaborations";
import ProjectTeaser from "./components/ProjectTeaser";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import ProjectsPage from "./pages/ProjectsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <HeroSection />
              <ProfileSection />
              <SkillsSection />
              <Collaborations />
              <ProjectTeaser />
              <ContactForm />
              <Footer />
            </>
          }
        />

        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
