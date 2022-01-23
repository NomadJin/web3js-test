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
const addressFrom = '0x627306090abaB3A6e1400e9345bC60c78a8BEf57'
const privKey = Buffer.from('51f006b8232cb281be30dc5a895df11e64fe1dc3d090370fd8d11ee54d647146', 'hex')

const contractAddress = "0x7105A11e8487BfaF8c02aA6A7cdA5283f971107c";
const contract = new web3.eth.Contract(IdentityManagerAbi, contractAddress);

const identity = "0xb5CCb24b6E4e1079e838df14d32E9eCB7BF6F8bB";
const value = '2000000000000000000';
const data = "0xf207564e0000000000000000000000000000000000000000000000000000000000035e2f";
const destination = "0xf17f52151EbEF6C7334FAD080c5704D77216b732";

let tx_builder = contract.methods.forwardTo(identity, destination, value, data);
let encoded_tx = tx_builder.encodeABI();

console.log(encoded_tx);

web3.eth.getTransactionCount(addressFrom, "latest").then((txnCount) => {
  var txObject = {
    nonce: web3.utils.numberToHex(txnCount),
    gasPrice: web3.utils.toHex(0),
    gasLimit: web3.utils.toHex(2237312),
    data: encoded_tx,
    to: contractAddress
  };

  // Sign the transaction with the private key
  var tx = new ethTx(txObject);
  tx.sign(privKey)

  //Convert to raw transaction string
  var serializedTx = tx.serialize();
  var rawTxHex = '0x' + serializedTx.toString('hex');

  // log raw transaction data to the console so you can send it manually
  //console.log("Raw transaction data: " + rawTxHex);
  web3.eth.sendSignedTransaction(rawTxHex)
        .on('receipt', receipt => { console.log('Receipt: ', receipt); })
        .catch(error => { console.log('Error: ', error.message); });

}).catch(error => {
  console.log('Error: ', error.message);
})