const IG = 'https://www.instagram.com/witty.fig';
const HEART = ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'];

// Ticket palettes: [paper, paper 2, accent, ink]. Add your own here.
const PALETTES = [
  { name: 'Peach fizz',     c: ['#FFD9C7', '#FFB5C5', '#E8505B', '#3B2A35'] },
  { name: 'Matcha milk',    c: ['#E4EFD0', '#BFDDB0', '#3F7D58', '#23362B'] },
  { name: 'Blueberry soda', c: ['#D6E4FF', '#B8B6F5', '#5B4FD1', '#1E1B4B'] },
  { name: 'Butter toast',   c: ['#FFF1B8', '#FFD27A', '#D9730D', '#3D2A14'] },
  { name: 'Lilac dream',    c: ['#EBDDFB', '#F7B7E0', '#A23CB5', '#331A40'] },
  { name: 'Sea glass',      c: ['#D3F2EE', '#9ADBD6', '#0E7C86', '#12333A'] },
  { name: 'Tomato soup',    c: ['#FF7A5C', '#FFB36B', '#FFF6E6', '#3A1410'] },
  { name: 'Midnight ink',   c: ['#1F2347', '#4B3A8C', '#FFC857', '#FFF4E0'] }
];

const STYLES = {
  coupon:    { name: 'Coupon',         W: 900, H: 380, R: 14 },
  stub:      { name: 'Concert',        W: 960, H: 400, R: 22 },
  boarding:  { name: 'Boarding pass',  W: 960, H: 400, R: 26 },
  golden:    { name: 'Golden',         W: 900, H: 630, R: 26 },
  cinema:    { name: 'Cinema',         W: 900, H: 380, R: 18 },
  admit:     { name: 'Admit one',      W: 600, H: 840, R: 24 },
  train:     { name: 'Train',          W: 460, H: 900, R: 20 },
  backstage: { name: 'Backstage pass', W: 440, H: 940, R: 22 },
  receipt:   { name: 'Receipt',        W: 480, H: 920, R: 0 },
  scratch:   { name: 'Scratch card',   W: 720, H: 480, R: 20 },
  parking:   { name: 'Parking ticket', W: 900, H: 380, R: 8 }
};

const COPY = {
  coupon:    { kicker: 'Good for',        title: 'One Free Hug',   sub: 'redeemable any time, no questions asked',  date: 'Valid forever',     place: 'Any time zone',      seat: 'No expiry',      tag: 'Non-negotiable' },
  backstage: { kicker: 'All access',      title: 'Backstage',      sub: 'you are on the list (probably)',           date: 'Tonight',           place: 'Stage door',         seat: 'Crew',           tag: 'Irrevocable' },
  receipt:   { kicker: 'Thank you',       title: 'Moon Cafe',      sub: 'one oat latte and a very long nap',        date: '3 Sept, 9:41 am',   place: 'Counter 2',          seat: 'Table 5',        tag: 'Indefinite validity' },
  scratch:   { kicker: 'Scratch and win', title: 'Mega Luck',      sub: 'you win a perfectly ordinary Tuesday',     date: 'Draw on Friday',    place: 'Lucky corner shop',  seat: 'Prize: snacks',  tag: 'Unconditional' },
  parking:   { kicker: 'Notice of fine',  title: 'Too Cute',       sub: 'parked in a no-adorable zone',             date: 'Today, 4:20 pm',    place: 'Bay 7',              seat: 'Fine: one hug',  tag: 'Non-negotiable' },
  stub:     { kicker: 'Live in concert',   title: 'Midnight Picnic', sub: 'an evening of soft guitars and fairy lights', date: 'Sat 14 June, 7:30 pm', place: 'Willow Park Bandstand', seat: 'Row C, seat 12', tag: 'Non-transferable' },
  boarding: { kicker: 'Flight 204',        title: 'Lisbon',          sub: 'one-way to somewhere warm',                   date: '3 September',         place: 'Gate 7',                seat: '12A', tag: 'Non-negotiable' },
  admit:    { kicker: 'The grand opening', title: 'Admit one',       sub: 'to the best afternoon of your year',          date: 'Sunday, 2 pm',        place: 'The Old Mill',          seat: 'Bring a friend', tag: 'Irrevocable' },
  golden:   { kicker: 'You found it',      title: 'Golden Ticket',   sub: 'a tour of the chocolate river awaits',        date: 'At midnight',         place: 'The secret door',       seat: 'Bring snacks', tag: 'Unconditional' },
  cinema:   { kicker: 'Now showing',       title: 'The Long Nap',    sub: 'a feature presentation in soft focus',        date: 'Tonight, 9 pm',       place: 'Screen 3',              seat: 'Row F, seat 8', tag: 'Non-transferable' },
  train:    { kicker: 'Night express',     title: 'Paris to Rome',   sub: 'window seat, blanket, and one good book',     date: '12 October',          place: 'Platform 9',            seat: 'Car 4, seat 21', tag: 'Lasts indefinitely' }
};

