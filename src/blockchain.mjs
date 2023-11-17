import { Block } from "./block.mjs";
export class Blockchain {
  constructor() {
    this.difficulty = 3;
    this.chain = [this.createStartBlock()];
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createStartBlock() {
    const startBlock = new Block([], "0");

    startBlock.mineBlock(this.difficulty);

    return startBlock;
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress) {
    let block = new Block(this.pendingTransactions, this.getLatestBlock().calculateHash());
    block.mineBlock(this.difficulty);
    this.chain.push(block);
    this.pendingTransactions = [
      {
        amount: this.miningReward,
        recipient: miningRewardAddress,
        sender: "SYSTEM",
      },
    ];
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;
    for (const block of this.chain) {
      for (const transaction of block.transactions) {
        if (transaction.sender === address) {
          balance -= transaction.amount;
        }
        if (transaction.recipient === address) {
          balance += transaction.amount;
        }
      }
    }
    return balance;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const prevBlock = this.chain[i - 1];
      if (currentBlock.previousHash !== prevBlock.calculateHash()) {
        return false;
      }
    }

    return true;
  }
}
