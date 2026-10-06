const PRIMES=[2,3,5,7,11,13,17,19,23,29,31,37];
export const omega=(n=PRIMES.length)=>PRIMES.slice(0,n).map(Math.sqrt);
export function oraclePhase(t,{phi=[],dimensions=PRIMES.length}={}){
 const w=omega(dimensions);
 const theta=w.map((wi,i)=>t*wi+(phi[i]??0));
 return {protocol:"KW-ORACLE/1",t,omega:w,theta,wrapped:theta.map(x=>((x%(2*Math.PI))+2*Math.PI)%(2*Math.PI))};
}
// Deterministic coordinate only. Never use as a cryptographic key, nonce, or entropy source.
