import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { Preview } from '../components/DesignCard.jsx';
import RemixModal from '../components/RemixModal.jsx';
import CommentBox from '../components/CommentBox.jsx';

export default function DesignDetails({ user }) {
  const { id } = useParams();
  const nav = useNavigate();
  const [d, setD] = useState(null);
  const [error, setError] = useState('');
  const [remixing, setRemixing] = useState(false);

  useEffect(() => {
    setD(null);
    api(`/designs/${id}`).then(setD).catch((e) => setError(e.message));
  }, [id]);

  if (error) return <section className="section"><p className="error">{error}</p><Link to="/explore">Back to Explore</Link></section>;
  if (!d) return <section className="section"><p className="muted">Loading design...</p></section>;

  async function like() {
    if (!user) return nav('/login');
    const r = await api(`/designs/${d.id}/like`, { method: 'POST', body: { username: user } });
    setD({ ...d, likes: r.likes });
  }

  const canRemix = d.license !== 'view-only';

  return (
    <section className="section">
      <div className="split">
        <Preview colors={d.colors} layout={d.layout} />
        <div>
          <h1>{d.title}</h1>
          <p className="muted">by <Link to={`/profile/${d.author}`}>@{d.author}</Link></p>
          {d.original && <p className="credit">Remixed from <Link to={`/design/${d.original.id}`}>{d.original.title}</Link> by @{d.original.author}</p>}
          <p>{d.description}</p>
          <div className="swatches">{d.colors.map((c) => <span key={c} className="swatch" style={{ background: c }} title={c} />)}</div>
          <p>{d.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</p>
          <div className="row">
            <button className="btn ghost" onClick={like}>Like ({d.likes})</button>
            {canRemix ? (
              <button className="btn" onClick={() => (user ? setRemixing(true) : nav('/login'))}>Remix this design</button>
            ) : (
              <span className="notice">View only: the creator has turned remixing off.</span>
            )}
          </div>
          {d.remixes.length > 0 && (
            <div className="family">
              <h2>Remixes ({d.remixes.length})</h2>
              <ul>{d.remixes.map((r) => <li key={r.id}><Link to={`/design/${r.id}`}>{r.title}</Link> by @{r.author}</li>)}</ul>
            </div>
          )}
        </div>
      </div>
      <CommentBox designId={d.id} comments={d.comments} user={user} onChange={(comments) => setD({ ...d, comments })} />
      {remixing && <RemixModal design={d} user={user} onClose={() => setRemixing(false)} onDone={(r) => nav(`/design/${r.id}`)} />}
    </section>
  );
}
