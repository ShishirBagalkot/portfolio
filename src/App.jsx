import "./App.css";
import { About, Footer, Home, Projects, Skills } from './sections';
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
      <About />
      <Projects />
      <Skills />
      <Footer />
    </>
  );
}

export default App;