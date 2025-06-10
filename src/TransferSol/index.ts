import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import { airdrop } from "../airDrop";
import { showBalance } from "../showBalance";

export const TransferSol = async (from: Keypair, to: PublicKey, amount: number) => {
    const conn = new Connection("http://localhost:8899","confirmed")
    const transaction = new Transaction()
    const instructions = SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: amount * LAMPORTS_PER_SOL
    })

    transaction.add(instructions)
    await sendAndConfirmTransaction(conn, transaction,[from])
}

const secret = Uint8Array.from([
  178, 173, 245, 183, 43, 71, 185, 29, 1, 169, 118, 218, 49, 180, 176, 238, 209,
  178, 222, 16, 17, 75, 163, 228, 181, 20, 72, 62, 151, 33, 76, 65, 123, 124,
  159, 244, 95, 229, 56, 154, 199, 150, 155, 182, 149, 178, 123, 177, 194, 62,
  39, 241, 117, 188, 109, 47, 63, 195, 63, 63, 32, 177, 236, 195,
]);
const toPublicKey = new PublicKey(
  "Hes7dw3Ne8odgTRCYiUbQ5qgjeQjZNtuYizXdjbqbLrX"
);

const fromKeypair = Keypair.fromSecretKey(secret);

(async() => {
    await airdrop(fromKeypair.publicKey, 30)
    console.log("Initial balance of the 'from' wallet before transfer is:", await showBalance(fromKeypair.publicKey))
    console.log(
      "The amount in the 'to' account before transfer is: ",
      await showBalance(toPublicKey)
    );
    await TransferSol(fromKeypair, toPublicKey, 20)
    console.log("The amount in the 'from' account after transfer is: ", await showBalance(fromKeypair.publicKey))
    console.log("The amount in the 'to' account after transfer is: ", await showBalance(toPublicKey))
})()