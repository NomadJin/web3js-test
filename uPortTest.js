const lightwallet = require('eth-signer');


function getRanomNumber() {
  return Math.floor(Math.random() * (1000000 - 1)) + 1;
}


let testNum = getRanomNumber();
const data = lightwallet.txutils._encodeFunctionTxData('register', ['uint256'], [testNum]);

console.log('0x' + data);