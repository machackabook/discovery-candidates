# Blue-Line Live Learning

This implements the earlier blue-line idea as a no-refresh live state surface.

## Loop
OBSERVE -> SCORE -> SELECT -> TEST -> EMIT -> PATCH UI -> OBSERVE

The browser uses Server-Sent Events. Incoming evidence patches existing DOM nodes instead of rebuilding or refreshing the page.

## Safety / scientific integrity
The learner may tune bounded experiment parameters and select registered strategies. It does not rewrite arbitrary source code, change credentials, merge branches, or promote a scientific claim automatically. Proposed code changes belong on a branch/PR and must pass tests plus ADAM evidence gates.

The built-in objective is explicitly SIMULATED so the loop can be exercised immediately. POST /observe accepts real measured rewards and marks them EXECUTED_UNVERIFIED until an evidence verifier promotes them.

## Maximum-efficiency interpretation
Use the phase oracle to decorrelate deterministic experiment scheduling; use measured reward to learn which registered strategy performs best; preserve every observation and compare against Sobol/Halton/grid baselines. Do not use the oracle as cryptographic entropy.
