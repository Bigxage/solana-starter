import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import { wallet } from "../wallet"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("72toh3RJsEX3XrgzYrBUasE894Bv5nXn9g4pyk6xLsH5");

(async () => {
    try {
        // Create an ATA
        const ata = await getOrCreateAssociatedTokenAccount (
            connection,
            keypair,
            mint,
            keypair.publicKey
        );
        console.log(Your ata: ${ata.address.toBase58()});

        // Mint to ATA
        const mintTx = await mintTo (
            connection,
            keypair,
            mint,
            ata.address,
            keypair,
            100n * token_decimals
        );
        console.log(`Your mint txid: ${mintTx}`);
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()


//Your mint txid: 4hbNN9hZfVaBda9C94tAff3gU4fNe47oKvq3JWCN7My5tzKkwaFy665jubKNsaqQxrFpDg3p5oSCu9wJTjWEu78J
//Done in 12.43s.