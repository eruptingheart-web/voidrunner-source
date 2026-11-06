import { rand, normalize } from './math.js';
export class Enemy {
  constructor(x,y,wave){this.x=x;this.y=y;this.wave=wave;this.radius=rand(10,17);this.hp=this.radius>14?2:1;this.speed=rand(52,83)+Math.min(55,wave*2.5);this.phase=rand(0,7);this.hit=0;this.value=this.hp*100;}
  update(dt,player){const d=normalize(player.x-this.x,player.y-this.y);this.x+=d.x*this.speed*dt;this.y+=d.y*this.speed*dt;this.phase+=dt*4;this.hit=Math.max(0,this.hit-dt);}
  draw(ctx){ctx.save();ctx.translate(this.x,this.y);ctx.rotate(this.phase*.25);ctx.shadowBlur=16;ctx.shadowColor='#ff5d91';ctx.fillStyle=this.hit>0?'#fff':'#ff5d91';ctx.beginPath();for(let i=0;i<6;i++){const a=i*Math.PI/3,r=this.radius*(i%2?.72:1);ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);}ctx.closePath();ctx.fill();ctx.fillStyle='#42172e';ctx.beginPath();ctx.arc(0,0,3,0,Math.PI*2);ctx.fill();ctx.restore();}
}
