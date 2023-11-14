import { v4 } from "uuid";
import sha256 from "crypto-js/sha256.js";

export class Block {
  constructor(transactions, previousHash = "") {
    this.id = v4();
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.timestamp = Date.now();
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return sha256(
      this.id +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.nonce,
    ).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}
