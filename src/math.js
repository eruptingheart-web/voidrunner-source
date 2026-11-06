export const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
export const rand = (min, max) => min + Math.random() * (max - min);
export const distanceSq = (a,b) => (a.x-b.x)**2 + (a.y-b.y)**2;
export function normalize(x,y) { const m = Math.hypot(x,y) || 1; return { x:x/m, y:y/m }; }
export function formatTime(seconds) { const s=Math.floor(seconds); return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`; }
