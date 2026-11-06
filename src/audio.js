export class AudioFX {
  constructor(){this.ctx=null;this.enabled=true;}
  init(){if(!this.ctx){const C=window.AudioContext||window.webkitAudioContext;if(C)this.ctx=new C();}if(this.ctx?.state==='suspended')this.ctx.resume();}
  tone(freq=440,duration=.06,type='sine',volume=.025){if(!this.enabled||!this.ctx)return;const o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type=type;o.frequency.setValueAtTime(freq,this.ctx.currentTime);g.gain.setValueAtTime(volume,this.ctx.currentTime);g.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+duration);o.connect(g);g.connect(this.ctx.destination);o.start();o.stop(this.ctx.currentTime+duration);}
  shot(){this.tone(560,.045,'triangle',.012);} hit(){this.tone(130,.12,'sawtooth',.025);} dash(){this.tone(260,.12,'sine',.02);} over(){this.tone(110,.5,'triangle',.035);}
}
