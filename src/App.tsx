import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from './pages/Home';
import MusicBroadcast from './pages/guide/MusicBroadcast';
import Vote from "./pages/guide/Vote";
import IdGeneration from "./pages/guide/IdGeneration";

// Main App Component
function App() {

    return (
        <BrowserRouter>
            <ToastContainer position="top-right" />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/guide/id-generation" element={<IdGeneration />} />
                <Route path="/guide/music-broadcast" element={<MusicBroadcast />} />
                <Route path="/guide/vote" element={<Vote />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
