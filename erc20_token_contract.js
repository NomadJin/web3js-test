const Web3 = require("web3");
const ethTx = require('ethereumjs-tx');
const ERC20TokenAbi = require("./ERC20Kaleido.json");

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
// const addressFrom = '0xF7736986af5D9B28eD3462428d35718eA00Fa1FA'
// const privKey = Buffer.from('51f006b8232cb281be30dc5a895df11e64fe1dc3d090370fd8d11ee54d647146', 'hex')

const contractAddress = "0xBF921f94Fd9eF1738bE25D8CeCFDFE2C822c81B0";
const contract = new web3.eth.Contract(ERC20TokenAbi, contractAddress);

const sender = "0xE86fa2efd08dFed4e05468b7F42fFE5bE331Df09";
const recipient = "0xf17f52151EbEF6C7334FAD080c5704D77216b732";
const amount = "100";

let tx_builder = contract.methods.transferFrom(sender, recipient, amount);
let encoded_tx = tx_builder.encodeABI();

console.log(encoded_tx);

// web3.eth.getTransactionCount(addressFrom, "latest").then((txnCount) => {
//   var txObject = {
//     nonce: web3.utils.numberToHex(txnCount),
//     gasPrice: web3.utils.toHex(0),
//     gasLimit: web3.utils.toHex(1237312),
//     data: encoded_tx,
//     to: contractAddress
//   };

//   // Sign the transaction with the private key
//   var tx = new ethTx(txObject);
//   tx.sign(privKey)

//   //Convert to raw transaction string
//   var serializedTx = tx.serialize();
//   var rawTxHex = '0x' + serializedTx.toString('hex');

//   web3.eth.sendSignedTransaction(rawTxHex)
//         .on('receipt', function(receipt) { 
//           console.log('Receipt: ', receipt);
//           console.log('Topics: ', receipt.logs[0].topics);
//         })
//         .catch(error => { console.log('Error: ', error.message); });
// }).catch(error => {
//   console.log('Error: ', error.message);
// })