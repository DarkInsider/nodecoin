import {Blockchain} from "./src/blockchain.mjs";

const blockchain = new Blockchain();

blockchain.createTransaction({amount: 100, sender: "Alice", recipient: "Bob"});
blockchain.createTransaction({amount: 50, sender: "Bob", recipient: "Alice"});

console.log("Starting the miner...");

blockchain.minePendingTransactions("Yev");

console.log("Balance of Alice is", blockchain.getBalanceOfAddress("Alice"));
console.log("Balance of Bob is", blockchain.getBalanceOfAddress("Bob"));

console.log("Balance of Yev is", blockchain.getBalanceOfAddress("Yev"));

console.log("Starting the miner again...");

blockchain.minePendingTransactions("Yev");

console.log("Balance of Yev is", blockchain.getBalanceOfAddress("Yev"));

console.log("Is chain valid?", blockchain.isChainValid());

blockchain.chain[1].transactions[0].amount = 1000;

console.log("Is chain valid?", blockchain.isChainValid());

console.log(JSON.stringify(blockchain, null, 3));


