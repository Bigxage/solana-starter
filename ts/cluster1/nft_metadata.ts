import { wallet } from "../wallet"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader({address: "https:devnet.irys.xyz"}));
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = "https://gateway.irys.xyz/8ZjE9zk14J2o91XSicsXFyx23qod8GMrKPYtq6CjApqW"
         const metadata = {
             name: "Engineer Xage Rug",
             symbol: "EXR",
             description: "A premium real estate rug gifted to me by Berg",
             image: image,
             attributes: [
                 {trait_type: 'green for growth', value: '7'}
             ],
             properties: {
                 files: [
                     {
                         type: "image/png",
                         uri: image
                     },
                 ]
             },
             creators: []
         };
         const myUri = await umi.uploader.uploadJson(metadata);
         console.log("Your metadata URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();

//my metadata URI:  https://gateway.irys.xyz/B9gWda6rKLafWcAYUSg7eWZVsYdSR8Fqas7TAqH3LfJu