const mk = (id, title, author, category, layout, colors, tags, description, baseLikes, day, extra = {}) => ({
  id, title, author, category, layout, colors, tags, description,
  license: 'remix-with-credit', baseLikes, likes: baseLikes, likedBy: [],
  comments: [], remixOf: null, createdAt: `2026-09-${String(day).padStart(2, '0')}T10:00:00.000Z`, ...extra,
});

module.exports = [
  mk(1, 'Calm Banking Dashboard', 'maya', 'Dashboard', 'dashboard', ['#EEF2F7', '#1F3A5F', '#4FB286'], ['fintech', 'calm', 'data'], 'A quiet dashboard that puts the balance first and hides everything else until needed.', 128, 2, {
    comments: [{ id: 1, author: 'arjun', text: 'The spacing between the chart and totals is perfect.', createdAt: '2026-09-03T09:00:00.000Z' }],
  }),
  mk(2, 'Sunrise Travel Landing', 'lena', 'Web', 'hero', ['#FFE8D1', '#5B2A86', '#FF7A59'], ['travel', 'warm', 'landing'], 'A bold hero with one clear action: pick a place and go.', 96, 3),
  mk(3, 'Pocket Plant Care', 'priya', 'Mobile', 'cards', ['#E8F3EA', '#2F6B4F', '#F2C94C'], ['plants', 'mobile', 'cards'], 'Watering reminders shown as friendly cards you can swipe away.', 84, 4),
  mk(4, 'Split Pricing Page', 'arjun', 'Web', 'split', ['#14213D', '#FCA311', '#E5E5E5'], ['pricing', 'contrast'], 'Two plans side by side with a strong visual difference.', 61, 5, { license: 'view-only' }),
  mk(5, 'Night Mode Music Player', 'lena', 'Mobile', 'hero', ['#1B1B2F', '#E94560', '#533483'], ['music', 'dark', 'mobile'], 'A dark player screen where album colours drive the whole palette.', 143, 6),
  mk(6, 'Clinic Booking Flow', 'tomas', 'Mobile', 'cards', ['#E6F4F7', '#0F6E84', '#FF9F68'], ['health', 'booking', 'accessible'], 'Three large cards guide patients from symptom to appointment.', 52, 7),
  mk(7, 'Studio Portfolio', 'maya', 'Web', 'split', ['#F5F0FF', '#3B2A7A', '#B8A1FF'], ['portfolio', 'minimal'], 'A split layout that lets work sit next to the story behind it.', 77, 8),
  mk(8, 'Calm Dashboard, Warm Edition', 'priya', 'Dashboard', 'dashboard', ['#FFF4E6', '#7A3E1D', '#E9A23B'], ['fintech', 'warm', 'remix'], 'Same quiet structure, with a warmer palette for a younger audience.', 39, 9, {
    remixOf: 1,
  }),
];
