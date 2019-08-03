const Migrations = artifacts.require("Migrations");
const Publisher = artifacts.require("Publisher");
const VoteCoin = artifacts.require("ERC721");

module.exports = function(deployer) {
  deployer.deploy(Migrations);

  let voteCoinContract, publisherContract;

  // Deploy the VoteCoin ERC721 token
  deployer.deploy(VoteCoin)
    .then(function(instance) {
      voteCoinContract = instance;
      // Get the deployed instance of Publisher
      return deployer.deploy(Publisher);
    })
    .then(function(instance) {
      publisherContract = instance;
        // Set the instance of VoteCoin's address on Publisher
        // via Publisher's setVoteCoin() function.
      return publisherContract.setVoteCoin(voteCoinContract.address);
    });
};
