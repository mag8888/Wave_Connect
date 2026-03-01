import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
import { initTWA, tg } from './lib/twa';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    initTWA();

    const fetchInit = async () => {
      try {
        if (tg.initDataUnsafe?.user) {
          const res = await fetch('https://wave-match-production.up.railway.app/api/users/init', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user: tg.initDataUnsafe.user,
              startParam: tg.initDataUnsafe.start_param
            })
          });
          const data = await res.json();
          if (data?.user?.profile) {
            setHasProfile(true);
          }
        }
      } catch (e) {
        console.error('Failed to init user:', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInit();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0A0A0B] text-white">
        <div className="animate-pulse text-gradient font-bold text-xl">Wave Match</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={hasProfile ? "/home" : "/onboarding"} replace />} />
          <Route path="/onboarding" element={hasProfile ? <Navigate to="/home" replace /> : <Onboarding />} />
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
