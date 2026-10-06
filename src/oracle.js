const primes=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53];
export const omega=primes.map(Math.sqrt);
export function oracle(t=performance.now()/1000){
 const theta=omega.map(w=>t*w);
 return {protocol:"KW-ORACLE/1",t,primes,omega,theta,wrapped:theta.map(x=>x%(2*Math.PI))};
}
if(import.meta.url===`file://${process.argv[1]}`) console.log(JSON.stringify(oracle(),null,2));
