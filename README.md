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

## Doubts and Clarifications

#### 1. How is the supply of Bitcoin limited?
Ans: Bitcoin generation is programmed in such a way to limit the number of coins to 21 million. In 2009, the number of bitcoins provided per block are 50. This number reduces by half every 4 years.By 2147, all the 21 million bitcoins will be mined. 

#### 2. What is the incentive to keep doing the "Proof of Work" if no new crypto is provided?
Even after 2147, the miner would still have an economic incentive to participate due to the transaction fee he receivers.

#### 3. How does the PoW algorithm work?
Ans: It is designed to adjust the difficulty in such a way that a block can be created in 10 minutes. It is also independent of the "hash rate" or the total number of miners participating. Which means if the hash rate is low, the difficulty will also be reduced to ensure the block of transactions can be created in 10 minutes.

The PoW algorithm works by checking if "SHA-256(SHA-256(Block Header)) < Target".

The Block Header is a compact, 80-byte summary of a block. It contains:

| Field                   | Size     | Description                             |
| ----------------------- | -------- | --------------------------------------- |
| **Version**             | 4 bytes  | Rules used to validate block            |
| **Previous Block Hash** | 32 bytes | SHA-256 hash of previous block header   |
| **Merkle Root**         | 32 bytes | Hash of all transactions in this block  |
| **Timestamp**           | 4 bytes  | Approximate creation time (UNIX format) |
| **Bits**                | 4 bytes  | Encodes the current mining **target**   |
| **Nonce**               | 4 bytes  | Changing number miners brute-force      |

The Target is a 256-bit number that sets the difficulty threshold. The lower the target, the harder it is to find a valid hash.

#### 5. How is the 'target' calculated?

Ans: Bitcoin encodes the target in the "bits" field of the block header using a format called "compact representation".
If bits = 0x1b0404cb, it means:

    Exponent: 0x1b = 27

    Coefficient: 0x0404cb

Target = 0x0404cb × 2^(8 × (0x1b - 3))
       = 0x0404cb × 2^192

#### 6. How is the difficulty calculated?
Ans: difficulty = max_target / current_target

#### 7. What are digital signatures and how are they created?
Ans: Digital signatures are your unique signatures that are generated using your private key to authorize a transaction. In Bitcoin, they're created by something called ECDSA curve.

Private key (random 256-bit number)
↓
Public key = Private key × Generator point G

| Term               | Meaning                                         |
| ------------------ | ----------------------------------------------- |
| **ECDSA**          | Signature algorithm used in Bitcoin             |
| **Curve**          | Mathematical shape used in encryption           |
| **secp256k1**      | The specific curve Bitcoin uses (`y² = x³ + 7`) |
| **Security Basis** | Hard math problem (ECDLP)                       |
| **Key Size**       | 256 bits (compact and secure)                   |

...

## Basics of Cryptography, Hashing, Encryption and Public key cryptography

#### Cryptography: 
Cryptography is the science of securing information — ensuring:

    Confidentiality (no one else can read it)

    Integrity (it hasn’t been altered)

    Authentication (verifying identity)

    Non-repudiation (you can’t deny you sent it)
    
### 🔧 How Is It Done? (Core Techniques)
### 🔑 1. Encryption / Decryption

    Converts data (plaintext) into unreadable form (ciphertext)

    Only those with the key can decrypt
| Type           | Example                  | Usage                          |
| -------------- | ------------------------ | ------------------------------ |
| **Symmetric**  | Same key for both sides  | AES, used in file encryption   |
| **Asymmetric** | Public/Private key pairs | RSA, ECC, used in SSL, Bitcoin |
### ✍️ 2. Digital Signatures

    Used to verify authenticity and integrity

    Sign with private key, verify with public key

    Used in: Bitcoin, secure emails, software updates

### 🧾 3. Hashing

    Converts data → fixed-length string (digest)

    Irreversible (no decryption)

    Even small input changes → drastically different hash

| Algorithm | Output Length | Use Case                              |
| --------- | ------------- | ------------------------------------- |
| SHA-256   | 256 bits      | Bitcoin block hashing, file integrity |
| MD5       | 128 bits      | (Outdated) Checksums                  |

### 🧩 4. Key Exchange

    Securely share keys over public channels

    Example: Diffie-Hellman, used in SSL/TLS

