const users = require('../data/users');
const designs = require('../data/designs');

const find = (name) => users.find((u) => u.username.toLowerCase() === String(name).toLowerCase());

exports.login = (req, res) => {
  const username = String(req.body.username || '').trim();
  if (!/^[a-z0-9_]{3,20}$/i.test(username)) {
    return res.status(400).json({ error: 'Use 3 to 20 letters, numbers or underscores.' });
  }
  let user = find(username);
  if (!user) {
    user = { username, bio: 'New to Patchwork.', following: [], joined: new Date().toISOString() };
    users.push(user);
  }
  res.json({ username: user.username });
};

exports.profile = (req, res) => {
  const user = find(req.params.username);
  if (!user) return res.status(404).json({ error: 'Member not found' });
  const mine = designs.filter((d) => d.author === user.username);
  res.json({
    ...user,
    followers: users.filter((u) => u.following.includes(user.username)).length,
    stats: {
      designs: mine.length,
      remixes: mine.filter((d) => d.remixOf).length,
      likes: mine.reduce((n, d) => n + d.likes, 0),
    },
  });
};

exports.follow = (req, res) => {
  const target = find(req.params.username);
  const me = find(req.body.follower);
  if (!target || !me) return res.status(404).json({ error: 'Member not found' });
  if (me === target) return res.status(400).json({ error: "You can't follow yourself." });
  const i = me.following.indexOf(target.username);
  if (i === -1) me.following.push(target.username);
  else me.following.splice(i, 1);
  res.json({ following: i === -1 });
};
