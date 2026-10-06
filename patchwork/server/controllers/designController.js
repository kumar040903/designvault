const designs = require('../data/designs');

const remixCount = (d) => designs.filter((x) => x.remixOf === d.id).length;
const withCounts = (d) => ({ ...d, remixCount: remixCount(d) });
const find = (id) => designs.find((d) => d.id === Number(id));
const clean = (s = '') => String(s).trim();
const validColors = (c) => Array.isArray(c) && c.length === 3 && c.every((x) => /^#[0-9a-f]{6}$/i.test(x));
const nextId = () => Math.max(0, ...designs.map((d) => d.id)) + 1;

exports.list = (req, res) => {
  const { q = '', category, sort = 'trending', author } = req.query;
  const term = q.toLowerCase();
  let out = designs.filter(
    (d) =>
      (!category || category === 'All' || d.category === category) &&
      (!author || d.author === author) &&
      `${d.title} ${d.description} ${d.tags.join(' ')}`.toLowerCase().includes(term)
  );
  const sorters = {
    new: (a, b) => b.createdAt.localeCompare(a.createdAt),
    remixed: (a, b) => remixCount(b) - remixCount(a),
    trending: (a, b) => b.likes - a.likes,
  };
  out = [...out].sort(sorters[sort] || sorters.trending);
  res.json(out.map(withCounts));
};

exports.get = (req, res) => {
  const d = find(req.params.id);
  if (!d) return res.status(404).json({ error: 'Design not found' });
  const original = d.remixOf ? find(d.remixOf) : null;
  res.json({
    ...withCounts(d),
    original: original && { id: original.id, title: original.title, author: original.author },
    remixes: designs.filter((x) => x.remixOf === d.id).map((x) => ({ id: x.id, title: x.title, author: x.author })),
  });
};

exports.create = (req, res) => {
  const { title, description, category, layout, colors, tags, license, author } = req.body;
  if (!clean(title) || !clean(author)) return res.status(400).json({ error: 'Add a title and sign in to share a design.' });
  if (!validColors(colors)) return res.status(400).json({ error: 'Choose three valid colours.' });
  const design = {
    id: nextId(),
    title: clean(title),
    author: clean(author),
    description: clean(description),
    category: category || 'Web',
    layout: layout || 'hero',
    colors,
    tags: String(tags || '').split(',').map((t) => t.trim().toLowerCase()).filter(Boolean).slice(0, 5),
    license: license || 'remix-with-credit',
    baseLikes: 0,
    likes: 0,
    likedBy: [],
    comments: [],
    remixOf: null,
    createdAt: new Date().toISOString(),
  };
  designs.unshift(design);
  res.status(201).json(withCounts(design));
};

exports.like = (req, res) => {
  const d = find(req.params.id);
  const user = clean(req.body.username);
  if (!d) return res.status(404).json({ error: 'Design not found' });
  if (!user) return res.status(400).json({ error: 'Sign in to like designs.' });
  const i = d.likedBy.indexOf(user);
  if (i === -1) d.likedBy.push(user);
  else d.likedBy.splice(i, 1);
  d.likes = d.likedBy.length + (d.baseLikes || 0);
  res.json({ likes: d.likes, liked: i === -1 });
};

exports.comment = (req, res) => {
  const d = find(req.params.id);
  if (!d) return res.status(404).json({ error: 'Design not found' });
  const text = clean(req.body.text);
  const author = clean(req.body.author);
  if (!author) return res.status(400).json({ error: 'Sign in to comment.' });
  if (!text) return res.status(400).json({ error: 'Write a comment first.' });
  d.comments.push({ id: Date.now(), author, text, createdAt: new Date().toISOString() });
  res.status(201).json(d.comments);
};

exports.remix = (req, res) => {
  const original = find(req.params.id);
  if (!original) return res.status(404).json({ error: 'Design not found' });
  const { author, title, note, colors } = req.body;
  if (!clean(author)) return res.status(400).json({ error: 'Sign in to remix designs.' });
  if (original.license === 'view-only') return res.status(403).json({ error: 'The creator has set this design to view only.' });
  if (colors && !validColors(colors)) return res.status(400).json({ error: 'Choose three valid colours.' });
  const remix = {
    ...original,
    id: nextId(),
    title: clean(title) || `Remix of ${original.title}`,
    author: clean(author),
    description: clean(note) || `A remix of "${original.title}" by ${original.author}.`,
    colors: colors || original.colors,
    likes: 0,
    baseLikes: 0,
    likedBy: [],
    comments: [],
    remixOf: original.id, // credit is attached automatically
    createdAt: new Date().toISOString(),
  };
  designs.unshift(remix);
  res.status(201).json(withCounts(remix));
};
