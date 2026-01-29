import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import { wallet } from "../wallet";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("72toh3RJsEX3XrgzYrBUasE894Bv5nXn9g4pyk6xLsH5");

// Recipient address
const to = new PublicKey("9yq8BgSG7XahLBKivhTiHKbrhXfHTA8Yk4xixgyg8yyd");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const fromTokenAccount = await getOrCreateAssociatedTokenAccount (
            connection,
            keypair,
            mint,
            keypair.publicKey
        );
    
        // Get the token account of the toWallet address, and if it does not exist, create it
        const toTokenAccount = await getOrCreateAssociatedTokenAccount (
            connection,
            keypair,
            mint,
            to
        );

        // Transfer the new token to the "toTokenAccount" we just created
        const tx = await transfer (
            connection,
            keypair,
            fromTokenAccount.address,
            toTokenAccount.address,
            keypair.publicKey,
            1n * 1_000_000n //send 1XGE token
        );

        console.log('Success! Transaction signature: ${tx}');
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();