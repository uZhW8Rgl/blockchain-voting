
# Election - DAPP
This implementation follows the following guides:
- [Full Free Video Tutorial:**](https://github.com/dappuniversity/election/blob/master/README.md)
- [https://youtu.be/3681ZYbDSSk](https://youtu.be/3681ZYbDSSk)

I simply added a revocation functionality and changed the code to run on the Sepolia Testnet. The Tutorial and majority of the code is from Dapp University, I just followed the steps.


## Dependencies
Install these prerequisites to follow along with the tutorial. See free video tutorial or a full explanation of each prerequisite.
- NPM: [https://nodejs.org](https://nodejs.org)
- Truffle: [https://github.com/trufflesuite/truffle](https://github.com/trufflesuite/truffle)
- Ganache: [http://truffleframework.com/ganache/](http://truffleframework.com/ganache/)
- Metamask: [https://metamask.io/](https://metamask.io/)


## Step 1. Clone the project
`git clone https://github.com/uZhW8Rgl/blockchain-voting.git`

## Step 2. Install dependencies
```
$ cd election
$ npm install
```
## Step 3. Register an Infura key
Signup on Infura and freate a key. You will need the Key in the next step. I specified 40 updates per second in the Infura settings.

## Step 4. Create a .env
Save the Infura key and the Pass Phrase of the key that gets charged for uploading the smart contracts.

```
INFURA_API_KEY = "https://sepolia.infura.io/v3/<Your-API-Key>"
MNEMONIC = "<Your-MetaMask-Secret-Recovery-Phrase>"
```


## Step 5. Compile & Deploy Election Smart Contract
`$ truffle migrate --network sepolia`
Upload your smart contracts to the blockchain.

## Step 6. Configure Metamask
See free video tutorial for full explanation of these steps:
- Unlock Metamask
- Connect metamask to your local Etherum blockchain provided by Ganache.
- Import an account provided by ganache.

## Step 7. Run the Front End Application
`$ npm run dev`
Visit this URL in your browser: http://localhost:3000

If you get stuck, please reference the free video tutorial.
