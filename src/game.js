import { CONFIG } from './config.js';
import { Player } from './player.js';
import { Enemy } from './enemy.js';
import { Particles } from './particles.js';
import { circlesOverlap } from './collision.js';
import { rand, clamp } from './math.js';
export class Game {
  constructor(renderer,input,audio,ui){this.renderer=renderer;this.input=input;this.audio=audio;this.ui=ui;this.state='menu';this.best=Number(localStorage.getItem('voidrunner-best')||0);this.reset();}
  reset(){this.elapsed=0;this.score=0;this.wave=1;this.spawnTimer=.8;this.waveTimer=0;this.bullets=[];this.enemies=[];this.particles=new Particles();this.player=new Player(this.renderer.width/2,this.renderer.height/2);this.lastWave=0;}
  start(){this.reset();this.state='playing';this.audio.init();this.ui.setPlaying();this.ui.notify('INCOMING CONTACTS');}
  togglePause(){if(this.state==='playing'){this.state='paused';this.ui.setPaused(true);}else if(this.state==='paused'){this.state='playing';this.ui.setPaused(false);}}
  update(dt){if(this.state!=='playing')return;this.elapsed+=dt;this.wave=1+Math.floor(this.elapsed/22);const bounds={left:17,top:17,right:this.renderer.width-17,bottom:this.renderer.height-17};
    this.player.update(dt,this.input,bounds,this.bullets);
    const spawnRate=Math.max(CONFIG.enemies.spawnMin,CONFIG.enemies.spawnBase-this.wave*.075);this.spawnTimer-=dt;
    if(this.spawnTimer<=0&&this.enemies.length<CONFIG.enemies.max){this.spawnEnemy();this.spawnTimer=spawnRate*rand(.72,1.22);}
    for(const e of this.enemies)e.update(dt,this.player);
    for(const b of this.bullets){b.x+=b.vx*dt;b.y+=b.vy*dt;b.life-=dt;}
    for(const b of this.bullets){if(b.life<=0)continue;for(const e of this.enemies){if(e.hp>0&&circlesOverlap(b,e)){e.hp-=b.damage;b.life=0;e.hit=.09;this.particles.burst(b.x,b.y,'#ff9abb',3,65);if(e.hp<=0){this.score+=e.value;this.particles.burst(e.x,e.y,'#ff5d91',13,180);this.audio.hit();}break;}}}
    this.bullets=this.bullets.filter(b=>b.life>0&&b.x>-20&&b.x<bounds.right+20&&b.y>-20&&b.y<bounds.bottom+20);
    this.enemies=this.enemies.filter(e=>e.hp>0);
    for(const e of this.enemies){if(circlesOverlap(this.player,e)&&this.player.damage(18)){this.audio.hit();this.particles.burst(this.player.x,this.player.y,'#ff5d91',9,130);}}
    this.particles.update(dt);
    if(this.wave>this.lastWave){this.lastWave=this.wave;if(this.wave>1)this.ui.notify(`WAVE ${String(this.wave).padStart(2,'0')} — THREAT INCREASED`);}
    if(this.player.health<=0)this.end();
    this.ui.update(this,this.best);
  }
  spawnEnemy(){const w=this.renderer.width,h=this.renderer.height,side=Math.floor(Math.random()*4),pad=28;let x,y;if(side===0){x=rand(0,w);y=-pad;}else if(side===1){x=w+pad;y=rand(0,h);}else if(side===2){x=rand(0,w);y=h+pad;}else{x=-pad;y=rand(0,h);}this.enemies.push(new Enemy(x,y,this.wave));}
  end(){this.state='over';this.best=Math.max(this.best,this.score);localStorage.setItem('voidrunner-best',String(this.best));this.audio.over();this.ui.showGameOver(this.score,this.best);}
  draw(){this.renderer.draw(this);}
}
