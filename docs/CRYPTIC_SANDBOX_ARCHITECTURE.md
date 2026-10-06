# CRYPTIC Sandbox Architecture

Cryptic is the verifier-facing learning substrate for the Golden Army Forge.

## Core principle
Oracle chooses where to look.
Cryptic reasons about what it sees.
Forge proposes a change.
Independent verifiers decide whether it survives.
ADAM governs promotion.

## Public-page learning loop
Public Cryptic pages may expose Blue-Line live state, read-only experiment traces, model explanations, benchmark deltas, and evidence lineage. They are not trusted execution boundaries.

## Compute boundary
Run model/code experiments inside an isolated compute target (Jetson, VM, container, or dedicated sandbox host). The target receives only an allowlisted repository checkout plus bounded datasets and never receives unrestricted credentials.

## Tool adapters
- Wolfram: symbolic/numerical verification and test-object generation.
- Hugging Face: model/dataset discovery, evaluation jobs, optional fine-tuning when separately approved.
- Webcmd: visible browser verification of the public Cryptic page and authenticated UI workflows.
- AIWEB Call: external human/business callback channel only; never part of autonomous execution authority.

## Dataset classes
KNOWN, COUNTEREXAMPLE, FAILED_MUTATION, SURVIVED_TEST, PROVED, REPRODUCED, INDEPENDENTLY_VERIFIED.

Never train on unlabeled Forge output as truth.

## Evidence packet
Every experiment should record oracle_protocol, oracle_t, oracle_coordinate, dataset_revision, parent_commit, candidate_commit, model_id, verifier_versions, result, and evidence_hash.
