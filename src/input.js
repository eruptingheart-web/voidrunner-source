export class Input {
  constructor(canvas) {
    this.keys = new Set(); this.pointer = { x: 0, y: 0, down: false }; this.canvas = canvas;
    addEventListener('keydown', e => { this.keys.add(e.code); if (['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code)) e.preventDefault(); });
    addEventListener('keyup', e => this.keys.delete(e.code));
    addEventListener('blur', () => { this.keys.clear(); this.pointer.down = false; });
    canvas.addEventListener('pointermove', e => { const r = canvas.getBoundingClientRect(); this.pointer.x = (e.clientX-r.left)*canvas.width/r.width; this.pointer.y = (e.clientY-r.top)*canvas.height/r.height; });
    canvas.addEventListener('pointerdown', e => { if (e.button === 0) this.pointer.down = true; });
    addEventListener('pointerup', e => { if (e.button === 0) this.pointer.down = false; });
    canvas.addEventListener('contextmenu', e => e.preventDefault());
  }
  down(code) { return this.keys.has(code); }
  get moving() { return this.down('KeyW') || this.down('KeyA') || this.down('KeyS') || this.down('KeyD') || this.down('ArrowUp') || this.down('ArrowDown') || this.down('ArrowLeft') || this.down('ArrowRight'); }
}
