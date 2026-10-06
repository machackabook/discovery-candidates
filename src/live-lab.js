import express from "express";
import {oracle} from "./oracle.js";
import {LiveLearner} from "./learner.js";

const app=express(); app.use(express.json());
const learner=new LiveLearner();
["kw-phase","sobol-baseline","halton-baseline","uniform-grid"].forEach(x=>learner.register(x));
const clients=new Set();
let iteration=0;

function emit(type,payload){
 const frame=`event: ${type}\ndata: ${JSON.stringify(payload)}\n\n`;
 for(const res of clients) res.write(frame);
}
function syntheticObjective(strategy,phase){
 // Development objective only. Replace with a real measured test adapter before claiming discovery.
 const bias={"kw-phase":0.02,"sobol-baseline":0.03,"halton-baseline":0.025,"uniform-grid":0}[strategy]||0;
 return Math.max(0,Math.min(1,0.5+bias+0.15*Math.sin(phase)));
}
function tick(){
 const o=oracle(iteration*0.137);
 const selected=learner.choose(o.theta[iteration%o.theta.length]);
 const reward=syntheticObjective(selected.name,o.wrapped[iteration%o.wrapped.length]);
 const update=learner.observe(selected.name,reward,{iteration,oracle_t:o.t,mode:"SIMULATED_OBJECTIVE"});
 emit("blue-line",{iteration,selected:selected.name,reward,update,snapshot:learner.snapshot(),evidence_state:"SIMULATED"});
 iteration++;
}
setInterval(tick,750);

app.get("/events",(req,res)=>{
 res.set({"Content-Type":"text/event-stream","Cache-Control":"no-cache","Connection":"keep-alive"});
 res.flushHeaders(); clients.add(res); res.write("event: ready\ndata: {}\n\n");
 req.on("close",()=>clients.delete(res));
});
app.get("/state",(_req,res)=>res.json({iteration,learner:learner.snapshot()}));
app.post("/observe",(req,res)=>{
 const {strategy,reward,evidence={}}=req.body||{};
 try{const update=learner.observe(strategy,reward,{...evidence,mode:"EXTERNAL_OBSERVATION"});emit("blue-line",{iteration,update,evidence_state:"EXECUTED_UNVERIFIED"});res.json(update);}
 catch(e){res.status(400).json({error:e.message});}
});
app.use(express.static("public"));
app.listen(Number(process.env.LAB_PORT||8090),()=>console.log("Cryptic live lab on :8090"));
