import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Explore from './pages/Explore.jsx';
import Upload from './pages/Upload.jsx';
import DesignDetails from './pages/DesignDetails.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';

export default function App() {
  const [user, setUser] = useState(() => localStorage.getItem('patchwork-user'));
  const signIn = (name) => {
    if (name) localStorage.setItem('patchwork-user', name);
    else localStorage.removeItem('patchwork-user');
    setUser(name);
  };

  return (
    <>
      <Navbar user={user} onSignOut={() => signIn(null)} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/upload" element={<Upload user={user} />} />
          <Route path="/design/:id" element={<DesignDetails user={user} />} />
          <Route path="/profile/:username" element={<Profile user={user} />} />
          <Route path="/login" element={<Login onSignIn={signIn} />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
