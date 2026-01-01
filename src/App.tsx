import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from './pages/Home';
import MusicBroadcast from './pages/guide/MusicBroadcast';
import Vote from "./pages/guide/Vote";
import IdGeneration from "./pages/guide/IdGeneration";
import MVChart from "./pages/MVChart";
import MusicSharing from "./pages/guide/MusicSharing";
import ShortsSns from "./pages/guide/ShortsSns";

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
                <Route path="/guide/music-sharing" element={<MusicSharing />} />
                <Route path="/guide/shorts-sns" element={<ShortsSns />} />
                <Route path="/chart/mv" element={<MVChart />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
