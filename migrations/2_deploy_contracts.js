var myContract = artifacts.require("JobeumToken.sol");
module.exports = function(deployer) {
  deployer.deploy(myContract, {gas: 5000000});
};
