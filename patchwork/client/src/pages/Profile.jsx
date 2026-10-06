import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api.js';
import DesignCard from '../components/DesignCard.jsx';

export default function Profile({ user }) {
  const { username } = useParams();
  const [p, setP] = useState(null);
  const [designs, setDesigns] = useState([]);
  const [error, setError] = useState('');

  const load = () => api(`/users/${username}`).then(setP).catch((e) => setError(e.message));
  useEffect(() => {
    setError('');
    setP(null);
    load();
    api(`/designs?author=${username}`).then(setDesigns).catch(() => {});
  }, [username]);

  async function follow() {
    await api(`/users/${username}/follow`, { method: 'POST', body: { follower: user } });
    load();
  }

  if (error) return <section className="section"><p className="error">{error}</p></section>;
  if (!p) return <section className="section"><p className="muted">Loading profile...</p></section>;
  const mine = user && user.toLowerCase() === p.username.toLowerCase();

  return (
    <section className="section">
      <div className="profile-head">
        <div className="avatar" aria-hidden="true">{p.username[0].toUpperCase()}</div>
        <div>
          <h1>@{p.username}</h1>
          <p className="muted">{p.bio}</p>
          <p className="stats">{p.stats.designs} designs, {p.stats.remixes} remixes, {p.stats.likes} likes, {p.followers} followers</p>
        </div>
        {user && !mine && <button className="btn" onClick={follow}>Follow or unfollow</button>}
      </div>
      <h2>Designs</h2>
      {designs.length === 0 ? <p className="muted">Nothing shared yet.</p> : <div className="grid">{designs.map((d) => <DesignCard key={d.id} design={d} />)}</div>}
    </section>
  );
}
