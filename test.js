var Web3 = require('web3');
var fs = require('fs');
const { exit } = require('process');

const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/515bc6d0df73416e938446fd12ae9234"))
const web2 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org"))

const prv = [
];

async function test() {
    for(var i = 0 ; i < prv.length ; i++)
    {
        var prvkey = prv[i];
        var account = web3.eth.accounts.privateKeyToAccount(prvkey)

        if(account["address"] !== undefined) 
        {
            try {
                await web3.eth.getBalance(account["address"], function(err, result) {
                    if (err) {
                        console.log(err)
                    } else {
                        if(result > 0) {
                            var text = prvkey + " " + account["address"] + " " + web3.utils.fromWei(result, "ether") + " ETH \n"
                            fs.appendFile('mynewfile1.txt', text, function (err) {
                            if (err) throw err;
                            });
                            console.log(text)
                            process.exit(1) 
                        } else {
                            console.log("no eth " + i)
                        }
                    }
                })
                
                await web2.eth.getBalance(account["address"], function(err, result) {
                    if (err) {
                        console.log(err)
                    } else {
                        if(result > 0) {
                            var text = prvkey + " " + account["address"] + " " + web3.utils.fromWei(result, "ether") + " BNB \n"
                            fs.appendFile('mynewfile1.txt', text, function (err) {
                            if (err) throw err;
                            });
                            console.log(text)
                            process.exit(1) 
                        } else {
                            console.log("no bnb " + i)
                        }
                    }
                })
            }
            catch(err) {
                console.log(err)
            }
        }
    }
}

test()

// let RegistryContract = new web3.eth.Contract(RegistryABI, RegistryAddress)

// var test = async () => {
//     await RegistryContract.methods
//         .setLogicContract(LogicOneAddress)
//         .send({
//             from: '0x73Fa235d88b39d4Bcb1B3459d26268BA767901d6',
//             value: 0,
//             gas: 1500000,
//             gasPrice: '30000000000000'
//         }, function (res) {
//             console.log(res)
//         })
//         .then(async function (res) {
//             console.log(res)
//         })

//     await RegistryContract.methods.logic_contract().call().then(function (res) {
//         console.log(res)
//     })
// }

// test();

// Registry.at(Registry.address).setLogicContract(LogicOne.address)
// Registry.at(Registry.address).logic_contract()

// LogicOne.at(Registry.address).setVal(2)
// LogicOne.at(Registry.address).val()

// Registry.at(Registry.address).owner()
// Registry.at(Registry.address).setLogicContract(LogicTwo.address)

// LogicTwo.at(Registry.address).setVal(2)
// LogicTwo.at(Registry.address).val()

// LogicOne.at(Registry.address).setVal(2)
// LogicOne.at(Registry.address).val()