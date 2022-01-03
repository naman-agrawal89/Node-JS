const ABI = require('../config/abi');
const txDecoder = require('../lib/txDecoder'); // Will be used for transaction decoding

// Configure ABI for transaction decoding
txDecoder.addABI(ABI);

// Encoded method id of all the swap functions from router contract
const swapMethodIds = [
    '0x38ed1739', // swapExactTokensForTokens
    '0x8803dbee', // swapTokensForExactTokens
    '0x7ff36ab5', // swapExactETHForTokens
    '0x4a25d94a', // swapTokensForExactETH
    '0x18cbafe5', // swapExactTokensForETH
    '0xfb3bdb41', // swapETHForExactTokens
    '0x5c11d795', // swapExactTokensForTokensSupportingFeeOnTransferTokens
    '0xb6f9de95', // swapExactETHForTokensSupportingFeeOnTransferTokens
    '0x791ac947'  // swapExactTokensForETHSupportingFeeOnTransferTokens
];

/**
 * Check if transaction is,
 *  - Contract Interaction
 *  - Going to Pancakeswap Router contract
 *  - Any of swap function is executed from the router contract
 *
 * @method checkIfTransactionIsValid
 * @param {string} transactionDetails transaction details returned from `getPendingTransactionDetails` function
 * @return {Boolean} true if transaction is valid swap else false
 */
exports.checkIfTransactionIsValid = (transactionDetails) => {

    if(transactionDetails.input){

        const transactionInput = transactionDetails.input;

        if((transactionInput.length - 10) % 64 === 0){

            const methodId = transactionInput.substring(0, 10);
            
            if(_isSwapFunctionExecuted(methodId)){
                
                return true;
            
            } else {
                
                return false;
            
            }

        } else {
            
            return false;
        
        }

    } else {

        return false;

    }
}

/**
 * Decode events logs
 *
 * @method decodeEventLogs
 * @param {string} logs events logs, can be queried from `getTransactionReceipt` function, 
 * @return {Array} Return array of all the events emitted from the transaction
 */
exports.decodeEventLogs = (logs) => {
    try {
        
        let eventLogs = txDecoder.decodeLogs(logs);
    
        return eventLogs.filter((event) => event);
        
    } catch(err){
        return null;
    }


}

/**
 * Decode transaction input parameters
 *
 * @method decodeInputParams
 * @param {string} inputData Encoded input data, can be queried from `getPendingTransactionDetails` function, 
 * @return {Array} Return array of all the events emitted from the transaction
 */
exports.decodeInputParams = (inputData) => {

    return txDecoder.decodeMethod(inputData);

}

/**
 * Internal function to check if transaction have executed any of swap method of router contract
 *
 * @method _isSwapFunctionExecuted
 * @param {string} methodId encoded methodId of executed function, 
 * @return {Boolean} Return whether method is any of swap method or not
 */
function _isSwapFunctionExecuted(methodId){

    let ids = swapMethodIds.filter(id => id == methodId);

    if(ids.length == 0){
        return false;
    } else {
        return true;
    }

}