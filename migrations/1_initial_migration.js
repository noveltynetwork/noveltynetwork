const Migrations = artifacts.require("Migrations");
const Publisher = artifacts.require("Publisher");
const VoteCoin = artifacts.require("VoteCoin");

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
      voteCoinContract.setPublisher(publisherContract.address);
      voteCoinContract.addMinter(publisherContract.address);
      return publisherContract.setVoteCoin(voteCoinContract.address);
    });
};
