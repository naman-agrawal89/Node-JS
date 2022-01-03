
const Web3 = require('web3');
const BigNumber = require('bignumber.js')
const { WEB3_BSC_HTTP_NODE_URL, FACTORY_ADDRESS } = require('../config/config');
const ABI = require('../config/abi');
const web3Http = new Web3(new Web3.providers.HttpProvider(WEB3_BSC_HTTP_NODE_URL));

const FACTORY_ABI = [{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"getPair","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]

var factoryInstance = new web3Http.eth.Contract(FACTORY_ABI, FACTORY_ADDRESS);
/**
 * Fetch transaction details when transaction is in pending state
 *
 * @method getPendingTransactionDetails
 * @param {string} transactionHash the transaction hash to query details
 * @return {Object} transaction data
 */
exports.getPendingTransactionDetails = (transactionHash) => {

    return new Promise(function(resolve, reject){

        web3Http.eth.getTransaction(transactionHash).then(function (transaction) {

            if(transaction){

                resolve(transaction);

            } else {

                reject(`TransactionID ${transactionHash} not found - pending`);

            }

        })
        .catch((error) => {
            reject(`TransactionID: ${transactionHash} ${error}`);
        })

    })

}

/**
 * Fetch transaction details when transaction is in pending state
 *
 * @method getTransactionReceipt
 * @param {string} transactionHash the transaction hash to query details
 * @return {Object} transaction receipt
 */
exports.getTransactionReceipt = (transactionHash) => {

    return new Promise(function(resolve, reject){

        web3Http.eth.getTransactionReceipt(transactionHash).then(function (transaction) {

            if(transaction == null || transaction){

                resolve(transaction);

            } else {

                reject(`TransactionID ${transactionHash} not found - receipt`);

            }

        })
        .catch((error) => {
            reject(`TransactionID: ${transactionHash} ${error}`);
        })

    })

}

/**
 * Fetch transaction details when transaction is in pending state
 *
 * @method checkTokenDecimal
 * @param {string} tokenAddress Address of the token contract
 * @return {Number} decimal count of the token
 */
 exports.checkTokenDecimal = (tokenAddress) => {

    return new Promise(function(resolve, reject){

        var tokenInstance = new web3Http.eth.Contract(ABI, tokenAddress);

        tokenInstance.methods.decimals().call(function(err, decimal){
            if(!err){
                resolve(Number(decimal))
            } else {
                reject(err.toString())
            }
        })

    })

}

/**
 * Get Pair address from the two token addresses
 *
 * @method getPairAddress
 * @param {string} token0 Address of the first token of the pair
 * @param {string} token1 Address of tsecond token of the pair
 * @return {Number} decimal count of the token
 */
 exports.getPairAddress = async (token0, token1) => {

    return new Promise(function(resolve, reject){


        factoryInstance.methods.getPair(token0, token1).call(function(err, pair){
            if(!err){
                resolve(pair);
            } else {
                reject(err.toString());
            }
        })

    })

}

/**
 * Get Pair address from the two token addresses
 *
 * @method getSwapEventsTxHashForPair
 * @param {string} pairAddress Pair address of the dex
 * @return {Number} decimal count of the token
 */
 exports.getSwapEventsTxHashForPair = async (pairAddress, blocks) => {


    var pairInstance = new web3Http.eth.Contract(ABI, pairAddress);


    return new Promise(function(resolve, reject){

        web3Http.eth.getBlockNumber(function(err, blocknum){
            if(err){
                reject(err);
            } else {
                console.log(blocknum);

                let startBlockNumber = new BigNumber(blocknum).minus(blocks).toFixed();

                pairInstance.getPastEvents('Swap', {
                    fromBlock: Number(startBlockNumber),
                    toBlock: 'latest'
                }, async function(error, events){ 
                    if(!error){
                        console.log(events.length);

                        if(events.length == 0){
                            
                            reject("No Swap transaction found in this block range");
                        
                        } else {

                            
                            let lastEvent = events[events.length - 1];
                            console.log(lastEvent)
                            let lastEventHash = lastEvent.transactionHash;
                            
                            resolve({lastEventHash, allEventsHash: events.map(function (el) { return el.transactionHash; })});

                        }
                    } else{
                        reject(error.toString())
                    }
                
                })
            }
        })

    })

}