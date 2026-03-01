import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Referral from './pages/Referral';
import Match from './pages/Match';
import Tables from './pages/Tables';
import Masterminds from './pages/Masterminds';
import Messages from './pages/Messages';
import Subscription from './pages/Subscription';
import { BottomNav } from './components/BottomNav';
import { initTWA } from './lib/twa';

function App() {
  useEffect(() => {
    initTWA();
  }, []);

  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/onboarding" replace />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/match" element={<Match />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/masterminds" element={<Masterminds />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/subscription" element={<Subscription />} />
        </Routes>
        <BottomNav />
      </BrowserRouter>
    </div>
  );
}

export default App;
