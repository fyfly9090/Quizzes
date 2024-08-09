
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import Kanbas from "./Kanbas"

function App() {
  return (
    <HashRouter>
      <div className="h-100">
        <Routes>
          <Route path="/" element={<Navigate to="Kanbas" />} />
          <Route path="/Kanbas/*" element={<Kanbas />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
