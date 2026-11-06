import { rand } from './math.js';
export class Particles {
  constructor(){ this.items=[]; }
  burst(x,y,color,count=10,power=150){ for(let i=0;i<count;i++){ const a=rand(0,Math.PI*2), s=rand(power*.25,power); this.items.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:rand(.22,.55),max:.55,size:rand(1.5,3.8),color}); } }
  update(dt){ for(const p of this.items){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=Math.pow(.05,dt);p.vy*=Math.pow(.05,dt);p.life-=dt;} this.items=this.items.filter(p=>p.life>0); }
  draw(ctx){ for(const p of this.items){ctx.globalAlpha=Math.max(0,p.life/p.max);ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1; }
}
