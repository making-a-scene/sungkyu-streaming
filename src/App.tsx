import React, { useState } from 'react';

import Home from './pages/Home';
import MusicBroadcast from './pages/MusicBroadcast';

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');

  const navigateToPage = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <>
      {currentPage === 'home' && <Home onNavigate={navigateToPage} />}
      {currentPage === 'music-broadcast' && <MusicBroadcast onNavigate={navigateToPage} />}
    </>
  );
}

export default App;
