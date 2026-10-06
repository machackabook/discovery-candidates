import {oracle} from "./oracle.js";
import crypto from "node:crypto";
const samples=Number(process.argv[2]||10000), bins=Number(process.argv[3]||64);
const counts=Array.from({length:bins},()=>0);
for(let i=0;i<samples;i++){const s=oracle(i*Math.SQRT2); counts[Math.floor((s.wrapped[1]/(2*Math.PI))*bins)%bins]++;}
const expected=samples/bins;
const chi2=counts.reduce((a,c)=>a+(c-expected)**2/expected,0);
const report={protocol:"CRYPTIC-BREAK/1",hypothesis:"wrapped phase should not exhibit obvious coarse-bin concentration under deterministic sampling",samples,bins,chi2,counts};
report.sha256=crypto.createHash("sha256").update(JSON.stringify(report)).digest("hex");
console.log(JSON.stringify(report,null,2));