const FIELDS = ['kicker', 'title', 'sub', 'date', 'place', 'seat', 'tag'];
const TAGS = ['Irrevocable', 'Non-negotiable', 'Unconditional', 'Lasts indefinitely', 'Indefinite validity', 'Non-transferable'];
const FILLS = ['solid', 'fade', 'diagonal', 'glow'];
const F = { serif: 'Fraunces, Georgia, serif', hand: 'Caveat, cursive', mono: '"Space Mono", monospace', rye: 'Rye, Fraunces, serif' };

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const pick = a => a[Math.floor(Math.random() * a.length)];
const newNo = () => Math.floor(Math.random() * 900000) + 100000;
const startPal = Math.floor(Math.random() * PALETTES.length); // a different plain colour every visit
const state = { link: '', style: 'stub', fill: 'solid', label: 'seat', pal: startPal, touched: new Set(), no: newNo(), colors: [...PALETTES[startPal].c], text: { ...COPY.stub } };

const cv = $('#cv'), g = cv.getContext('2d');
let P = {}, T = {}, cuts = [], R = 20, W = 0, H = 0, QR = null;

/* ---------- colour helpers ---------- */
function lum(h) {
  const [r, gg, b] = [1, 3, 5].map(i => parseInt(h.substr(i, 2), 16) / 255).map(v => v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return .2126 * r + .7152 * gg + .0722 * b;
}
const ratio = (a, b) => (Math.max(lum(a), lum(b)) + .05) / (Math.min(lum(a), lum(b)) + .05);
function readable(bgs, prefer) {
  const worst = c => Math.min(...bgs.map(b => ratio(c, b)));
  if (worst(prefer) >= 4.5) return prefer;
  return worst('#1f1a24') >= worst('#ffffff') ? '#1f1a24' : '#ffffff';
}
const rgba = (h, a) => `rgba(${[1, 3, 5].map(i => parseInt(h.substr(i, 2), 16)).join(',')},${a})`;

/* ---------- canvas helpers ---------- */
const rr = (x, y, w, h, r) => { g.beginPath(); g.roundRect(x, y, w, h, r); };
const font = (w, s, f, it) => { g.font = `${it ? 'italic ' : ''}${w} ${s}px ${f}`; };
function fit(str, w, size, wt, f, it, min = 18) {
  let s = size; font(wt, s, f, it);
  while (g.measureText(str).width > w && s > min) { s -= 2; font(wt, s, f, it); }
}
function text(str, x, y, al = 'left', col) { g.textAlign = al; g.fillStyle = col || P.ink; g.fillText(str, x, y); }
function wrap(str, w, max) {
  const out = []; let l = '';
  for (const wd of str.split(' ')) {
    const t = l ? l + ' ' + wd : wd;
    if (g.measureText(t).width > w && l) { out.push(l); l = wd; } else l = t;
  }
  out.push(l); return out.slice(0, max);
}
function para(str, x, y, w, o = {}) {
  const s = o.s || 36; font(o.wt || 700, s, o.f || F.hand, o.it);
  wrap(str, w, o.n || 2).forEach((l, i) => text(l, x, y + i * s * 1.15, o.al || 'left', o.c));
}
function pill(str, x, y, h, s, f = F.hand, center, maxW) {
  font(700, s, f); let w = g.measureText(str).width + h;
  while (maxW && w > maxW && s > 16) { s -= 1; font(700, s, f); w = g.measureText(str).width + h; }
  if (center) x = x - w / 2;
  g.fillStyle = P.acc; rr(x, y, w, h, h / 2); g.fill();
  text(str, x + w / 2, y + h * .7, 'center', P.on);
}
function dash(x1, y1, x2, y2, a = .5) {
  g.save(); g.setLineDash([10, 9]); g.lineWidth = 3; g.strokeStyle = rgba(P.ink, a);
  g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); g.restore();
}
function dashBox(i) {
  g.save(); g.setLineDash([10, 9]); g.lineWidth = 3; g.strokeStyle = rgba(P.ink, .35);
  rr(i, i, W - 2 * i, H - 2 * i, 12); g.stroke(); g.restore();
}
function tint(x, y, w, h) {
  g.save(); rr(0, 0, W, H, R); g.clip(); g.fillStyle = rgba(P.ink, .08); g.fillRect(x, y, w, h); g.restore();
}
function meta(x, y, ws, f, al = 'left', ls = 26, vs = 28) {
  let cx = x;
  [['when', T.date], ['where', T.place], [state.label, T.seat]].forEach(([l, v], i) => {
    const tx = al === 'center' ? cx + ws[i] / 2 : cx;
    font(500, ls, F.hand); text(l, tx, y, al, rgba(P.ink, .72));
    fit(v, ws[i] - 14, vs, f === F.mono ? 400 : 600, f, 0, 16); text(v, tx, y + vs + 6, al);
    cx += ws[i];
  });
}
const serial = (x, y, al = 'center') => { font(400, 20, F.mono); text('No. ' + state.no, x, y, al, rgba(P.ink, .8)); };