### 🛡️ 5. Authentication Protocols

    Verify identity via passwords, signatures, or certificates

    Used in login systems, websites, bank apps

Real life applications of Cryptography:

| Application      | Cryptography Role                              |
| ---------------- | ---------------------------------------------- |
| WhatsApp         | End-to-end encrypted chats (Signal Protocol)   |
| Bitcoin          | Hashes for PoW, ECDSA signatures for ownership |
| Websites (HTTPS) | SSL/TLS uses RSA/ECDSA, AES, and certificates  |
| Passwords        | Stored as salted hashes (e.g., bcrypt)         |
| Secure email     | PGP or S/MIME for encrypting and signing       |


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


## What are ECDSA and ED25519 Curves?
ECDSA stands for: Elliptic Curve Digital Signature Algorithm

It’s the cryptographic algorithm Bitcoin uses to:

    ✅ Prove ownership of a Bitcoin address

    ✅ Sign transactions

    ✅ Verify signatures are valid
    
The “curve” refers to a specific elliptic curve used in the math behind ECDSA.
Bitcoin uses a secp256k1 curve defined by:y² = x³ + 7  over a finite field (mod p)
where p = 2²⁵⁶ - 2³² - 977
Bitcoin specifically uses the secp256k1 curve, chosen for:

    High performance (faster operations)

    Simpler structure (no unnecessary features)

    Some say it's more transparent because it has fewer hidden parameters

Curve parameters:

    Name: secp256k1

    Key size: 256 bits

    Generator point G: A fixed point on the curve used for key derivation
ED25519 is a digital signature scheme based on the Edwards-curve Digital Signature Algorithm (EdDSA) using the Curve25519 elliptic curve.

It's designed to be:

    🚀 Faster

    🔒 More secure

    ❌ Harder to misuse
    than older schemes like ECDSA/secp256k1 (used in Bitcoin).
x² + y² = 1 + (121665/121666) * x²y²  over the field 𝔽ₚ, where p = 2²⁵⁵ - 19
✅ Properties of Curve25519:

    Prime field: p = 2²⁵⁵ - 19 (a fast, safe prime)

    256-bit security

    Operates in a twisted Edwards form (efficient for signatures)

    Designed for constant-time execution → protects against timing attacks

Why is ED25519 preffered?
| Feature             | ED25519                             | ECDSA (secp256k1)                  |
| ------------------- | ----------------------------------- | ---------------------------------- |
| Curve               | Curve25519 (Edwards curve)          | secp256k1 (Weierstrass curve)      |
| Signature scheme    | EdDSA                               | ECDSA                              |
| Security            | \~128-bit quantum-resistant         | \~128-bit, but older math          |
| Performance         | ⚡ Very fast & safe                  | Slower and easier to misuse        |
| Side-channel safety | ✅ Constant-time by default          | ❌ Requires careful implementation  |
| Key length          | 32-byte private, 32-byte public     | 32-byte private, 33/65-byte public |
| Deterministic sigs  | ✅ Always same output for same input | ❌ Needs secure random nonce        |

## Creating a wallet and airdropping Solana:

Steps to follow:
1. Install solana cli according to your Operating system
2. Install Phantom or other solana compliant wallet (Metamask is not suitable)
3. solana address will give the the public adress.
4. run solana-test-validator on localnet
5. The command "solana airdrop 10" will drop 10 SOL to the localnet wallet.
6. The command "solana balance" will show the balance in the account.

## 5. Ownership and Authorities in Solana
Every Solana account has an owner. Owner is typically a program ID (i.e., the address of the smart contract that controls that account). The owner defines who can modify the account data.

 ✅ Ownership ensures only the correct logic (from the right program) can act on the account.
 ✅ Users cannot arbitrarily change the owner — it must be done via a valid instruction from the current owner.

Authorities are public keys (wallets) that have permission to perform specific actions on an account. These are different from ownership and more flexible.

There are different types of authorities depending on the context (especially in token accounts):
Common authority types in Solana programs:

    Mint Authority: Can mint new tokens.

    Freeze Authority: Can freeze token accounts.

    Transfer Authority: Can transfer tokens on someone’s behalf (using delegated authority).

    Upgrade Authority (in upgradeable programs): Can update the program logic.

### Differences between Ownership and Authority

