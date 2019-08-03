const Migrations = artifacts.require("Migrations");
const Publisher = artifacts.require("Publisher");
const NoveltyCoin = artifacts.require("NoveltyCoin");

module.exports = function(deployer) {
  deployer.deploy(Migrations);

  let noveltyCoinContract, publisherContract;

  // Deploy the NoveltyCoin ERC721 token
  deployer.deploy(NoveltyCoin)
    .then(function(instance) {
      noveltyCoinContract = instance;
      // Get the deployed instance of Publisher
      return deployer.deploy(Publisher);
    })
    .then(function(instance) {
      publisherContract = instance;
        // Set the instance of NoveltyCoin's address on Publisher
        // via Publisher's setNoveltyCoin() function.
      noveltyCoinContract.setPublisher(publisherContract.address);
      noveltyCoinContract.addMinter(publisherContract.address);
      return publisherContract.setNoveltyCoin(noveltyCoinContract.address);
    });
};
