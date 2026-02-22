import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SoundProvider } from "./contexts/SoundContext";
import Navbar from "./components/Navbar";
import GlobalProgressBar from "./components/GlobalProgressBar";
import SoundToggle from "./components/SoundToggle";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import TimelineSection from "./components/TimelineSection";
import CompetitionsGrid from "./components/CompetitionsGrid";
import GalleryPreview from "./components/GalleryPreview";
import CampusMap from "./components/CampusMap";
import RegistrationSection from "./components/RegistrationSection";
import Footer from "./components/Footer";
import TeamPage from "./pages/TeamPage";
import EventsPage from "./pages/EventsPage";
import GalleryPage from './pages/GalleryPage';
import ClubsPage from './pages/ClubsPage';
import AboutPage from './pages/AboutPage';
const Home = () => {
  return (
    <div className="bg-[#050505] min-h-screen">
      <GlobalProgressBar />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <CompetitionsGrid />
      <GalleryPreview />
      <CampusMap />
      <RegistrationSection />
      <Footer />
      <SoundToggle />
    </div>
  );
};

function App() {
  return (
    <SoundProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </SoundProvider>
  );
}

export default App;
