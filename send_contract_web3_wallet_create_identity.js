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

const privateKey = '8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63';

//For Create Identity Parameter
const owner = "0x627306090abaB3A6e1400e9345bC60c78a8BEf57";
const recoveryKey = "0x627306090abaB3A6e1400e9345bC60c78a8BEf57";

//Creates an account object from a private key.
const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);

//Adds an account using a private key or account object to the wallet.
web3.eth.accounts.wallet.add(account);
//This default address is used as the default "from" property, if no "from" property is specified in for the following methods:
web3.eth.defaultAccount = account.address;

const contractAddress = "0x7105A11e8487BfaF8c02aA6A7cdA5283f971107c";
//Create contract object
const contract = new web3.eth.Contract(IdentityManagerAbi, contractAddress);

//Will send a transaction to the smart contract and execute its method. Note this can alter the smart contract state.
contract.methods.createIdentity(owner, recoveryKey).send({
    from: web3.eth.defaultAccount,
    gas: web3.utils.toHex(1237312),
    gasPrice: web3.utils.toHex(0)
  })
  .on('receipt', function (receipt) {
    console.log("******************************************");
    console.log('Receipt: ', receipt);
    console.log("******************************************");
    console.log('Event LogIdentityCreated: ', receipt.events.LogIdentityCreated.returnValues)
    console.log("******************************************");
  })
  .catch(error => {
    console.log('Error: ', error.message);
  });