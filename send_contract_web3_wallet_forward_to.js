const Web3 = require("web3");
const IdentityManagerAbi = require("./IdentityManager.json");

const args = process.argv.slice(2);

// web3 initialization - must point to the HTTP JSON-RPC endpoint
var provider = args[0] || 'http://localhost:8545';
console.log("******************************************");
console.log("Using provider : " + provider);
console.log("******************************************");
var web3 = new Web3(new Web3.providers.HttpProvider(provider))
web3.transactionConfirmationBlocks = 1;

const privateKey = 'c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3';

//Creates an account object from a private key.
const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);

//Adds an account using a private key or account object to the wallet.
web3.eth.accounts.wallet.add(account);
//This default address is used as the default "from" property, if no "from" property is specified in for the following methods:
web3.eth.defaultAccount = account.address;

const contractAddress = "0x7105A11e8487BfaF8c02aA6A7cdA5283f971107c";

//For Create Identity Parameter
const identity = "0xE5d47bdB5CC09838f832A5c265Fe44D023cFd1EE";
const value = '1000000000000000000';
const data = "0xf207564e0000000000000000000000000000000000000000000000000000000000035e2f";
const destination = "0xf17f52151EbEF6C7334FAD080c5704D77216b732";

//Create contract object
const contract = new web3.eth.Contract(IdentityManagerAbi, contractAddress);

//Will send a transaction to the smart contract and execute its method. Note this can alter the smart contract state.
contract.methods.forwardTo(identity, destination, value, data).send({
    from: web3.eth.defaultAccount,
    gas: web3.utils.toHex(2237312),
    gasPrice: web3.utils.toHex(0)
  })
  .on('receipt', function (receipt) {
    console.log("******************************************");
    console.log('Receipt: ', receipt);
    console.log("******************************************");
  })
  .catch(error => {
    console.log('Error: ', error.message);
  });