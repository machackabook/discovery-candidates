import test from "node:test"; import assert from "node:assert/strict"; import {omega,oracle} from "../src/oracle.js";
test("prime-square-root basis is finite and positive",()=>{assert.ok(omega.length>1); assert.ok(omega.every(Number.isFinite)); assert.ok(omega.every(x=>x>0));});
test("authoritative theta is unwrapped and render phase is bounded",()=>{const s=oracle(1e6); assert.ok(s.theta.some(x=>x>2*Math.PI)); assert.ok(s.wrapped.every(x=>x>=0&&x<2*Math.PI));});
