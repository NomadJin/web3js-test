const Web3 = require("web3");
const ethTx = require('ethereumjs-tx');
const IdentityManagerAbi = require("./IdentityManager.json");

const args = process.argv.slice(2);

// web3 initialization - must point to the HTTP JSON-RPC endpoint
var provider = args[0] || 'http://localhost:8545';
console.log("******************************************");
console.log("Using provider : " + provider);
console.log("******************************************");
var web3 = new Web3(new Web3.providers.HttpProvider(provider))
web3.transactionConfirmationBlocks = 1;
// Sender address and private key
// Second acccount in dev.json genesis file
// Exclude 0x at the beginning of the private key
const addressFrom = '0xF7736986af5D9B28eD3462428d35718eA00Fa1FA'
const privKey = Buffer.from('51f006b8232cb281be30dc5a895df11e64fe1dc3d090370fd8d11ee54d647146', 'hex')

const contractAddress = "0x7105A11e8487BfaF8c02aA6A7cdA5283f971107c";
const contract = new web3.eth.Contract(IdentityManagerAbi, contractAddress);

const owner = "0x627306090abaB3A6e1400e9345bC60c78a8BEf57";
const recoveryKey = "0x627306090abaB3A6e1400e9345bC60c78a8BEf57";

let tx_builder = contract.methods.createIdentity(owner, recoveryKey);
let encoded_tx = tx_builder.encodeABI();

console.log(encoded_tx);

web3.eth.getTransactionCount(addressFrom, "latest").then((txnCount) => {
  var txObject = {
    nonce: web3.utils.numberToHex(txnCount),
    gasPrice: web3.utils.toHex(0),
    gasLimit: web3.utils.toHex(1237312),
    data: encoded_tx,
    to: contractAddress
  };

  // Sign the transaction with the private key
  var tx = new ethTx(txObject);
  tx.sign(privKey)

  //Convert to raw transaction string
  var serializedTx = tx.serialize();
  var rawTxHex = '0x' + serializedTx.toString('hex');

  web3.eth.sendSignedTransaction(rawTxHex)
        .on('receipt', function(receipt) { 
          console.log('Receipt: ', receipt);
          console.log('Topics: ', receipt.logs[0].topics);
        })
        .catch(error => { console.log('Error: ', error.message); });
}).catch(error => {
  console.log('Error: ', error.message);
})