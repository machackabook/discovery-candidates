import crypto from "node:crypto";

export class LiveLearner {
  constructor({learningRate=0.12, explore=0.08}={}) {
    this.learningRate=learningRate; this.explore=explore;
    this.arms=new Map();
  }
  register(name, params={}) {
    if(!this.arms.has(name)) this.arms.set(name,{name,params,score:0,pulls:0});
  }
  choose(phase=0) {
    const xs=[...this.arms.values()];
    if(!xs.length) throw new Error("no strategies registered");
    // Deterministic exploration from oracle phase; not cryptographic randomness.
    const u=(Math.sin(phase*12.9898)*43758.5453)%1;
    if(Math.abs(u)<this.explore) return xs[Math.floor(Math.abs(u)*1e6)%xs.length];
    return xs.reduce((a,b)=>b.score>a.score?b:a);
  }
  observe(name,reward,evidence={}) {
    const a=this.arms.get(name); if(!a) throw new Error("unknown strategy");
    a.pulls++; a.score += this.learningRate*(Number(reward)-a.score);
    return {strategy:name,reward,score:a.score,pulls:a.pulls,evidence};
  }
  snapshot() {
    const state=[...this.arms.values()];
    return {state,sha256:crypto.createHash("sha256").update(JSON.stringify(state)).digest("hex")};
  }
}
