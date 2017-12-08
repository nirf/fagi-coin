const SHA256 = require('crypto-js/sha256')

class Block {
    // where the block sits on the chain
    index: any
    // when the block was created
    timestamp: any
    // any type of data you want to associate with this block
    // in case of currency we want to store the details of the transaction(amount, sender, receiver)
    data: any
    // string that contains the hash of the block before this one, ensure
    // the integrity of our blockchain
    previousHash: any
    // this block hash :)
    hash: any

    constructor(index: any, timestamp: any, data: any, previousHash = '') {
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash()
    }

    calculateHash() {
        return ''
        //SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString()
    }
}

console.log('starting...')