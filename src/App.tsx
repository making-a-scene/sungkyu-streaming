import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import Home from './pages/Home';
import MusicBroadcast from './pages/guide/MusicBroadcast';
import Vote from "./pages/guide/Vote";
import IdGeneration from "./pages/guide/IdGeneration";
import Chart from "./pages/Chart";
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
import Event from "./pages/Event";
import LvMain from "./pages/LV/LvMain";
import LvFanEventKo from "./pages/LV/LvFanEventKo";
import LvFanEventEn from "./pages/LV/LvFanEventEn";
import LvFanEventCh from "./pages/LV/LvFanEventCh";
import LvFanEventJa from "./pages/LV/LvFanEventJa";
import Admin from "./pages/Admin";
import TourMemoryForm from "./pages/event/TourMemoryForm";
import MessageForm from "./pages/event/MessageForm";

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
                <Route path="/chart" element={<Chart />} />
                <Route path="/event" element={<Event />}/>
                <Route path="/lv4" element={<LvMain />}/>
                <Route path="/lv4-ko" element={<LvFanEventKo />}/>
                <Route path="/lv4-en" element={<LvFanEventEn />}/>
                <Route path="/lv4-ch" element={<LvFanEventCh />}/>
                <Route path="/lv4-ja" element={<LvFanEventJa />}/>
                <Route path="/admin" element={<Admin />}/>
                <Route path="/event/memory" element={<TourMemoryForm />}/>
                <Route path="/event/message" element={<MessageForm />}/>
            </Routes>
            <BottomNav />
            <Analytics />
            <SpeedInsights />
        </BrowserRouter>
    );
}

export default App;