function stamp(x, y, maxW, ang = -5, right) {
  if (!T.tag) return;
  const t = T.tag.toUpperCase();
  if ('letterSpacing' in g) g.letterSpacing = '2px';
  fit(t, maxW - 44, 24, 700, F.mono, 0, 12);
  const w = g.measureText(t).width + 44, h = 48, cx = right ? x - w / 2 : x;
  g.save(); g.translate(cx, y); g.rotate(ang * Math.PI / 180);
  g.strokeStyle = rgba(P.ink, .85); g.lineWidth = 3; rr(-w / 2, -h / 2, w, h, 8); g.stroke();
  g.lineWidth = 1.5; rr(-w / 2 + 6, -h / 2 + 6, w - 12, h - 12, 4); g.stroke();
  text(t, 0, 8, 'center', rgba(P.ink, .9)); g.restore();
  if ('letterSpacing' in g) g.letterSpacing = '0px';
}

/* ---------- scannable QR with a pixel heart in the middle ---------- */
function toURL(v) {
  v = v.trim();
  if (!v) return '';
  if (/^https?:\/\//i.test(v)) return v;
  if (/^@?[A-Za-z0-9._]{1,30}$/.test(v)) return 'https://www.instagram.com/' + v.replace(/^@/, '');
  if (/^[\w-]+(\.[\w-]+)+(\/\S*)?$/.test(v)) return 'https://' + v;
  return '';
}
function makeQR() {
  QR = null;
  const u = toURL(state.link);
  if (!u || u.length > 90) return;
  try { const q = qrcode(0, 'H'); q.addData(u); q.make(); QR = q; } catch (e) { QR = null; }
}
function hint() {
  const u = toURL(state.link);
  $('#qrhint').textContent = !state.link.trim() ? 'Empty for now, so your ticket shows a pixel heart.'
    : (!u || u.length > 90) ? 'That is not a handle or link I can turn into a QR code.' : 'Scans to ' + u;
}
function qr(cx, cy, size) {
  const card = '#FFFDF9', dark = '#3A2A45', n = QR ? QR.getModuleCount() : 0, pad = 2, cell = QR ? size / (n + pad * 2) : size / 11;
  const x0 = cx - size / 2, y0 = cy - size / 2, h0 = QR ? Math.floor((n - 7) / 2) : 0;
  g.fillStyle = card; rr(x0 - 4, y0 - 4, size + 8, size + 8, 10); g.fill();
  if (QR) {
    g.fillStyle = dark;
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
      const inHeart = r >= h0 && r < h0 + 7 && c >= h0 && c < h0 + 7;
      if (!inHeart && QR.isDark(r, c)) g.fillRect(x0 + (pad + c) * cell, y0 + (pad + r) * cell, cell + .5, cell + .5);
    }
  }
  const hx = QR ? x0 + (pad + h0) * cell : cx - 3.5 * cell, hy = QR ? y0 + (pad + h0) * cell : cy - 3.5 * cell;
  g.fillStyle = card; g.fillRect(hx, hy, 7 * cell, 7 * cell);
  g.fillStyle = ratio(P.acc, card) >= 3 ? P.acc : '#B8325B';
  HEART.forEach((row, r) => [...row].forEach((ch, c) => { if (ch === 'X') g.fillRect(hx + c * cell, hy + (r + .5) * cell, cell + .5, cell + .5); }));
}

