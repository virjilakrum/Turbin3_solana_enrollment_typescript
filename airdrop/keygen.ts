import { Keypair } from "@solana/web3.js";

//new keypair
let kp = Keypair.generate();
console.log(`New Solana wallet created: ${kp.publicKey.toBase58()}`);
console.log(`Solana wallet private key: ${kp.secretKey}]`);
