# PanCakeSwap TX Server
Tool to decode pancake swap router swap transcations input parameter and query data from last few blocks.

## Usage

```
$ npm i 
$ npm start
```

# API Doc

API endpoints: 

* GET /decode
* GET /lastblocks
* GET /lasttx
* GET /getreserve

#### 1. GET /decode

- Decode single transaction data by transaction hash.
##### Query Parameter
|Name|Type|Required|Description|
|---|---|---|---|
|txId|String|Yes|Transaction hash to decode data|

##### Success Response (HTTP Status code: 200)
```json
{
    "status": "success",
    "data": {
        "isTransactionDecodingPossible": true,
        "name": "swapExactTokensForTokens",
        "inputParams": [
            {
                "name": "amountIn",
                "value": "1000000000000000000000",
                "type": "uint256"
            },
            {
                "name": "amountOutMin",
                "value": "4057383278476485103090",
                "type": "uint256"
            },
            {
                "name": "path",
                "value": [
                    "0xc13b7a43223bb9bf4b69bd68ab20ca1b79d81c75",
                    "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
                    "0xe9e7cea3dedca5984780bafc599bd69add087d56"
                ],
                "type": "address[]"
            },
            {
                "name": "to",
                "value": "0x4b3d238968986c5527c8854f7c75adca5b2934c0",
                "type": "address"
            },
            {
                "name": "deadline",
                "value": "1618293605",
                "type": "uint256"
            }
        ],
        "sourceTokenAddress": "0xc13b7a43223bb9bf4b69bd68ab20ca1b79d81c75",
        "destinationTokenAddress": "0xe9e7cea3dedca5984780bafc599bd69add087d56",
        "tokenDecimals": {
            "0xc13b7a43223bb9bf4b69bd68ab20ca1b79d81c75": 18,
            "0xe9e7cea3dedca5984780bafc599bd69add087d56": 18,
            "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c": 18
        },
        "swapEvents": [
            {
                "name": "Swap",
                "events": [
                    {
                        "name": "sender",
                        "type": "address",
                        "value": "0x05ff2b0db69458a0750badebc4f9e13add608c7f"
                    },
                    {
                        "name": "amount0In",
                        "type": "uint256",
                        "value": "0"
                    },
                    {
                        "name": "amount1In",
                        "type": "uint256",
                        "value": "1000000000000000000000"
                    },
                    {
                        "name": "amount0Out",
                        "type": "uint256",
                        "value": "7260737265441858228"
                    },
                    {
                        "name": "amount1Out",
                        "type": "uint256",
                        "value": "0"
                    },
                    {
                        "name": "to",
                        "type": "address",
                        "value": "0x1b96b92314c44b159149f7e0303511fb2fc4774f"
                    }
                ],
                "address": "0x890479844484D67e34B99e1BBc1468231b254c08",
                "logIndex": 344
            },
            {
                "name": "Swap",
                "events": [
                    {
                        "name": "sender",
                        "type": "address",
                        "value": "0x05ff2b0db69458a0750badebc4f9e13add608c7f"
                    },
                    {
                        "name": "amount0In",
                        "type": "uint256",
                        "value": "7260737265441858228"
                    },
                    {
                        "name": "amount1In",
                        "type": "uint256",
                        "value": "0"
                    },
                    {
                        "name": "amount0Out",
                        "type": "uint256",
                        "value": "0"
                    },
                    {
                        "name": "amount1Out",
                        "type": "uint256",
                        "value": "4143446995826606629744"
                    },
                    {
                        "name": "to",
                        "type": "address",
                        "value": "0x4b3d238968986c5527c8854f7c75adca5b2934c0"
                    }
                ],
                "address": "0x1B96B92314C44b159149f7E0303511fB2Fc4774f",
                "logIndex": 347
            }
        ],
        "hash": "0x2bdb2ccdc73c044a29b259bbf8ca0308fc30c6ebe631c7313326fd34410af71f",
        "blockNumber": 6521450,
        "transactionIndex": 79
    }
}
```
#### 2. GET /lastblocks

- Query all the decoded transaction data from last few blocks.
##### Query Parameter
|Name|Type|Required|Description|
|---|---|---|---|
|token0|String|Yes|Address of the first token address of the pair|
|token1|String|Yes|Address of the second token address of the pair|
|block|String|Yes|Number of last blocks to query transactions. Default value: 10|

