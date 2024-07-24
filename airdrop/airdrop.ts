import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import wallet from "./dev-wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

(async () => {
  try {
    const balance = await connection.getBalance(keypair.publicKey);
    console.log(`Cüzdan Bakiyesi: ${balance / LAMPORTS_PER_SOL} SOL`);

    const txhash = await connection.requestAirdrop(
      keypair.publicKey,
      2 * LAMPORTS_PER_SOL,
    );
    console.log(`Başarılı! İşlemi buradan kontrol edebilirsiniz:
        https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
  } catch (e) {
    console.error(`Hata oluştu: ${e}`);
  }
})();
