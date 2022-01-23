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


const contractAddress = "0x7105A11e8487BfaF8c02aA6A7cdA5283f971107c";
const contract = new web3.eth.Contract(IdentityManagerAbi, contractAddress);

const owner = "0x627306090abaB3A6e1400e9345bC60c78a8BEf57";

contract.methods.getIdentity(owner).call()
  .then(console.log)
  .catch(console.error);