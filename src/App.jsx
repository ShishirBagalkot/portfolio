import "./App.css";
import { Experience, Footer, Home, Projects, Skills } from './sections';
import GlyphField from './common/GlyphField';
import Cursor from './common/Cursor';
import SectionNav from './common/SectionNav';

function App() {
  return (
    <>
      <GlyphField />
      <Cursor />
      <SectionNav />
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