# How to develop necessary skills to land a job or start own company using Solana Blockchain?

This repo provides the process outlined by an experienced Solana Developer Harkirat Singh in his Youtube video - [Complete Solana and Rust Roadmap](https://www.youtube.com/watch?v=5X1uwNJkZFw). Please refer to the youtube video for detailed course curriculum or you can just read through the crux of each topic right here.

I'll be documenting my approach and challenges I faced along the way and how I overcame them.

Let's start with the first concept - The bitcoin whitepaper.

##### Note: A novice reader can have a lot of doubts even after reading key points of this paper. I definitely got many doubts and listed them below with answers I got from ChatGPT 

## 1. Bitcoin Whitepaper Simplified:

### Key idea : Use cryptography to build a robust and trustless system that allows pear-to-pear transfer of funds without any intermediatory like bank.

#### Traditional: User A → [Bank] → User B  
#### Bitcoin:     User A → [Blockchain Network] → User B

Each new Transaction 'hash'/'id' is generated from the 'hash'/'id' of the previous transaction.
#### [Input: Previous TX Output] → [Signature] → [Output: New Address + Amount]

Hash blocks of transactions and timestamp them to prove they existed at that time.
#### Block 1 (TXs) → Hash → Timestamp  
#### Block 2 (TXs + Block 1 Hash) → Hash → Timestamp  

#### Proof of Work: Miners must solve a puzzle (find a hash below a target) to add new blocks.
Yes, this is the idea that leads to lot of delay (10 minutes per block) in transactions..., consumes millions of units of electricity... increases carbon footprint etc but makes it exponentially difficult for malicious players from changing the transaction history.

A 'Network' is essential for all the bitcoin users to know about the transactions made. Then the miners will compete with their computer resources show "Proof of Work" or solve a puzzle by finding the 'nonce' to add these block of transactions to the block chain. 
#### User → Network → Miner → Block → Broadcast → Network accepts

Incentivize Miners for good behavior: Provided with new Bitcoin (This is how Bitcoins are minted/created).

#### Block = Valid → Reward = New BTC + TX Fees

We can reclaim disk space by keeping only unspent outputs (UTXOs), discard old inputs.
#### [TX1 Input → TX2 Output]  
#### → Keep TX2 Output  
#### → Discard TX1 Input (already used)

Simplify the verification of the transaction validity by using Block headers and Merkel trees and thereby allowing Lightweight clients to verify transactions without downloading full blockchain.

#### TX → Merkle Path → Block Header  
#### Client downloads only headers + proof

Splitting bitcoin is possible to facilitate transactions.
#### Inputs: [Balance: 0.9 BTC]  
#### Outputs: [Recipient: 0.6 BTC, Balance: 0.299 BTC, Fee: 0.001 BTC]

Privacy: Very important feature that prevents people from identifying you as holder of bitcoin
#### User → New address per transaction
#### → Less linkability

...


## How does Solana compare to other crypto currencies like Ethereum and Bitcoin?
| Feature                  | Bitcoin                            | Ethereum                              | Solana                               |
|--------------------------|-------------------------------------|----------------------------------------|--------------------------------------|
| Purpose                  | Digital currency                    | Smart contracts, dApps, DeFi, NFTs     | High-speed scalable dApps and DeFi   |
| Consensus Mechanism      | Proof of Work (PoW)                 | Proof of Stake (PoS) (formerly PoW)    | Proof of History (PoH) + PoS         |
| Transactions per Second  | ~7                                  | ~30                                    | ~65,000+                              |
| Block Time               | ~10 minutes                         | ~13 seconds                            | ~400 ms                               |
| Smart Contracts          | ❌ Not supported                    | ✅ Solidity, Vyper                     | ✅ Rust, C, C++                       |
| Energy Consumption       | 🔺 Very high                        | ⚠️ Medium (after PoS)                 | ✅ Very low                           |
| Development Maturity     | 🟢 Oldest & most stable             | 🟡 Widely used & evolving              | 🔵 Newer, still maturing              |
| Finality Time            | ~60 minutes                         | ~6 minutes                             | ~1–2 seconds                          |
| Fees                     | Low to high (fluctuates)            | High (network congestion possible)     | Very low                              |
| Privacy                  | Pseudonymous                        | Pseudonymous                           | Pseudonymous                          |
| Native Token             | BTC                                 | ETH                                    | SOL                                   |
| Decentralization         | ✅ Very high                        | ✅ High                                 | ⚠️ Lower (validator hardware intense) |
| Network Resilience       | ✅ Extremely resilient               | ✅ Resilient                            | ⚠️ Still maturing                     |
| Number of Validators     | ~20,000+ (indirectly via mining)    | ~900,000+ stakers, fewer full nodes    | ~1,500+ (hardware-intensive)         |
| Governance               | Community + Developers              | Community + Ethereum Foundation        | Solana Foundation + Validators        |
| Ideal Use Cases          | Store of value, P2P payments        | dApps, DeFi, DAOs, NFTs                | Fast DeFi, Web3 apps, gaming          |


