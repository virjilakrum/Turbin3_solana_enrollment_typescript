# Turbin3_prerequisites_risein 

## Solana Devnet Project (Turbin3)

This project demonstrates creating a Solana wallet, performing airdrop and transfer transactions, and interacting with a Solana program. Below are the detailed steps and commands to execute each part of the project.

### Table of Contents
1. [Transaction Links](#transaction-links)
2. [Project Setup](#project-setup)
3. [Scripts and Commands](#scripts-and-commands)
4. [File Descriptions](#file-descriptions)

### Transaction Links
| Description | Transaction Link |
|-------------|------------------|
| **Airdrop Transaction** | [View Transaction](https://explorer.solana.com/tx/NrVZjN9vFjy3pnaYYwbHG7bYa3r1Z79FrpbZQFL9cc3xTLJyMcehxKWHpnie9LpPE4t47KaLmwBF5uN2Yjmkcr9?cluster=devnet) |
| **Transfer Transaction** | [View Transaction](https://explorer.solana.com/tx/3h5U2bnddngzTv3UHATEVPdcnw14i29YFEzbsmrZBJyqD7JL8qV7SuYTKCS7Cx8FQ5hKt45SE6MsCvyq9sF7XaPK?cluster=devnet) |
| **Enroll Transaction** | [View Transaction](https://explorer.solana.com/tx/4pqinfBBVcmXK3cAMRRg7EK8jZZ5kFJWVrby65nbcvppxMiZRiFuiL8pLmdERUkuAgY6m2q1HLUS6aMZEkJC4yAJ?cluster=devnet) |

<img width="1840" alt="1" src="https://github.com/user-attachments/assets/e668e6e1-33aa-47c1-879a-92bf898f2591">
<img width="1840" alt="2" src="https://github.com/user-attachments/assets/ea23692d-9153-4517-b467-979c5ad7e0a8">
<img width="1840" alt="3" src="https://github.com/user-attachments/assets/d2974262-6a3a-4289-bfc2-bc2069ffbcec">
<img width="1840" alt="4" src="https://github.com/user-attachments/assets/0c58c394-59d3-4987-9686-c9765f3e5a95">
<img width="1840" alt="5" src="https://github.com/user-attachments/assets/ab9dafb7-8a78-42c2-a4ac-602b03e44dd6">
<img width="1840" alt="6" src="https://github.com/user-attachments/assets/57f2722a-15a9-4159-805d-3935af71f1de">
<img width="1840" alt="7" src="https://github.com/user-attachments/assets/7d40f63a-ad71-4392-96bd-917ac0d10b87">



### Project Setup
1. Ensure you have Node.js and Yarn installed.
2. Create a new project directory and initialize it:
    ```sh
    mkdir airdrop && cd airdrop
    yarn init -y
    ```

3. Install necessary packages:
    ```sh
    yarn add @types/node typescript @solana/web3.js bs58
    yarn add -D ts-node
    ```

4. Generate TypeScript configuration:
    ```sh
    yarn tsc --init --rootDir ./ --outDir ./dist --esModuleInterop --lib ES2019 --module commonjs --resolveJsonModule true --noImplicitAny true
    ```

### Scripts and Commands

#### Creating Keypair
Generate a new Solana wallet keypair:
```sh
yarn keygen
```

#### Claiming Airdrop
Request 2 SOL airdrop from Solana Devnet:
```sh
yarn airdrop
```

#### Making a Transfer
Transfer 0.1 SOL from your wallet to another wallet:
```sh
yarn transfer
```

#### Enrolling in Program
Submit your GitHub account to the Solana program:
```sh
yarn enroll
```

### File Descriptions

| File Name       | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| **keygen.ts**   | Script to generate a new Solana wallet keypair.                             |
| **airdrop.ts**  | Script to request SOL tokens from Solana Devnet to the generated wallet.    |
| **transfer.ts** | Script to transfer SOL from the generated wallet to another specified wallet. |
| **enroll.ts**   | Script to interact with the Solana program and submit your GitHub account.  |

#### keygen.ts
```typescript
import { Keypair } from "@solana/web3.js";

// Generate a new keypair
let kp = Keypair.generate();
console.log(`You've generated a new Solana wallet: ${kp.publicKey.toBase58()}`);
console.log(`Solana Wallet Secret Key: ${kp.secretKey}]`);
```

#### airdrop.ts
```typescript
import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import wallet from "./dev-wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com");

(async () => {
  try {
    const txhash = await connection.requestAirdrop(keypair.publicKey, 2 * LAMPORTS_PER_SOL);
    console.log(`Başarılı! İşlemi buradan kontrol edebilirsiniz:
https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
  } catch (e) {
    console.error(`Hata oluştu: ${e}`);
  }
})();
```

#### transfer.ts
```typescript
import { Transaction, SystemProgram, Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js";
import wallet from "./dev-wallet.json";

const from = Keypair.fromSecretKey(new Uint8Array(wallet));
const to = new PublicKey("Write here the public key of the second wallet you created");
const connection = new Connection("https://api.devnet.solana.com");

(async () => {
  try {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: LAMPORTS_PER_SOL / 100,
      })
    );
    transaction.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
    transaction.feePayer = from.publicKey;

    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [from]
    );
    console.log(`Başarılı! İşlemi buradan kontrol edebilirsiniz:
https://explorer.solana.com/tx/${signature}?cluster=devnet`);
  } catch (e) {
    console.error(`Hata oluştu: ${e}`);
  }
})();
```

#### enroll.ts
```typescript
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor";
import { IDL, WbaPrereq } from "./programs/wba_prereq";
import wallet from "./dev-wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com");
const github = Buffer.from("your_github_account", "utf8");
const provider = new AnchorProvider(connection, new Wallet(keypair), { commitment: "confirmed" });

const program = new Program<WbaPrereq>(IDL, new PublicKey(IDL.address), provider);

const enrollment_seeds = [Buffer.from("prereq"), keypair.publicKey.toBuffer()];
const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(enrollment_seeds, program.programId);

(async () => {
  try {
    const txhash = await program.methods
      .complete(github)
      .accounts({
        signer: keypair.publicKey,
        prereq: enrollment_key,
        systemProgram: PublicKey.default,
      })
      .signers([keypair])
      .rpc();
    console.log(`Başarılı! İşlemi buradan kontrol edebilirsiniz:
https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
  } catch (e) {
    console.error(`Hata oluştu: ${e}`);
  }
})();
```
