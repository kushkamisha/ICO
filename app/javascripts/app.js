// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

import jobeumpresale_artifacts from '../../build/contracts/JobeumPresale.json'

var JobeumPresale = contract(jobeumpresale_artifacts);

/**
* Global variables
*/

var send_address = '' // from what account confirm transactions

/**
* Get number of tokens for transaction id
*/
var tokens_amount;

function tokensByBtcTx(_txId) {
    JobeumPresale.setProvider(web3.currentProvider);
    JobeumPresale.deployed().then(function(contractInstance) {
        contractInstance.tokensByBtcTx(_txId).then(function(v) {
            tokens_amount = Number(v);
        });
    });
}

function tokensByLtcTx(_txId) {
    JobeumPresale.setProvider(web3.currentProvider);
    JobeumPresale.deployed().then(function(contractInstance) {
        contractInstance.tokensByLtcTx(_txId).then(function(v) {
            tokens_amount = Number(v);
        });
    });
}

function tokensByZecTx(_txId) {
    JobeumPresale.setProvider(web3.currentProvider);
    JobeumPresale.deployed().then(function(contractInstance) {
        contractInstance.tokensByZecTx(_txId).then(function(v) {
            tokens_amount = Number(v);
        });
    });
}

function tokensByDashTx(_txId) {
    JobeumPresale.setProvider(web3.currentProvider);
    JobeumPresale.deployed().then(function(contractInstance) {
        contractInstance.tokensByDashTx(_txId).then(function(v) {
            tokens_amount = Number(v);
        });
    });
}

function tokensByWavesTx(_txId) {
    JobeumPresale.setProvider(web3.currentProvider);
    JobeumPresale.deployed().then(function(contractInstance) {
        contractInstance.tokensByWavesTx(_txId).then(function(v) {
            tokens_amount = Number(v);
        });
    });
}

/**
* Get id of the currency
*/
var currency = {}

function btcId() {
    JobeumPresale.setProvider(web3.currentProvider);
    JobeumPresale.deployed().then(function(contractInstance) {
        contractInstance.btcId.call().then(function(v) {
            currency["btc"] = Number(v);
        });
    });
}

function ltcId() {
    JobeumPresale.setProvider(web3.currentProvider);
    JobeumPresale.deployed().then(function(contractInstance) {
        contractInstance.ltcId.call().then(function(v) {
            currency["ltc"] = Number(v);
        });
    });
}

function zecId() {
    JobeumPresale.setProvider(web3.currentProvider);
    JobeumPresale.deployed().then(function(contractInstance) {
        contractInstance.zecId.call().then(function(v) {
            currency["zec"] = Number(v);
        });
    });
}

function dashId() {
    JobeumPresale.setProvider(web3.currentProvider);
    JobeumPresale.deployed().then(function(contractInstance) {
        contractInstance.dashId.call().then(function(v) {
            currency["dash"] = Number(v);
        });
    });
}

function wavesId() {
    JobeumPresale.setProvider(web3.currentProvider);
    JobeumPresale.deployed().then(function(contractInstance) {
        contractInstance.wavesId.call().then(function(v) {
            currency["waves"] = Number(v);
        });
    });
}

// Get number of every currency
function getCurrencyesId() {
    btcId();
    ltcId();
    zecId();
    dashId();
    wavesId();
}

/**
* 
*/
window.externalSales = function(
        _currencies,
        _txId,
        _buyers,
        _amountsWei,
        _tokensE18,
        db_amount,
        currency) {
    try {
        // change status to "Pending..."

         Faucet.deployed().then(function(contractInstance) {
            contractInstance.replenish([_currencies, web3.sha3(_txId), _buyers, _amountsWei, _tokensE18], {gas: 200000, from: send_address}).then(function() {
                switch(currency) {
                    case "btc":
                        tokensByBtcTx(_txId);
                        break;
                    case "ltc":
                        tokensByLtcTx(_txId);
                        break;
                    case "zec":
                        tokensByZecTx(_txId);
                        break;
                    case "dash":
                        tokensByDashTx(_txId);
                        break;
                    case "waves":
                        tokensByWavesTx(_txId);
                        break;
                }

                setTimeout(function() {
                    if (db_amount == tokens_amount) {
                        // change status to "Issued"
                    } else {
                        // change status to "Warning"
                    }
                }, 1000);
            });
         });
    } catch (err) {
        console.log(err);
    }
}

$(document).ready(function() {
    if (typeof web3 !== 'undefined') {
        console.warn("Using web3 detected from external source like Metamask")
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    // Get number of every currency
    getCurrencyesId();
    setTimeout(function() {
        console.log(currency);
    }, 1000);

    // Get tokens by tx id
    tokensByZecTx('1f923603227da4fb0b20db2316f509852b1708c92cba01f4be26ed68a2fbeb40');
    setTimeout(function() {
        console.log(tokens_amount);
    }, 1000);

    // user => (TxId, currency = {'btc', 'ltc', 'zec', 'dash', 'waves'}, [address] | [transactions][ethAddress], web3.toWei(Amount in ETH (without ETH)), db_amount = web3.toWei(Tokens (without JTC)))


});