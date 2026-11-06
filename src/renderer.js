import { CONFIG } from './config.js';
export class Renderer {
  constructor(canvas){this.canvas=canvas;this.ctx=canvas.getContext('2d');this.stars=Array.from({length:90},()=>({x:Math.random(),y:Math.random(),r:Math.random()*1.5+.3,a:Math.random()*.5+.12}));}
  resize(){const rect=this.canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);this.canvas.width=Math.round(rect.width*dpr);this.canvas.height=Math.round(rect.height*dpr);this.ctx.setTransform(dpr,0,0,dpr,0,0);this.width=rect.width;this.height=rect.height;}
  draw(game){const c=this.ctx,w=this.width,h=this.height;c.clearRect(0,0,w,h);c.fillStyle=CONFIG.colors.background;c.fillRect(0,0,w,h);
    c.strokeStyle=CONFIG.colors.grid;c.lineWidth=1;const grid=CONFIG.arena.grid;for(let x=0;x<w;x+=grid){c.beginPath();c.moveTo(x,0);c.lineTo(x,h);c.stroke();}for(let y=0;y<h;y+=grid){c.beginPath();c.moveTo(0,y);c.lineTo(w,y);c.stroke();}
    for(const s of this.stars){c.globalAlpha=s.a*(.7+.3*Math.sin(game.elapsed*1.4+s.x*20));c.fillStyle='#b7d9ed';c.beginPath();c.arc(s.x*w,s.y*h,s.r,0,Math.PI*2);c.fill();}c.globalAlpha=1;
    c.strokeStyle='rgba(88,225,232,.18)';c.lineWidth=1;c.strokeRect(17,17,w-34,h-34);
    for(const b of game.bullets){c.shadowBlur=14;c.shadowColor=CONFIG.colors.cyan;c.fillStyle='#c4ffff';c.beginPath();c.arc(b.x,b.y,b.radius,0,Math.PI*2);c.fill();}c.shadowBlur=0;
    for(const e of game.enemies)e.draw(c);game.player?.draw(c,game.elapsed);game.particles.draw(c);
    if(game.player?.dashTimer>0){c.strokeStyle='rgba(88,225,232,.35)';c.lineWidth=3;c.beginPath();c.arc(game.player.x,game.player.y,25,0,Math.PI*2);c.stroke();}
  }
}