##### Success Response (HTTP Status code: 200)
```json
{
    "status": "success",
    "data": [
        {
            "isTransactionDecodingPossible": true,
            "name": "swapExactTokensForTokens",
            "inputParams": [
                {
                    "name": "amountIn",
                    "value": "1842007453596243",
                    "type": "uint256"
                },
                {
                    "name": "amountOutMin",
                    "value": "12337650838111306332",
                    "type": "uint256"
                },
                {
                    "name": "path",
                    "value": [
                        "0x242e46490397acca94ed930f2c4edf16250237fa",
                        "0xe9e7cea3dedca5984780bafc599bd69add087d56",
                        "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
                        "0x35e869b7456462b81cdb5e6e42434bd27f3f788c"
                    ],
                    "type": "address[]"
                },
                {
                    "name": "to",
                    "value": "0x7bb2fcf1dec89ad9cd6818d636deea845b1aa1da",
                    "type": "address"
                },
                {
                    "name": "deadline",
                    "value": "1618294298",
                    "type": "uint256"
                }
            ],
            "sourceTokenAddress": "0x242e46490397acca94ed930f2c4edf16250237fa",
            "destinationTokenAddress": "0x35e869b7456462b81cdb5e6e42434bd27f3f788c",
            "tokenDecimals": {
                "0xe9e7cea3dedca5984780bafc599bd69add087d56": 18,
                "0x242e46490397acca94ed930f2c4edf16250237fa": 18,
                "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c": 18,
                "0x35e869b7456462b81cdb5e6e42434bd27f3f788c": 18
            },
            "swapEvents": [
                {
                    "name": "Swap",
                    "events": [
                        {
                            "name": "sender",
                            "type": "address",
                            "value": "0x05ff2b0db69458a0750badebc4f9e13add608c7f"
                        },
                        {
                            "name": "amount0In",
                            "type": "uint256",
                            "value": "1842007453596243"
                        },
                        {
                            "name": "amount1In",
                            "type": "uint256",
                            "value": "0"
                        },
                        {
                            "name": "amount0Out",
                            "type": "uint256",
                            "value": "0"
                        },
                        {
                            "name": "amount1Out",
                            "type": "uint256",
                            "value": "12968682411248062082"
                        },
                        {
                            "name": "to",
                            "type": "address",
                            "value": "0x1b96b92314c44b159149f7e0303511fb2fc4774f"
                        }
                    ],
                    "address": "0x4925D290b22A9c19e126583a4dc858fBe909B014",
                    "logIndex": 215
                },
                {
                    "name": "Swap",
                    "events": [
                        {
                            "name": "sender",
                            "type": "address",
                            "value": "0x05ff2b0db69458a0750badebc4f9e13add608c7f"
                        },
                        {
                            "name": "amount0In",
                            "type": "uint256",
                            "value": "0"
                        },
                        {
                            "name": "amount1In",
                            "type": "uint256",
                            "value": "12968682411248062082"
                        },
                        {
                            "name": "amount0Out",
                            "type": "uint256",
                            "value": "22884738441324731"
                        },
                        {
                            "name": "amount1Out",
                            "type": "uint256",
                            "value": "0"
                        },
                        {
                            "name": "to",
                            "type": "address",
                            "value": "0x083f8fd2e4ef068e84db3742b1e8b03a3d8a363a"
                        }
                    ],
                    "address": "0x1B96B92314C44b159149f7E0303511fB2Fc4774f",
                    "logIndex": 218
                },
                {
                    "name": "Swap",
                    "events": [
                        {
                            "name": "sender",
                            "type": "address",
                            "value": "0x05ff2b0db69458a0750badebc4f9e13add608c7f"
                        },
                        {
                            "name": "amount0In",
                            "type": "uint256",
                            "value": "0"
                        },
                        {
                            "name": "amount1In",
                            "type": "uint256",
                            "value": "22884738441324731"
                        },
                        {
                            "name": "amount0Out",
                            "type": "uint256",
                            "value": "12487908552316901393"
                        },
                        {
                            "name": "amount1Out",
                            "type": "uint256",
                            "value": "0"
                        },
                        {
                            "name": "to",
                            "type": "address",
                            "value": "0x7bb2fcf1dec89ad9cd6818d636deea845b1aa1da"
                        }
                    ],
                    "address": "0x083F8FD2E4ef068e84dB3742B1e8B03a3d8A363A",
                    "logIndex": 221
                }
            ],
            "hash": "0x19137bad4bb43702da7eb97b42f399e3d88beb04c15faaf36005cd7918b5482b",
            "blockNumber": 6521697,
            "transactionIndex": 77
        },
        {
            "isTransactionDecodingPossible": false,
            "name": "",
            "inputParams": [],
            "sourceTokenAddress": "",
            "destinationTokenAddress": "",
            "tokenDecimals": {},
            "swapEvents": [
                {
                    "name": "Swap",
                    "events": [
                        {
                            "name": "sender",
                            "type": "address",
                            "value": "0xb7e19a1188776f32e8c2b790d9ca578f2896da7c"
                        },
                        {
                            "name": "amount0In",
                            "type": "uint256",
                            "value": "0"
                        },
                        {
                            "name": "amount1In",
                            "type": "uint256",
                            "value": "389022588902368235021"
                        },
                        {
                            "name": "amount0Out",
                            "type": "uint256",
                            "value": "685788583142963715"
                        },
                        {
                            "name": "amount1Out",
                            "type": "uint256",
                            "value": "0"
                        },
                        {
                            "name": "to",
                            "type": "address",
                            "value": "0xb7e19a1188776f32e8c2b790d9ca578f2896da7c"
                        }
                    ],
                    "address": "0x1B96B92314C44b159149f7E0303511fB2Fc4774f",
                    "logIndex": 148
                },
                {
                    "name": "Swap",
                    "events": [
                        {
                            "name": "sender",
                            "type": "address",
                            "value": "0xb7e19a1188776f32e8c2b790d9ca578f2896da7c"
                        },
                        {
                            "name": "amount0In",
                            "type": "uint256",
                            "value": "0"
                        },
                        {
                            "name": "amount1In",
                            "type": "uint256",
                            "value": "685788583142963715"
                        },
                        {
                            "name": "amount0Out",
                            "type": "uint256",
                            "value": "11957117525032587272"
                        },
                        {
                            "name": "amount1Out",
                            "type": "uint256",
                            "value": "0"
                        },
                        {
                            "name": "to",
                            "type": "address",
                            "value": "0xb7e19a1188776f32e8c2b790d9ca578f2896da7c"
                        }
                    ],
                    "address": "0x5510b42B41DF8E0bE172eDe5b9e0d7e7913aD4da",
                    "logIndex": 153
                },
                {
                    "name": "Swap",
                    "events": [
                        {
                            "name": "sender",
                            "type": "address",
                            "value": "0xb7e19a1188776f32e8c2b790d9ca578f2896da7c"
                        },
                        {
                            "name": "amount0In",
                            "type": "uint256",
                            "value": "0"
                        },
                        {
                            "name": "amount1In",
                            "type": "uint256",
                            "value": "310977411097631764979"
                        },
                        {
                            "name": "amount0Out",
                            "type": "uint256",
                            "value": "9583732999467857254"
                        },
                        {
                            "name": "amount1Out",
                            "type": "uint256",
                            "value": "0"
                        },
                        {
                            "name": "to",
                            "type": "address",
                            "value": "0xb7e19a1188776f32e8c2b790d9ca578f2896da7c"
                        }
                    ],
                    "address": "0xd7c5fe2755598E0C0b00fC5D7701022d4B519a63",
                    "logIndex": 158
                }
            ],
            "hash": "0xd58d73beba9117d99d6e50a0d63c65de2b8eb363063cd97bd61812fb68d6a938",
            "blockNumber": 6521697,
            "transactionIndex": 74
        }
    ]
}
```

