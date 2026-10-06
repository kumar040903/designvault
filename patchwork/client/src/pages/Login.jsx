import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api.js';

export default function Login({ onSignIn }) {
  const nav = useNavigate();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      const u = await api('/users/login', { method: 'POST', body: { username } });
      onSignIn(u.username);
      nav('/explore');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="section narrow">
      <h1>Sign in</h1>
      <p className="muted">Prototype: pick any username. Try maya, arjun or lena to see existing profiles.</p>
      <form onSubmit={submit} className="form">
        <label>Username<input value={username} onChange={(e) => setUsername(e.target.value)} autoFocus required /></label>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="btn">Continue</button>
      </form>
    </section>
  );
}