| Feature          | Ownership                                                 | Authority                                       |
| ---------------- | --------------------------------------------------------- | ----------------------------------------------- |
| What it controls | Who can modify account data                               | Who can perform specific actions                |
| Set as           | Program ID (immutable unless reassigned by program logic) | Public key(s) (can be changed via instructions) |
| Common in        | All accounts                                              | Token Program, Stake Program, etc.              |
| Flexibility      | Less flexible (tied to program)                           | More flexible (can be reassigned easily)        |

✅ Real-Life Example

Imagine a token mint:

    Owner: Token Program — only this program can modify token data.

    Mint Authority: Alice — she can mint tokens.

    Freeze Authority: Bob — he can freeze user token accounts if needed.

Even though the token is owned by the Token Program, Alice and Bob have authorities to take certain actions.

## 6. The concept of "Account" on Solana

🔑 1. Everything is an Account

    On Solana, all state — including tokens, smart contract code (aka programs), user data, etc. — is stored in accounts.

    Accounts are key-value stores (like a struct or a file) with a fixed size.

    Each account has a unique public key (like an address).

📦 2. Types of Accounts

There are three main types:
✅ a. Data Account (State)

    Stores application state or user data (e.g., balances, metadata, etc.).

    Owned by a program (smart contract) and writable only by that program.

🧠 b. Program Account

    Stores compiled BPF bytecode (the smart contract logic).

    Is executable and deployed using tools like Anchor or Solana CLI.

    Immutable once deployed.

👤 c. System Account (User)

    Created by default for users; holds SOL, sends transactions, etc.

    Owned by the System Program.

⚙️ 3. Account Structure
| Field        | Description                                                           |
| ------------ | --------------------------------------------------------------------- |
| `lamports`   | Amount of SOL in the account (used for rent/fees).                    |
| `owner`      | Program that can change this account’s data.                          |
| `data`       | Opaque byte buffer (user-defined, deserialized by the owner program). |
| `executable` | True if the account contains a program.                               |
| `rent_epoch` | Used for determining rent exemption.                                  |
📝 4. Accounts in Transactions

    When calling a Solana program, the transaction must specify all accounts it will read or write.

    This is unlike Ethereum, where a contract can read/write to any contract/account it wants.

    Why? For parallel processing — Solana can run transactions in parallel as long as their accounts don’t overlap.

📤 5. Rent & Size

    Accounts must have enough lamports to be rent-exempt (or they'll be deleted over time).

    The size of an account is fixed when it's created — resizing requires creating a new account and migrating data.

📌 Summary (Real-World Analogy):

Think of Solana like a cloud storage system:

    Programs are like apps that can read/write only to their own folders (accounts).

    Users own empty folders by default and can allow apps to store stuff there.

    Everything that matters (code, data, tokens) lives in folders (accounts).

### What is a PDA?

Program Derived Accounts (PDAs) are special accounts on Solana that:

    Don't have private keys

    Are controlled by programs, not people

    Are deterministically generated from seeds + program ID

    Can sign transactions via program logic, not with a cryptographic key

They are central to building secure and flexible smart contracts on Solana.

### 🏗️ Why PDAs Exist

Solana programs are not allowed to sign transactions.
But sometimes a program needs to:

    Transfer tokens

    Modify data

    Own accounts or assets

🛠️ That’s where PDAs come in — they act as program-controlled accounts that can be authorized by the program itself.

| Property               | Description                                                                    |
| ---------------------- | ------------------------------------------------------------------------------ |
| 🔑 No Private Key      | No one can sign using a PDA outside the program — prevents unauthorized access |
| 🔄 Deterministic       | Generated from `(seeds..., program_id)` — always same address for same inputs  |
| ✅ Can Sign via Program | Programs can sign for PDAs internally using `invoke_signed()`                  |
| 📦 Own Data or Tokens  | PDAs can hold SOL, SPL tokens, or store custom state                           |


Accounts is a bit of tricky concept in Solana and I got lot of doubts like:
1. How can the Data Account have a fixed size?
2. Why should a transaction specify "All accounts" that are readable and writable?
3. If the Program Account is immutable, how do we publish upgrades or security fixes and ensure that the new program has access to manipulate the data account created by the previous program?
4. What is "Sealevel" and how does it help in parallel processing of transactions?

Got decent answers for them and with practical examples from ChatGPT. I'm sure you might have more doubts which you can get answered there rather than making this article lengthy.
