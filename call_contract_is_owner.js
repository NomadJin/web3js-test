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


const contractAddress = "0xA9F8FeF0B3DF9159F1443427dAa79210fCEB009C";
const contract = new web3.eth.Contract(IdentityManagerAbi, contractAddress);

const identity = "0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c";
const owner = "0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c";

contract.methods.isOwner(identity, owner).call()
  .then(console.log)
  .catch(console.error);