# Patchwork

A working prototype of a design inspiration and remixing community. React front end, Node.js + Express back end, **no database**: all data lives in memory and resets when the server restarts.

## Run it

```bash
npm run install-all   # installs server and client packages
npm run dev           # API on :5000, app on :5173
```
Open http://localhost:5173. Sign in with any username (no password in this prototype).

## What works
- **Share:** upload a design (title, palette, layout, tags, reuse licence)
- **Remix:** one click creates your own version; credit to the original is added automatically
- **Reuse licences:** "view only" designs cannot be remixed
- **Community:** likes, comments, profiles, follow
- **Discover:** trending, new, most remixed; search and category filters

## Structure
- `client/` React (Vite). `src/api.js` is the small fetch helper. If the API is offline, the app falls back to `src/data/designs.js`.
- `server/` Express API: `routes` -> `controllers` -> in-memory `data`.

## API
| Method | Path | Purpose |
|---|---|---|
| GET | /api/designs | list (`q`, `category`, `sort`, `author`) |
| GET | /api/designs/:id | one design with remix family |
| POST | /api/designs | share a design |
| POST | /api/designs/:id/like | like |
| POST | /api/designs/:id/comments | comment |
| POST | /api/designs/:id/remix | remix with credit |
| POST | /api/users/login | sign in or create user |
| GET | /api/users/:username | profile and stats |
| POST | /api/users/:username/follow | follow or unfollow |

## Next steps
Real database, passwords/sessions, image upload, Figma plugin, moderation tools.
