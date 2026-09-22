import "./App.css";
import { Experience, Footer, Home, Projects, Skills } from './sections';
import GlyphField from './common/GlyphField';
import Cursor from './common/Cursor';
import SectionNav from './common/SectionNav';
import CelestialToggle from './common/CelestialToggle';

function App() {
  return (
    <>
      <GlyphField />
      <Cursor />
      <SectionNav />
      <CelestialToggle />
      <Home />
      {/* About section hidden for now — see src/sections/about */}
      <Experience />
      <Projects />
      <Skills />
      <Footer />
    </>
  );
}

export default App;