import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react"

import Home from './pages/Home';
import MusicBroadcast from './pages/guide/MusicBroadcast';
import Vote from "./pages/guide/Vote";
import IdGeneration from "./pages/guide/IdGeneration";
import MVChart from "./pages/MVChart";
import MusicSharing from "./pages/guide/MusicSharing";
import ShortsSns from "./pages/guide/ShortsSns";
import MusicVideo from "./pages/guide/MusicVideo";
import Radio from "./pages/guide/Radio";
import Coloring from "./pages/guide/Coloring";
import Cheering from "./pages/guide/Cheering";
import BottomNav from "./components/BottomNav";
import Streaming from "./pages/guide/Streaming";
import Download from "./pages/guide/Download";
import Guide from "./pages/Guide";

// Main App Component
function App() {

    return (
        <BrowserRouter>
            <ToastContainer position="top-right" />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/guide" element={<Guide />} />
                <Route path="/guide/id-generation" element={<IdGeneration />} />
                <Route path="/guide/streaming" element={<Streaming />} />
                <Route path="/guide/download" element={<Download />} />
                <Route path="/guide/music-broadcast" element={<MusicBroadcast />} />
                <Route path="/guide/vote" element={<Vote />} />
                <Route path="/guide/music-sharing" element={<MusicSharing />} />
                <Route path="/guide/mv" element={<MusicVideo />} />
                <Route path="/guide/shorts-sns" element={<ShortsSns />} />
                <Route path="/guide/radio" element={<Radio />} />
                <Route path="/guide/coloring" element={<Coloring />} />
                <Route path="/guide/cheering" element={<Cheering />} />
                <Route path="/chart/mv" element={<MVChart />} />
            </Routes>
            <BottomNav />
            <Analytics />
        </BrowserRouter>
    );
}

export default App;
