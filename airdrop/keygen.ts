import { Keypair } from "@solana/web3.js";

//new keypair
let kp = Keypair.generate();
console.log(`Yeni bir Solana cüzdanı oluşturuldu: ${kp.publicKey.toBase58()}`);
console.log(`Solana Cüzdan Gizli Anahtarı: ${kp.secretKey}]`);
