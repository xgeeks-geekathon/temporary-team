import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Boilerplate from './Boilerplate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boilerplate" element={<Boilerplate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
