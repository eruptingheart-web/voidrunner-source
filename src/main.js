import { Renderer } from './renderer.js';
import { Input } from './input.js';
import { AudioFX } from './audio.js';
import { UI } from './ui.js';
import { Game } from './game.js';
const canvas=document.querySelector('#game');
const renderer=new Renderer(canvas);const input=new Input(canvas);const audio=new AudioFX();const ui=new UI();const game=new Game(renderer,input,audio,ui);
function resize(){renderer.resize();if(game.state==='menu'||game.state==='over'){game.player.x=renderer.width/2;game.player.y=renderer.height/2;}}
addEventListener('resize',resize);resize();
ui.button.addEventListener('click',()=>game.start());
addEventListener('keydown',e=>{if(e.code==='KeyP'&&!e.repeat)game.togglePause();if(e.code==='Enter'&&(game.state==='menu'||game.state==='over'))game.start();});
let previous=performance.now();
function frame(now){const dt=Math.min((now-previous)/1000,.033);previous=now;game.update(dt);game.draw();requestAnimationFrame(frame);}
requestAnimationFrame(frame);