/* ---------- the seven tickets ---------- */
const DRAW = {
  stub() {
    const X = 690, C = (X + W) / 2;
    tint(X, 0, W - X, H); dashBox(14);
    pill(T.kicker, 56, 48, 42, 28, F.hand, false, 330);
    fit(T.title, X - 110, 84, 800, F.serif); text(T.title, 56, 178);
    para(T.sub, 56, 224, X - 110, { s: 32, f: F.serif, wt: 600, it: 1 });
    meta(56, 320, [190, 210, 190], F.serif);
    dash(X, 30, X, H - 30); cuts.push([X, 0, 26], [X, H, 26]);
    font(600, 38, F.serif, 1); text('Admit one', C, 92, 'center');
    qr(C, 214, 150); serial(C, 346);
    stamp(X - 26, 58, 260, -4, true);
  },
  boarding() {
    const X = 700, C = (X + W) / 2;
    tint(X, 0, W - X, H);
    g.save(); rr(0, 0, W, H, R); g.clip(); g.fillStyle = P.acc; g.fillRect(0, 0, W, 72); g.restore();
    font(700, 24, F.mono); if ('letterSpacing' in g) g.letterSpacing = '6px';
    text('BOARDING PASS', 48, 46, 'left', P.on); text('\u2708', W - 48, 46, 'right', P.on);
    if ('letterSpacing' in g) g.letterSpacing = '0px';
    pill(T.kicker, 48, 98, 38, 22, F.mono, false, 350);
    fit(T.title.toUpperCase(), X - 96, 76, 700, F.mono); text(T.title.toUpperCase(), 48, 210);
    para(T.sub, 48, 252, X - 96, { s: 24, wt: 400, f: F.mono, n: 2 });
    meta(48, 328, [200, 230, 150], F.mono, 'left', 24, 24);
    dash(X, 90, X, H - 24); cuts.push([X, 0, 26], [X, H, 26]);
    font(400, 22, F.mono); text('ADMIT ONE', C, 124, 'center');
    qr(C, 226, 150); serial(C, 350);
    stamp(X - 26, 116, 260, -3, true);
  },
  admit() {
    const th = 200, Y = H - th;
    tint(0, Y, W, th);
    g.save(); g.strokeStyle = rgba(P.ink, .6); g.lineWidth = 4; rr(22, 22, W - 44, Y - 40, 10); g.stroke();
    g.lineWidth = 1.5; rr(33, 33, W - 66, Y - 62, 6); g.stroke(); g.restore();
    pill(T.kicker, W / 2, 78, 48, 32, F.hand, true);
    fit(T.title, W - 130, 130, 400, F.rye); text(T.title, W / 2, 270, 'center');
    para(T.sub, W / 2, 346, W - 150, { s: 34, f: F.serif, wt: 600, it: 1, al: 'center' });
    meta(60, 470, [160, 160, 160], F.serif, 'center', 28, 28);
    dash(30, Y, W - 30, Y); cuts.push([0, Y, 28], [W, Y, 28]);
    font(600, 46, F.serif, 1); text('Admit one', 56, Y + th / 2 + 16);
    qr(W - 150, Y + th / 2, 150);
    stamp(W / 2, 568, 400, -4);
  },
  coupon() {
    const X = 640, C = (X + W) / 2;
    tint(X, 0, W - X, H);
    g.save(); g.setLineDash([14, 10]); g.lineWidth = 4; g.strokeStyle = rgba(P.ink, .75); rr(12, 12, W - 24, H - 24, 10); g.stroke(); g.restore();
    font(400, 34, F.serif); text('\u2702', 40, 34);
    pill(T.kicker, 64, 52, 42, 28, F.hand, false, 288);
    fit(T.title, X - 100, 80, 800, F.serif); text(T.title, 64, 178);
    para(T.sub, 64, 226, X - 110, { s: 30, f: F.serif, wt: 600, it: 1 });
    meta(64, 312, [180, 220, 170], F.serif);
    dash(X, 34, X, H - 34);
    font(600, 38, F.serif, 1); text('Redeem me', C, 92, 'center');
    qr(C, 205, 140); serial(C, 332);
    stamp(X - 24, 62, 250, -4, true);
  },
  backstage() {
    g.save(); rr(0, 0, W, H, R); g.clip(); g.fillStyle = P.acc; g.fillRect(0, 0, W, 130); g.restore();
    g.save(); g.strokeStyle = rgba(P.on, .6); g.lineWidth = 3; g.beginPath(); g.arc(W / 2, 62, 34, 0, 7); g.stroke(); g.restore();
    cuts.push([W / 2, 62, 20]);
    const k = T.kicker.toUpperCase();
    if ('letterSpacing' in g) g.letterSpacing = '4px';
    fit(k, W - 80, 48, 700, F.mono, 0, 20); text(k, W / 2, 215, 'center');
    if ('letterSpacing' in g) g.letterSpacing = '0px';
    fit(T.title, W - 70, 88, 800, F.serif); text(T.title, W / 2, 318, 'center');
    para(T.sub, W / 2, 368, W - 90, { s: 30, f: F.serif, wt: 600, it: 1, al: 'center', n: 3 });
    [['when', T.date], ['where', T.place], [state.label, T.seat]].forEach(([l, v], i) => {
      const y = 500 + i * 74;
      font(500, 26, F.hand); text(l, W / 2, y, 'center', rgba(P.ink, .72));
      fit(v, W - 90, 30, 600, F.serif, 0, 16); text(v, W / 2, y + 34, 'center');
    });
    stamp(W / 2, 724, 360, -3);
    qr(W / 2, 830, 120); serial(W / 2, 926);
  },
  receipt() {
    for (let x = 12; x < W; x += 24) cuts.push([x, 0, 9], [x, H, 9]);
    const M = F.mono;
    const k = '* ' + T.kicker.toUpperCase() + ' *';
    fit(k, W - 80, 20, 400, M, 0, 12); text(k, W / 2, 78, 'center');
    const t = T.title.toUpperCase(); fit(t, W - 80, 46, 700, M, 0, 20); text(t, W / 2, 150, 'center');
    para(T.sub, W / 2, 198, W - 90, { s: 20, f: M, wt: 400, al: 'center', n: 3 });
    dash(40, 272, W - 40, 272);
    [['WHEN', T.date], ['WHERE', T.place], [state.label.toUpperCase(), T.seat]].forEach(([l, v], i) => {
      const y = 322 + i * 52;
      font(700, 22, M); text(l, 40, y); const lw = g.measureText(l).width;
      fit(v, W - 80 - lw - 40, 22, 400, M, 0, 12); const vw = g.measureText(v).width; text(v, W - 40, y, 'right');
      g.save(); g.setLineDash([2, 6]); g.lineWidth = 2; g.strokeStyle = rgba(P.ink, .5);
      g.beginPath(); g.moveTo(40 + lw + 10, y - 6); g.lineTo(W - 40 - vw - 10, y - 6); g.stroke(); g.restore();
    });
    dash(40, 478, W - 40, 478);
    font(700, 28, M); text('TOTAL', 40, 526); text('ADMIT 1', W - 40, 526, 'right');
    stamp(W / 2, 600, 380, -4);
    font(400, 18, M); text('THANK YOU, COME AGAIN', W / 2, 690, 'center');
    qr(W / 2, 792, 150); serial(W / 2, 888);
  },
  scratch() {
    pill(T.kicker, 48, 30, 38, 26, F.hand, false, 340);
    stamp(W - 48, 50, 250, -4, true);
    fit(T.title, W - 96, 72, 800, F.serif); text(T.title, 48, 132);
    const pg = g.createLinearGradient(48, 168, W - 48, 338);
    ['#e6e3ea', '#b7b1c1', '#efeef3', '#a8a2b4', '#dcd8e2'].forEach((c, i, a) => pg.addColorStop(i / (a.length - 1), c));
    g.fillStyle = pg; rr(48, 168, W - 96, 170, 18); g.fill();
    g.save(); rr(48, 168, W - 96, 170, 18); g.clip();
    let sd = state.no; const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < 160; i++) {
      g.fillStyle = r() > .5 ? 'rgba(255,255,255,.7)' : 'rgba(60,50,75,.18)';
      g.fillRect(48 + r() * (W - 96), 168 + r() * 170, 2 + r() * 3, 2 + r() * 3);
    }
    g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = 3;
    for (let i = 0; i < 5; i++) { const x = 90 + r() * (W - 180), y = 190 + r() * 120; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 60 + r() * 60, y + 30 + r() * 30); g.stroke(); }
    g.restore();
    font(400, 18, F.mono); text('SCRATCH HERE TO REVEAL', W / 2, 206, 'center', '#3a3340');
    para(T.sub, W / 2, 262, W - 160, { s: 34, f: F.serif, wt: 600, it: 1, al: 'center', c: '#3a3340' });
    meta(48, 384, [160, 200, 140], F.serif, 'left', 24, 26);
    qr(W - 100, 412, 112);
  },
  parking() {
    const X = 610, bw = (X - 14) / 3;
    g.save(); g.strokeStyle = rgba(P.ink, .85); g.lineWidth = 3; rr(14, 14, W - 28, H - 28, 6); g.stroke(); g.restore();
    g.fillStyle = P.acc; g.fillRect(14, 14, W - 28, 64);
    font(700, 26, F.mono); text(T.kicker.toUpperCase(), 34, 56, 'left', P.on);
    font(400, 20, F.mono); text('No. ' + state.no, W - 34, 56, 'right', P.on);
    g.save(); g.strokeStyle = rgba(P.ink, .7); g.lineWidth = 2; g.beginPath();
    [180, 262].forEach(y => { g.moveTo(14, y); g.lineTo(X, y); });
    g.moveTo(X, 78); g.lineTo(X, H - 14);
    [1, 2].forEach(i => { g.moveTo(14 + bw * i, 262); g.lineTo(14 + bw * i, H - 14); });
    g.stroke(); g.restore();
    const lab = (t, x, y) => { font(400, 16, F.mono); text(t, x, y, 'left', rgba(P.ink, .7)); };
    lab('OFFENCE', 30, 102); fit(T.title, X - 60, 64, 800, F.serif); text(T.title, 30, 162);
    lab('DETAILS', 30, 204); fit(T.sub, X - 60, 28, 600, F.serif, 1, 15); text(T.sub, 30, 242);
    [['WHEN', T.date], ['WHERE', T.place], [state.label.toUpperCase(), T.seat]].forEach(([l, v], i) => {
      const x = 14 + bw * i + 16; lab(l, x, 286);
      fit(v, bw - 32, 26, 400, F.mono, 0, 13); text(v, x, 344);
    });
    const C = (X + W - 14) / 2;
    stamp(C, 126, 240, -6);
    qr(C, 250, 130); serial(C, 352);
  },
  golden() {
    g.save(); rr(0, 0, W, H, R); g.clip();
    const sh = g.createLinearGradient(0, 0, W, H);
    sh.addColorStop(0, 'rgba(255,255,255,0)'); sh.addColorStop(.38, 'rgba(255,255,255,.4)'); sh.addColorStop(.5, 'rgba(255,255,255,0)'); sh.addColorStop(.75, 'rgba(255,255,255,.22)'); sh.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = sh; g.fillRect(0, 0, W, H); g.restore();
    g.save(); g.strokeStyle = P.acc; g.lineWidth = 7; rr(24, 24, W - 48, H - 48, 14); g.stroke();
    g.strokeStyle = rgba(P.ink, .55); g.lineWidth = 2; rr(38, 38, W - 76, H - 76, 8); g.stroke(); g.restore();
    [[38, 38], [W - 38, 38], [38, H - 38], [W - 38, H - 38]].forEach(([x, y]) => { g.save(); g.translate(x, y); g.rotate(Math.PI / 4); g.fillStyle = P.acc; g.fillRect(-9, -9, 18, 18); g.restore(); });
    cuts.push([0, H / 2, 36], [W, H / 2, 36]);
    font(700, 42, F.hand); text('\u2726  ' + T.kicker + '  \u2726', W / 2, 112, 'center');
    fit(T.title, W - 180, 112, 600, F.serif, 1); text(T.title, W / 2, 212, 'center');
    para(T.sub, W / 2, 272, W - 220, { s: 34, f: F.serif, wt: 600, it: 1, al: 'center' });
    meta(75, 352, [250, 250, 250], F.serif, 'center', 28, 28);
    qr(W / 2, 516, 120);
    stamp(190, 516, 280, -6);
  },
  cinema() {
    const X = 660, C = (X + W) / 2;
    tint(X, 0, W - X, H);
    g.save(); rr(0, 0, W, H, R); g.clip(); g.fillStyle = P.acc; g.fillRect(0, 0, 84, H); g.restore();
    g.save(); g.translate(54, H / 2); g.rotate(-Math.PI / 2); font(700, 30, F.mono);
    if ('letterSpacing' in g) g.letterSpacing = '8px';
    text(T.kicker.toUpperCase(), 0, 0, 'center', P.on); g.restore();
    if ('letterSpacing' in g) g.letterSpacing = '0px';
    fit(T.title, X - 150, 80, 800, F.serif); text(T.title, 118, 150);
    para(T.sub, 118, 202, X - 150, { s: 32, f: F.serif, wt: 600, it: 1 });
    meta(118, 300, [170, 190, 150], F.mono, 'left', 26, 24);
    dash(X, 30, X, H - 30); cuts.push([X, 0, 26], [X, H, 26]);
    font(600, 38, F.serif, 1); text('Admit one', C, 80, 'center');
    qr(C, 200, 150); serial(C, 326);
    stamp(X - 30, 50, 300, -4, true);
  },
  train() {
    g.save(); rr(0, 0, W, H, R); g.clip(); g.fillStyle = P.acc; g.fillRect(0, 0, W, 150); g.restore();
    font(700, 26, F.mono); text(T.kicker.toUpperCase(), 40, 70, 'left', P.on);
    font(400, 20, F.mono); text('No. ' + state.no, 40, 108, 'left', P.on);
    fit(T.title, W - 80, 56, 700, F.mono); text(T.title, 40, 238);
    para(T.sub, 40, 292, W - 80, { s: 32, f: F.serif, wt: 600, it: 1, n: 3 });
    [['when', T.date], ['where', T.place], [state.label, T.seat]].forEach(([l, v], i) => {
      const y = 480 + i * 74;
      font(500, 30, F.hand); text(l, 40, y, 'left', rgba(P.ink, .72));
      fit(v, 250, 26, 400, F.mono, 0, 14); text(v, W - 40, y, 'right');
      g.save(); g.setLineDash([2, 7]); g.lineWidth = 2; g.strokeStyle = rgba(P.ink, .4); g.beginPath(); g.moveTo(40, y + 20); g.lineTo(W - 40, y + 20); g.stroke(); g.restore();
    });
    const Y = 710; tint(0, Y, W, H - Y); dash(30, Y, W - 30, Y); cuts.push([0, Y, 24], [W, Y, 24]);
    qr(W / 2, Y + 95, 150);
    stamp(W / 2, 421, 320, -3);
  }
};

