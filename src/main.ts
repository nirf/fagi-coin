const SHA256 = require('crypto-js/sha256')

class Block {
    // where the block sits on the chain
    index: number
    // when the block was created
    timestamp: Date
    // any type of data you want to associate with this block
    // in case of currency we want to store the details of the transaction(amount, sender, receiver)
    data: any
    // string that contains the hash of the block before this one, ensure
    // the integrity of our blockchain
    previousHash: string
    // this block hash :)
    hash: string
    //
    nonse: number

    constructor(index: any, timestamp: any, data: any, previousHash = '') {
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash()
        this.nonse = 0
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonse).toString()
    }

    mineBlock(difficulty: number) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonse++
            this.hash = this.calculateHash()
        }

        console.log('Block mined: ' + this.hash)
    }
}

class Blockchain {
    chain: Block[]
    difficulty: number
    constructor(difficulty: number) {
        this.chain = [this.createGenesisBlock()]
        this.difficulty = difficulty
    }

    createGenesisBlock(): Block {
        return new Block(0, new Date(), 'Genesis Block', '0')
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1]
    }

    addBlock(block: Block) {
        block.previousHash = this.getLatestBlock().hash
        block.mineBlock(this.difficulty)
        this.chain.push(block)
    }

    isChainValid(): boolean {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false
            }
        }
        return true
    }
}


let fagiCoin = new Blockchain(4)
fagiCoin.addBlock(new Block(1, new Date(), {amount: 4}))
fagiCoin.addBlock(new Block(2, new Date(), {amount: 10}))
console.log(fagiCoin.isChainValid())
console.log(JSON.stringify(fagiCoin, undefined, 2))