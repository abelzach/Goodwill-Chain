# Goodwill-Chain
Decentralized NFT Marketplace to raise funds for charity organizations or programs

![logo](/src/logo.png?raw=true)


#### [Smart Contract deployed on Celo Alfajores Testnet](https://alfajores-blockscout.celo-testnet.org/address/0xAf442D5DC79f489bd0B6004A3367156eb3A26b57)

<br/>
Goodwill Chain works as an NFT marketplace to support charitable fundraising. Digital artists and content creators can upload their content to create NFTs out of them. The proceeds from the sales of these NFTs goes directly to the address of the charitable organization. Hence the transactions and funds data of the organization is present in a transparent manner where it can be verified by the general public. This is to ensure a transparent way of charity fundraising and to uphold reliability and inclusivity in the platform. The prototype of the DApp has been built using Celo Alfajores Testnet.

Any user can register as a NFT creator on the platform and contribute their content or digitial art for creating the NFT. The off chain data of these NFTs will be stored in a decentralised manner on IPFS and FileCoin using NFT.Storage. To incentivize the contribution, for each NFT content submitted by a user, they are eligible to recieve GCT(Goodwill Chain Token) tokens rewards. Now the NFT is available for sale on the platform, where other users can view and purchase them. Once a user buys an NFT from the platform, the amount is directly transfered to the charity organization whose funds balance and transaction history can be verified publicly to ensure transparency in the process of funds distribution.

<br/>

## Steps to Run Goodwill Chain DApp

### Install Requirements

Node JS - [node](https://nodejs.org/en/download/)

Celo Extension Wallet and set network as Alfajores Test Network.

### Clone the repo

```
$ git clone https://github.com/abelzach/Goodwill-Chain

$ cd Goodwill Chain
```

### Install Dependencies

```
$ npm install -g truffle

$ npm install
```

- Create a .secret file in the root directory of the repo and enter your Celo account private key.
- Create a .env file in the root directory and set environment variable.

```
REACT_APP_NFTKEY = 'NFT.Storage API Key'
```

### Deploy Smart contract and Run the DApp

```
$ truffle migrate --network alfajores

$ npm start
```

- Visit localhost:3000 in your browser and connect your Celo extension wallet account.
