import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { categories, layouts, licenses } from '../data/designs.js';
import { Preview } from '../components/DesignCard.jsx';

export default function Upload({ user }) {
  const nav = useNavigate();
  const [f, setF] = useState({ title: '', description: '', category: 'Web', layout: 'hero', colors: ['#F2F4F8', '#5B3FD1', '#FFC857'], tags: '', license: 'remix-with-credit' });
  const [error, setError] = useState('');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const setColor = (i, v) => setF({ ...f, colors: f.colors.map((c, j) => (j === i ? v : c)) });

  if (!user) return <section className="section narrow"><h1>Share a design</h1><p><Link to="/login">Sign in</Link> to share your work.</p></section>;

  async function submit(e) {
    e.preventDefault();
    try {
      const d = await api('/designs', { method: 'POST', body: { ...f, author: user } });
      nav(`/design/${d.id}`);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="section split">
      <form onSubmit={submit} className="form">
        <h1>Share a design</h1>
        <label>Title<input value={f.title} onChange={set('title')} required /></label>
        <label>The idea behind it<textarea rows="3" value={f.description} onChange={set('description')} placeholder="What problem does it solve?" /></label>
        <div className="row">
          <label>Category
            <select value={f.category} onChange={set('category')}>{categories.filter((c) => c !== 'All').map((c) => <option key={c}>{c}</option>)}</select>
          </label>
          <label>Layout
            <select value={f.layout} onChange={set('layout')}>{layouts.map((l) => <option key={l}>{l}</option>)}</select>
          </label>
        </div>
        <fieldset>
          <legend>Palette</legend>
          <div className="swatches">{f.colors.map((c, i) => <input key={i} type="color" value={c} onChange={(e) => setColor(i, e.target.value)} aria-label={`Colour ${i + 1}`} />)}</div>
        </fieldset>
        <label>Tags (comma separated)<input value={f.tags} onChange={set('tags')} placeholder="fintech, calm, mobile" /></label>
        <label>Who can remix it?
          <select value={f.license} onChange={set('license')}>{licenses.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}</select>
        </label>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="btn">Publish design</button>
      </form>
      <div>
        <h2>Preview</h2>
        <Preview colors={f.colors} layout={f.layout} />
      </div>
    </section>
  );
}
