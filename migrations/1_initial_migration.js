const Migrations = artifacts.require("Migrations");
const VoteCoin = artifacts.require("ERC721");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(VoteCoin);
};
