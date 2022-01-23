const Web3 = require('web3');
const EEAClient = require("web3-eea");
const web3 = new EEAClient(new Web3("https://k0k6ckee7o:rwQx299hRi2feX__uVh0Omc6sn09dEJ4RMf1ebjAdTs@k0i18gqm3w-k0fsvev4tu-rpc.kr0-aws.kaleido.io"), 427148192);


const contractOptions = {
  data: `0x608060405234801561001057600080fd5b5060405161014c38038061014c8339818101604052602081101561003357600080fd5b8101908080519060200190929190505050806000819055505060f28061005a6000396000f3fe6080604052348015600f57600080fd5b5060043610603c5760003560e01c80632a1afcd914604157806360fe47b114605d5780636d4ce63c146088575b600080fd5b604760a4565b6040518082815260200191505060405180910390f35b608660048036036020811015607157600080fd5b810190808035906020019092919050505060aa565b005b608e60b4565b6040518082815260200191505060405180910390f35b60005481565b8060008190555050565b6000805490509056fea265627a7a723158201cf424be9a4eef434d73f69c98359c285737695d6cd27f913e903c92ed4d29b564736f6c634300051000320000000000000000000000000000000000000000000000000000000000000000`, // contract binary
  privateFrom: "nMNjd4ebmR8hGsnUpbsxpaJ9NjYvCUsSOz+iEouozEc=",
  privateFor: ["+5d30w3G3JAQBCcldxSEOyz9PPEJI8tcbdxkRBgVvGA="],
  privateKey: "8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63"
};

console.log(web3.eea.getTransactionReceipt(web3.eea.sendRawTransaction(contractOptions)));