import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { categories, fallbackDesigns } from '../data/designs.js';
import DesignCard from '../components/DesignCard.jsx';

export default function Explore() {
  const [designs, setDesigns] = useState([]);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('trending');
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    api('/designs').then(setDesigns).catch(() => { setOffline(true); setDesigns(fallbackDesigns); });
  }, []);

  const sorters = {
    trending: (a, b) => b.likes - a.likes,
    new: (a, b) => b.createdAt.localeCompare(a.createdAt),
    remixed: (a, b) => (b.remixCount || 0) - (a.remixCount || 0),
  };
  const shown = designs
    .filter((d) => (category === 'All' || d.category === category) && `${d.title} ${d.description} ${d.tags.join(' ')}`.toLowerCase().includes(q.toLowerCase()))
    .sort(sorters[sort]);

  return (
    <section className="section">
      <h1>Explore</h1>
      {offline && <p className="notice">The server is not running, so you are seeing sample designs.</p>}
      <div className="filters">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by title, tag or idea" aria-label="Search designs" />
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort designs">
          <option value="trending">Trending</option>
          <option value="new">Newest</option>
          <option value="remixed">Most remixed</option>
        </select>
      </div>
      <div className="chips">
        {categories.map((c) => (
          <button key={c} className={`chip ${c === category ? 'on' : ''}`} onClick={() => setCategory(c)}>{c}</button>
        ))}
      </div>
      {shown.length === 0 ? <p className="muted">No designs match. Clear the search or share one yourself.</p> : <div className="grid">{shown.map((d) => <DesignCard key={d.id} design={d} />)}</div>}
    </section>
  );
}
