import { NavLink, Link } from 'react-router-dom';

export default function Navbar({ user, onSignOut }) {
  return (
    <header className="nav">
      <Link to="/" className="logo">Patchwork</Link>
      <nav aria-label="Main">
        <NavLink to="/explore">Explore</NavLink>
        <NavLink to="/upload">Share a design</NavLink>
      </nav>
      <div className="nav-user">
        {user ? (
          <>
            <Link to={`/profile/${user}`}>@{user}</Link>
            <button className="btn ghost" onClick={onSignOut}>Sign out</button>
          </>
        ) : (
          <Link to="/login" className="btn">Sign in</Link>
        )}
      </div>
    </header>
  );
}
