import crypto from "node:crypto";
export function evidencePacket(input){
 const packet={protocol:"CRYPTIC-EVIDENCE/1",...input};
 const canonical=JSON.stringify(packet,Object.keys(packet).sort());
 return {...packet,evidence_hash:crypto.createHash("sha256").update(canonical).digest("hex")};
}
