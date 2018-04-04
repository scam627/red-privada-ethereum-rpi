const SHA256 = require('crypto-js/sha256');

class Block{
	constructor(index, timestmap, data, previousHash=''){
		this.index = index;
		this.timestmap = timestmap;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = '';
	}

	calculateHash(){
		return SHA256(this.index + this.previousHash + this.timestmap + JSON.stringify(this.data)).toString();

	}
}

class Blockchain{
	constructor(){
		this.chain = [this.createGenesisBlock()];
	}

	createGenesisBlock(){
		return new Block (0, "28/03/2018", "Genesis block", "0");
	}

	getLatestBlock(){
		return this.chain[this.chain.length - 1];
	}

	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}

	isChainValid(){
		for(let i = 1; i < this.chain.length; i++){
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];
		if(currentBlock.hash !== currentBlock.calculateHash()){
			return false;
		}

		if(currentBlock.previousHash !== previousBlock.hash){
			return false;
		}	
	}

	return true;
	}
}

let stivenCoin = new Blockchain();
stivenCoin.addBlock(new Block(1, "20/03/2018", { amount: 4 }));
stivenCoin.addBlock(new Block(2, "28/03/2018", {amount: 10 }));

console.log("is valid : " + stivenCoin.isChainValid());
//console.log(JSON.stringify(stivenCoin, null, 4))

stivenCoin.chain[1].data={ amount: 100 };

console.log("is valid : " + stivenCoin.isChainValid());
//console.log(JSON.stringify(stivenCoin, null, 4))