/* ---------- render ---------- */
function makeFill(a, b) {
  if (state.fill === 'solid') return a;
  let f;
  if (state.fill === 'glow') { f = g.createRadialGradient(W * .25, H * .2, 0, W * .25, H * .2, Math.max(W, H) * .85); f.addColorStop(0, b); f.addColorStop(1, a); return f; }
  f = state.fill === 'fade' ? g.createLinearGradient(0, 0, 0, H) : g.createLinearGradient(0, 0, W, H);
  f.addColorStop(0, a); f.addColorStop(1, b); return f;
}
function draw(sc = 2) {
  const S = STYLES[state.style]; W = S.W; H = S.H; R = S.R;
  cv.width = W * sc; cv.height = H * sc;
  g.setTransform(sc, 0, 0, sc, 0, 0); g.clearRect(0, 0, W, H);
  const [c1, c2, c3, c4] = state.colors, ink = readable([c1, c2], c4);
  P = { ink, acc: c3, on: readable([c3], ink) }; T = state.text; cuts = [];
  g.textBaseline = 'alphabetic'; g.fillStyle = makeFill(c1, c2); rr(0, 0, W, H, R); g.fill();
  DRAW[state.style]();
  g.globalCompositeOperation = 'destination-out'; g.fillStyle = '#000';
  cuts.forEach(([x, y, r]) => { g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); });
  g.globalCompositeOperation = 'source-over';
  cv.setAttribute('aria-label', `${S.name} ticket: ${T.title}, ${T.date}, ${T.place}`);
  $('#hang').style.width = `min(100%, ${Math.round(W * .7)}px)`;
}
function ui() {
  $$('#styles button').forEach(b => b.setAttribute('aria-pressed', b.dataset.s === state.style));
  $$('#fills button').forEach(b => b.setAttribute('aria-pressed', b.dataset.fill === state.fill));
  $$('.swatch').forEach((s, i) => s.setAttribute('aria-pressed', i === state.pal));
  $$('#seatToggle button').forEach(b => b.setAttribute('aria-pressed', b.dataset.l === state.label));
  $('#seatLabel').textContent = state.label === 'note' ? 'Note' : 'Seat';
  $$('#tags button').forEach(b => b.setAttribute('aria-pressed', b.dataset.t === state.text.tag));
}
function sync() {
  FIELDS.forEach(f => { document.querySelector(`[data-f="${f}"]`).value = state.text[f]; });
  $$('[data-c]').forEach(i => { i.value = state.colors[i.dataset.c]; });
}
function pop() { const h = $('#hang'); h.classList.remove('pop'); void h.offsetWidth; h.classList.add('pop'); }
const refresh = () => { draw(); ui(); };
function setPal(i) { state.pal = i; state.colors = [...PALETTES[i].c]; }
const defSeat = s => (state.label === 'note' ? 'Bring snacks' : COPY[s].seat);
function setStyle(s) {
  state.style = s;
  FIELDS.forEach(f => { if (!state.touched.has(f)) state.text[f] = COPY[s][f]; });
  if (!state.touched.has('seat')) state.text.seat = defSeat(s);
  sync(); refresh(); pop();
}