#### 3. GET /lasttx

- Get the last decoded swap transactions.
##### Query Parameter
|Name|Type|Required|Description|
|---|---|---|---|
|token0|String|Yes|Address of the first token address of the pair|
|token1|String|Yes|Address of the second token address of the pair|
|block|String|Optional|Number of last blocks to query transaction from. Reduce block number to get response faster. Default value: 500|

##### Success Response (HTTP Status code: 200)
```json
{
    "status": "success",
    "data": {
        "isTransactionDecodingPossible": true,
        "name": "swapExactTokensForTokens",
        "inputParams": [
            {
                "name": "amountIn",
                "value": "1000000",
                "type": "uint256"
            },
            {
                "name": "amountOutMin",
                "value": "65372845287349188454",
                "type": "uint256"
            },
            {
                "name": "path",
                "value": [
                    "0x2222227e22102fe3322098e4cbfe18cfebd57c95",
                    "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
                    "0xe9e7cea3dedca5984780bafc599bd69add087d56"
                ],
                "type": "address[]"
            },
            {
                "name": "to",
                "value": "0xd7f52f9a6bc740fc6b235f89d31998eebca9ca20",
                "type": "address"
            },
            {
                "name": "deadline",
                "value": "1618305498",
                "type": "uint256"
            }
        ],
        "sourceTokenAddress": "0x2222227e22102fe3322098e4cbfe18cfebd57c95",
        "destinationTokenAddress": "0xe9e7cea3dedca5984780bafc599bd69add087d56",
        "tokenDecimals": {
            "0x2222227e22102fe3322098e4cbfe18cfebd57c95": 4,
            "0xe9e7cea3dedca5984780bafc599bd69add087d56": 18,
            "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c": 18
        },
        "swapEvents": [
            {
                "name": "Swap",
                "events": [
                    {
                        "name": "sender",
                        "type": "address",
                        "value": "0x05ff2b0db69458a0750badebc4f9e13add608c7f"
                    },
                    {
                        "name": "amount0In",
                        "type": "uint256",
                        "value": "1000000"
                    },
                    {
                        "name": "amount1In",
                        "type": "uint256",
                        "value": "0"
                    },
                    {
                        "name": "amount0Out",
                        "type": "uint256",
                        "value": "0"
                    },
                    {
                        "name": "amount1Out",
                        "type": "uint256",
                        "value": "122598788757990682"
                    },
                    {
                        "name": "to",
                        "type": "address",
                        "value": "0x1b96b92314c44b159149f7e0303511fb2fc4774f"
                    }
                ],
                "address": "0x34e821e785A93261B697eBD2797988B3AA78ca33",
                "logIndex": 273
            },
            {
                "name": "Swap",
                "events": [
                    {
                        "name": "sender",
                        "type": "address",
                        "value": "0x05ff2b0db69458a0750badebc4f9e13add608c7f"
                    },
                    {
                        "name": "amount0In",
                        "type": "uint256",
                        "value": "122598788757990682"
                    },
                    {
                        "name": "amount1In",
                        "type": "uint256",
                        "value": "0"
                    },
                    {
                        "name": "amount0Out",
                        "type": "uint256",
                        "value": "0"
                    },
                    {
                        "name": "amount1Out",
                        "type": "uint256",
                        "value": "65767744065154082473"
                    },
                    {
                        "name": "to",
                        "type": "address",
                        "value": "0xd7f52f9a6bc740fc6b235f89d31998eebca9ca20"
                    }
                ],
                "address": "0x1B96B92314C44b159149f7E0303511fB2Fc4774f",
                "logIndex": 276
            }
        ],
        "hash": "0x6f652327a1c51ebdad4ea8820e2538208a98cb1f28b3d047db5b53fbae1b7d2f",
        "blockNumber": 6525609,
        "transactionIndex": 104
    }
}
```

#### 4. GET /getreserve

- Get the pancakeswap reserver for the pool.
##### Query Parameter
|Name|Type|Required|Description|
|---|---|---|---|
|token0|String|Yes|Address of the first token address of the pair|
|token1|String|Yes|Address of the second token address of the pair|

##### Success Response (HTTP Status code: 200)

```json
{
    "status": "success",
    "data": {
        "pairAddress": "0x1B96B92314C44b159149f7E0303511fB2Fc4774f",
        "tokenDetails": {
            "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c": {
                "name": "Wrapped BNB",
                "symbol": "WBNB",
                "decimal": 18
            },
            "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56": {
                "name": "BUSD Token",
                "symbol": "BUSD",
                "decimal": 18
            }
        },
        "reserve": {
            "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c": "443295598265086787381255",
            "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56": "253419709756974238263826366"
        }
    }
}
```