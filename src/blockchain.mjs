import { Block } from "./block.mjs";
export class Blockchain {
  constructor() {
    this.chain = [this.createStartBlock()];
    this.difficulty = 3;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createStartBlock() {
    return new Block([], "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress) {
    let block = new Block(this.pendingTransactions, this.getLatestBlock().hash);
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
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== prevBlock.hash) {
        return false;
      }
    }

    return true;
  }
}
