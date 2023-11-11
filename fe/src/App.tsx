import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Boilerplate from './Boilerplate';
import NotFound from './NotFound';
import GenerateCode from './GenerateCode';

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
