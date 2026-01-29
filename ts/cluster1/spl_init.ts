import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from '@solana/spl-token';
import { wallet } from "../wallet";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Solana devnet connection
const commitment: Commitment = "confirmed";
console.log(`Using Wallet Address: ${keypair.publicKey.toBase58()}`);
const connection = new Connection("https://api.devnet.solana.com", commitment);

(async () => {
    try {
        // Start here
        const mint = await createMint(
            connection,
            keypair,             // Payer
            keypair.publicKey,   // Mint Authority
            null,                // Freeze Authority
            6                    // Decimals
        );

        console.log(`Success! Mint Address: ${mint.toBase58()}`);

    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()

//mint address: 265e2dXizbZCxzzjGT7dsig6yyo6Qsqq85zcAkCfSr5m

//Mint Address: 72toh3RJsEX3XrgzYrBUasE894Bv5nXn9g4pyk6xLsH5