/* ---------- wire up ---------- */
document.querySelectorAll('.px').forEach(el => {
  el.innerHTML = '<svg viewBox="0 0 7 6" shape-rendering="crispEdges" aria-hidden="true">' +
    HEART.map((r, y) => [...r].map((c, x) => c === 'X' ? `<rect x="${x}" y="${y}" width="1" height="1"/>` : '').join('')).join('') + '</svg>';
});
Object.entries(STYLES).forEach(([k, s]) => {
  const b = document.createElement('button'); b.type = 'button'; b.dataset.s = k; b.textContent = s.name;
  b.addEventListener('click', () => setStyle(k)); $('#styles').appendChild(b);
});
['None', ...TAGS].forEach(t => {
  const b = document.createElement('button'); b.type = 'button'; b.textContent = t; b.dataset.t = t === 'None' ? '' : t;
  b.addEventListener('click', () => { state.touched.add('tag'); state.text.tag = b.dataset.t; sync(); refresh(); });
  $('#tags').appendChild(b);
});
PALETTES.forEach((p, i) => {
  const b = document.createElement('button'), [a, bb, c, d] = p.c;
  b.type = 'button'; b.className = 'swatch'; b.title = p.name; b.setAttribute('aria-label', p.name);
  b.style.background = `linear-gradient(135deg, ${a} 25%, ${bb} 25% 50%, ${c} 50% 75%, ${d} 75%)`;
  b.addEventListener('click', () => { setPal(i); sync(); refresh(); }); $('#swatches').appendChild(b);
});
$$('#fills button').forEach(b => b.addEventListener('click', () => { state.fill = b.dataset.fill; refresh(); }));
$$('[data-f]').forEach(i => i.addEventListener('input', () => { state.touched.add(i.dataset.f); state.text[i.dataset.f] = i.value; refresh(); }));
$$('[data-c]').forEach(i => i.addEventListener('input', () => { state.colors[i.dataset.c] = i.value; state.pal = -1; refresh(); }));
$('#save').addEventListener('click', () => {
  draw(3);
  cv.toBlob(b => {
    draw(2);
    const url = URL.createObjectURL(b);
    $('#out').src = url; $('#dl').href = url; $('#dlg').showModal();
  }, 'image/png');
});
$$('#seatToggle button').forEach(b => b.addEventListener('click', () => {
  state.label = b.dataset.l;
  if (!state.touched.has('seat')) state.text.seat = defSeat(state.style);
  sync(); refresh();
}));
$('#close').addEventListener('click', () => $('#dlg').close());

$('#qrlink').addEventListener('input', e => { state.link = e.target.value; makeQR(); hint(); draw(); });
makeQR(); hint(); sync(); refresh();
Promise.all(['800 40px Fraunces', '500 40px Fraunces', 'italic 600 40px Fraunces', '700 40px Caveat', '500 40px Caveat', '400 40px "Space Mono"', '700 40px "Space Mono"', '40px Rye']
  .map(f => document.fonts.load(f))).then(refresh).catch(() => {});
