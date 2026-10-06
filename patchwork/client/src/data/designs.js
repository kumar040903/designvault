// Used only when the API is not running, so the app still shows something.
export const categories = ['All', 'Web', 'Mobile', 'Dashboard'];
export const layouts = ['hero', 'cards', 'dashboard', 'split'];
export const licenses = [
  { value: 'remix-with-credit', label: 'Remix with credit' },
  { value: 'view-only', label: 'View only' },
];

export const fallbackDesigns = [
  { id: 1, title: 'Calm Banking Dashboard', author: 'maya', category: 'Dashboard', layout: 'dashboard', colors: ['#EEF2F7', '#1F3A5F', '#4FB286'], tags: ['fintech'], description: 'A quiet dashboard that puts the balance first.', license: 'remix-with-credit', likes: 128, comments: [], remixOf: null, remixCount: 1, createdAt: '2026-09-02' },
  { id: 2, title: 'Sunrise Travel Landing', author: 'lena', category: 'Web', layout: 'hero', colors: ['#FFE8D1', '#5B2A86', '#FF7A59'], tags: ['travel'], description: 'A bold hero with one clear action.', license: 'remix-with-credit', likes: 96, comments: [], remixOf: null, remixCount: 0, createdAt: '2026-09-03' },
  { id: 3, title: 'Pocket Plant Care', author: 'priya', category: 'Mobile', layout: 'cards', colors: ['#E8F3EA', '#2F6B4F', '#F2C94C'], tags: ['plants'], description: 'Watering reminders as friendly cards.', license: 'remix-with-credit', likes: 84, comments: [], remixOf: null, remixCount: 0, createdAt: '2026-09-04' },
];
