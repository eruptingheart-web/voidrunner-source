import { CONFIG } from './config.js';
import { clamp, normalize } from './math.js';
export class Player {
  constructor(x,y){this.x=x;this.y=y;this.radius=CONFIG.player.radius;this.health=100;this.fireTimer=0;this.dashTimer=0;this.dashCooldown=0;this.invulnerable=0;this.aim={x:1,y:0};}
  update(dt,input,bounds,bullets){
    let x=(input.down('KeyD')||input.down('ArrowRight')?1:0)-(input.down('KeyA')||input.down('ArrowLeft')?1:0);
    let y=(input.down('KeyS')||input.down('ArrowDown')?1:0)-(input.down('KeyW')||input.down('ArrowUp')?1:0);
    const move=normalize(x,y); if(!x&&!y){move.x=0;move.y=0;}
    if(input.down('ShiftLeft')||input.down('ShiftRight')){if(this.dashCooldown<=0&&(x||y)){this.dashTimer=CONFIG.player.dashTime;this.dashCooldown=CONFIG.player.dashCooldown;this.invulnerable=.22;}}
    this.dashCooldown=Math.max(0,this.dashCooldown-dt);this.dashTimer=Math.max(0,this.dashTimer-dt);this.invulnerable=Math.max(0,this.invulnerable-dt);
    const speed=this.dashTimer>0?CONFIG.player.dashSpeed:CONFIG.player.speed;
    this.x=clamp(this.x+move.x*speed*dt,bounds.left+this.radius,bounds.right-this.radius);
    this.y=clamp(this.y+move.y*speed*dt,bounds.top+this.radius,bounds.bottom-this.radius);
    const dx=input.pointer.x-this.x,dy=input.pointer.y-this.y;if(Math.hypot(dx,dy)>2)this.aim=normalize(dx,dy);
    this.fireTimer-=dt;
    if((input.pointer.down||input.down('Space'))&&this.fireTimer<=0){bullets.push({x:this.x+this.aim.x*18,y:this.y+this.aim.y*18,vx:this.aim.x*CONFIG.player.bulletSpeed,vy:this.aim.y*CONFIG.player.bulletSpeed,radius:4,life:1.25,damage:1});this.fireTimer=CONFIG.player.fireRate;}
  }
  damage(amount){if(this.invulnerable>0)return false;this.health=Math.max(0,this.health-amount);this.invulnerable=.55;return true;}
  draw(ctx,time){ctx.save();ctx.translate(this.x,this.y);ctx.rotate(Math.atan2(this.aim.y,this.aim.x));ctx.shadowBlur=22;ctx.shadowColor='#58e1e8';ctx.fillStyle=this.invulnerable>0&&Math.floor(time*18)%2?'#ffffff':'#58e1e8';ctx.beginPath();ctx.moveTo(18,0);ctx.lineTo(-11,-10);ctx.lineTo(-6,0);ctx.lineTo(-11,10);ctx.closePath();ctx.fill();ctx.fillStyle='#0b1723';ctx.beginPath();ctx.arc(0,0,4,0,Math.PI*2);ctx.fill();ctx.restore();}
}
