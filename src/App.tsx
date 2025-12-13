import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import MusicBroadcast from './pages/MusicBroadcast';
import Vote from "./pages/Vote";

// Main App Component
function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/guide/music-broadcast" element={<MusicBroadcast />} />
                <Route path="/guide/vote" element={<Vote />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
