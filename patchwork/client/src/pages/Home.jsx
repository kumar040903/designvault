import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';
import { fallbackDesigns } from '../data/designs.js';
import DesignCard from '../components/DesignCard.jsx';

export default function Home() {
  const [designs, setDesigns] = useState([]);
  useEffect(() => {
    api('/designs').then(setDesigns).catch(() => setDesigns(fallbackDesigns));
  }, []);

  const trending = designs.slice(0, 4);
  const remixes = designs.filter((d) => d.remixOf).slice(0, 4);

  return (
    <>
      <section className="hero">
        <div>
          <h1>See a design you love. Make it yours, with credit.</h1>
          <p className="lead">Patchwork is where designers and developers share work, remix each other's ideas, and always know where an idea came from.</p>
          <div className="row">
            <Link to="/explore" className="btn">Explore designs</Link>
            <Link to="/upload" className="btn ghost">Share a design</Link>
          </div>
        </div>
        <div className="patch-grid" aria-hidden="true">
          {trending.map((d) => <DesignCard key={d.id} design={d} />)}
        </div>
      </section>

      <section className="band">
        <h2>This week's challenge</h2>
        <p>Redesign a boarding pass so it is readable at a glance. Share your take, then remix someone else's.</p>
      </section>

      <section className="section">
        <h2>Trending now</h2>
        <div className="grid">{trending.map((d) => <DesignCard key={d.id} design={d} />)}</div>
      </section>

      {remixes.length > 0 && (
        <section className="section">
          <h2>Fresh remixes</h2>
          <div className="grid">{remixes.map((d) => <DesignCard key={d.id} design={d} />)}</div>
        </section>
      )}
    </>
  );
}
