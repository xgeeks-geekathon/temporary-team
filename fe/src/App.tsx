import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Boilerplate from './pages/Boilerplate';
import NotFound from './pages/NotFound';
import GenerateCode from './pages/GenerateCode';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boilerplate" element={<Boilerplate />} />
        <Route path="/generate-code" element={<GenerateCode />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
