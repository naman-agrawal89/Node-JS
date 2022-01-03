
const Web3 = require('web3');
const { WEB3_BSC_HTTP_NODE_URL } = require('../../../config/config');
const { getPendingTransactionDetails, getTransactionReceipt, checkTokenDecimal, getPairAddress, getSwapEventsTxHashForPair, getReserves, checkTokenName, checkTokenSymbol } = require('../../../lib/web3')
const { checkIfTransactionIsValid, decodeEventLogs, decodeInputParams } = require('../../../lib/lib');

const web3Http = new Web3(new Web3.providers.HttpProvider(WEB3_BSC_HTTP_NODE_URL));
const ABI_RESERVE = [{
    "constant": true,
    "inputs": [],
    "name": "getReserves",
    "outputs": [
      {
        "internalType": "uint112",
        "name": "_reserve0",
        "type": "uint112"
      },
      {
        "internalType": "uint112",
        "name": "_reserve1",
        "type": "uint112"
      },
      {
        "internalType": "uint32",
        "name": "_blockTimestampLast",
        "type": "uint32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }]
exports.home = function (req,res,next){
    res.status(200).send("Hey!");
}

exports.getReserve = async function (req, res, next){
    try {

        let token0 = Web3.utils.toChecksumAddress(req.query.token0);
        let token1 = Web3.utils.toChecksumAddress(req.query.token1);

        let pairAddress = await getPairAddress(token0, token1);

        let token0Details = await getTokenNameSymbolDecimalForPath(token0);
        let token1Details = await getTokenNameSymbolDecimalForPath(token1);

        let reserves = await getReserves(pairAddress, token0, token1);
        console.log(reserves)

        res.status(200).send({
            status: 'success',
            data: {
                pairAddress: pairAddress,
                tokenDetails: {token0: token0Details, token1: token1Details},
                reserve: { token0: reserves.reserveA, token1: reserves.reserveB }
            }
        })
    

    } catch(err){
        res.status(400).send({
            status: 'error',
            data: err.toString()
        })
    }
}

exports.decodeTx = async function (req,res,next){
    let txId = req.query.txId;

    try {

        let txData = await getTransactionDecodedData(txId);

        res.status(200).send({
            status: 'success',
            data: txData
        })

    } catch(err){
        res.status(400).send({
            status: 'error',
            data: err.toString()
        })
    }
}

exports.getLastBlocksTX = async function (req,res,next){


    try {

        let token0 = Web3.utils.toChecksumAddress(req.query.token0);
        let token1 = Web3.utils.toChecksumAddress(req.query.token1);
        let { block = 10 } = req.query;
        console.log(block)
        if(token0 && token1){

            let pairAddress = await getPairAddress(token0, token1);

            if(pairAddress == "0x0000000000000000000000000000000000000000"){
            
                res.status(400).send({
                    status: 'error',
                    data: "Pair is not exists for this token addresses."
                });    
            
            } else {
                let txIDs = await getSwapEventsTxHashForPair(pairAddress, block);

                let txData = await getAllTxData(txIDs.allEventsHash);

                res.status(200).send({
                    status: 'success',
                    data: txData
                });
            
            }

        } else {
            res.status(400).send({
                status: 'error',
                data: "Please provide correct address of the token contract."
            });
        }


    } catch(err){
        res.status(400).send({
            status: 'error',
            data: err.toString()
        });
    }

}

exports.getLastTx = async function (req,res,next){


    try {

        let token0 = Web3.utils.toChecksumAddress(req.query.token0);
        let token1 = Web3.utils.toChecksumAddress(req.query.token1);
        let { block = 500 } = req.query;
        console.log(block)
        if(token0 && token1){

            let pairAddress = await getPairAddress(token0, token1);

            if(pairAddress == "0x0000000000000000000000000000000000000000"){
            
                res.status(400).send({
                    status: 'error',
                    data: "Pair is not exists for this token addresses."
                });    
            
            } else {
                let txIDs = await getSwapEventsTxHashForPair(pairAddress, block);

                let txData = await getTransactionDecodedDataNew(txIDs.lastEventHash);

                res.status(200).send({
                    status: 'success',
                    data: txData
                });
            
            }

        } else {
            res.status(400).send({
                status: 'error',
                data: "Please provide correct address of the token contract."
            });
        }


    } catch(err){
        res.status(400).send({
            status: 'error',
            data: err.toString()
        });
    }

}

async function getAllTxData(txHashArray){
    return new Promise(async function(resolve, reject){


        try {

            let txData = new Array();

            console.log('starting promise')
            
            const promises = txHashArray.map(hash => getTransactionDecodedDataNew(hash))

            txData = await Promise.all(promises)
          
            console.log('promise end: '+txData.length)
            txData = txData.sort(function (a, b) {
                return b.blockNumber - a.blockNumber || b.transactionIndex - a.transactionIndex;
            });

            resolve(txData);
        
        } catch(err){
            reject(err.toString())
        }
    })
}

async function getTransactionDecodedDataNew(transactionId){

    return new Promise(async function(resolve, reject){

        let data = {
            "isTransactionDecodingPossible": true,
            "name": "",
            "inputParams": [],
            "sourceTokenAddress": "",
            "destinationTokenAddress": "",
            "tokenDecimals": {},
            "swapEvents": [],
            "hash": "",//
            "blockNumber": 0,//
            "transactionIndex": 0,//
        }        // Get transaction generat data like from, to and input data from transactionId
        let txDataPending = await getPendingTransactionDetails(transactionId);

        data.hash = txDataPending.hash;
        

        // Step 2 - Check if transaction is valid swap transcation which is sent to pancakeswap router
        let isValid = checkIfTransactionIsValid(txDataPending);
        data.isTransactionDecodingPossible = isValid;

        if(isValid){

            let txDecodedData = decodeInputParams(txDataPending.input);
            data.name = txDecodedData.name;
            data.inputParams= txDecodedData.inputParams;

            let getPath = (txDecodedData.inputParams).find( item => item.name === 'path' );
            let pathArray = getPath.value;

            let tokenDecimals = await getTokenDecimalsForPath(pathArray)

            let sourceTokenAddress = pathArray[0];
            let destinationTokenAddress = pathArray[pathArray.length - 1];

            data.sourceTokenAddress = sourceTokenAddress;
            data.destinationTokenAddress = destinationTokenAddress;
            data.tokenDecimals = tokenDecimals

        }

        let txReceipt = await getTransactionReceipt(transactionId);

        if(txReceipt){

            data.blockNumber = txReceipt.blockNumber;
            data.transactionIndex = txReceipt.transactionIndex;
            
            let decodedEventLogs = decodeEventLogs(txReceipt.logs);
            
            let swapEvent = decodedEventLogs == null ? [] : decodedEventLogs.filter(event => event.name === 'Swap');
            data.swapEvents = swapEvent
        }

        resolve(data)
            
    })

}

/**
 * Decode all transaction data in just one function call
 *
 * @method getTransactionDecodedData
 * @param {string} transactionId transaction hash to decode data, 
 * @return {Object} Return object containing tx decoded data
 */
 async function getTransactionDecodedData(transactionId){

    return new Promise(async function(resolve, reject){
        try{

            let data = {
                "isTransactionDecodingPossible": true,
                "name": "",
                "inputParams": [],
                "sourceTokenAddress": "",
                "destinationTokenAddress": "",
                "tokenDecimals": {},
                "swapEvents": [],
                "hash": "",//
                "blockNumber": 0,//
                "transactionIndex": 0,//
            }

            // Get transaction generat data like from, to and input data from transactionId
            let txDataPending = await getPendingTransactionDetails(transactionId);
            

            // Step 2 - Check if transaction is valid swap transcation which is sent to pancakeswap router
            let isValid = checkIfTransactionIsValid(txDataPending);
            data['isTransactionDecodingPossible'] = isValid;

            if(isValid){
                let txDecodedData = decodeInputParams(txDataPending.input);           
                data['name'] = txDecodedData.name

                // finding path to get source and destination token address of the swap
                let getPath = (txDecodedData.inputParams).find( item => item.name === 'path' );
                let pathArray = getPath.value;

                let tokenDecimals = await getTokenDecimalsForPath(pathArray)

                let sourceTokenAddress = pathArray[0];
                let destinationTokenAddress = pathArray[pathArray.length - 1];

                data['inputParams'] = txDecodedData.inputParams
                data['sourceTokenAddress'] = sourceTokenAddress
                data['destinationTokenAddress'] = destinationTokenAddress
                data['tokenDecimals'] = tokenDecimals
            }
            // Decode transaction input parameters and method name
            // Fetch transaction receipt
            let txReceipt = await getTransactionReceipt(transactionId);
            // Decode transaction events logs
            let decodedEventLogs = decodeEventLogs(txReceipt.logs);
            
            // Filter all `Swap` events from the transaction 
            let swapEvent = decodedEventLogs == null ? [] : decodedEventLogs.filter(event => event.name === 'Swap');
            data['swapEvents'] = swapEvent
            data['hash'] = txDataPending.hash
            data['blockNumber'] = txReceipt.blockNumber
            data['transactionIndex'] = txReceipt.transactionIndex
            // txDecodedData.allEvents = decodedEventLogs; // remove comment if all the emmited events required
            resolve(data);

        }catch(err){
            console.log('catch erro: '+transactionId)
            reject(err);
        }
    })

}

async function getTokenDecimalsForPath(path){
    return new Promise(async function(resolve, reject){

        try {

            let counter = 0;

            let tokenDecimals = {}

            await Promise.all(path.map(async (address) => {
                let decimal = await checkTokenDecimal(address);

                let token = {}
                token.id = address;
                token.decimal = decimal;

                tokenDecimals['token'+counter] = token;
                counter++;
            }));
            
            resolve(tokenDecimals)
        
        } catch(err){
            reject(err.toString())
        }
    })
}


async function getTokenNameSymbolDecimalForPath(address){
    return new Promise(async function(resolve, reject){

        try {

            // let tokenDetails = {}

            // await Promise.all(path.map(async (address) => {
                let id = address;
                let name = await checkTokenName(address);
                let symbol = await checkTokenSymbol(address);
                let decimal = await checkTokenDecimal(address);

                let tokenDetails = {
                    id,name,symbol,decimal
                };
            // }));
            
            resolve(tokenDetails)
        
        } catch(err){
            reject(err.toString())
        }
    })
}
