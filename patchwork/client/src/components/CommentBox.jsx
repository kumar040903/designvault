import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';

export default function CommentBox({ designId, comments, user, onChange }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      onChange(await api(`/designs/${designId}/comments`, { method: 'POST', body: { author: user, text } }));
      setText('');
      setError('');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="comments">
      <h2>Comments ({comments.length})</h2>
      {comments.length === 0 && <p className="muted">No comments yet. Say what works, or what you would try next.</p>}
      <ul>
        {comments.map((c) => (
          <li key={c.id}>
            <Link to={`/profile/${c.author}`}>@{c.author}</Link>
            <p>{c.text}</p>
          </li>
        ))}
      </ul>
      {user ? (
        <form onSubmit={submit} className="row">
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a comment" aria-label="Add a comment" />
          <button className="btn">Post comment</button>
        </form>
      ) : (
        <p><Link to="/login">Sign in</Link> to comment.</p>
      )}
      {error && <p className="error" role="alert">{error}</p>}
    </section>
  );
}
