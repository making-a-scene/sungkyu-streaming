import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import MusicBroadcast from './pages/MusicBroadcast';

// Main App Component
function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/music-broadcast" element={<MusicBroadcast />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
