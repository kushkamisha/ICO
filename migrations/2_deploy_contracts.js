var myContract = artifacts.require("JobeumPresale.sol");
module.exports = function(deployer) {
  deployer.deploy(myContract, {gas: 5000000});
};
