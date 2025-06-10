import { PublicKey, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";

export const showBalance = async (address: PublicKey) => {
  const conn = new Connection("http://localhost:8899", "confirmed");
  const res = await conn.getAccountInfo(address);
  if (res?.lamports) return res?.lamports / LAMPORTS_PER_SOL;
  return "No Response received.";
};

(async() => {
  const publicKey = "Hes7dw3Ne8odgTRCYiUbQ5qgjeQjZNtuYizXdjbqbLrX";
  const balance = await showBalance(new PublicKey(publicKey));
  console.log(`The balance for the key ${publicKey} is ${balance}`)
})()

