# Cryptic Communication Protocol v1

Status: EXPERIMENTAL

Cryptic messages are evidence-bearing envelopes, not authority grants.

## Envelope
Required fields:
- protocol: CRYPTIC-COMM/1
- message_id
- source
- destination
- kind
- oracle
- payload
- parent_evidence_hash (nullable)
- nonce
- created_at
- expires_at

The Oracle field carries deterministic experiment coordinates. It MUST NOT be treated as entropy, authentication, encryption, or a secret.

## Message kinds
OBSERVATION, HYPOTHESIS, CHALLENGE, COUNTEREXAMPLE, FORGE_PROPOSAL, VERIFICATION, REPRODUCTION, PROMOTION_REQUEST.

## Trust
A message is untrusted until schema validation, replay/expiry checks, authorization, and evidence verification succeed. Promotion remains an ADAM decision.
