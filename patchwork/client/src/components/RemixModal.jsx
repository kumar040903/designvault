import { useState } from 'react';
import { api } from '../api.js';

export default function RemixModal({ design, user, onClose, onDone }) {
  const [title, setTitle] = useState(`Remix of ${design.title}`);
  const [note, setNote] = useState('');
  const [colors, setColors] = useState(design.colors);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const setColor = (i, v) => setColors(colors.map((c, j) => (j === i ? v : c)));

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      const remix = await api(`/designs/${design.id}/remix`, { method: 'POST', body: { author: user, title, note, colors } });
      onDone(remix);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="Remix this design" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <h2>Remix "{design.title}"</h2>
        <p className="muted">Credit to @{design.author} is added automatically.</p>
        <label>Title<input value={title} onChange={(e) => setTitle(e.target.value)} required /></label>
        <label>What did you change?<textarea value={note} onChange={(e) => setNote(e.target.value)} rows="3" placeholder="Warmer palette, larger buttons..." /></label>
        <fieldset>
          <legend>Palette</legend>
          <div className="swatches">
            {colors.map((c, i) => (
              <input key={i} type="color" value={c} onChange={(e) => setColor(i, e.target.value)} aria-label={`Colour ${i + 1}`} />
            ))}
          </div>
        </fieldset>
        {error && <p className="error" role="alert">{error}</p>}
        <div className="row">
          <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn" disabled={busy}>{busy ? 'Publishing...' : 'Publish remix'}</button>
        </div>
      </form>
    </div>
  );
}
