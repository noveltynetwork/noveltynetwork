const assertRevert = require('./support/assert-revert');

const VoteCoin = artifacts.require("VoteCoin");
const Publisher = artifacts.require("Publisher");
const colors = require('colors');

contract("Publisher", async accounts => {
  let voteCoinContract, publisherContract;

  const owner = accounts[0]
  const otherUser = accounts[1]

  const FIRST_TOKEN_ID = 1
  const SECOND_TOKEN_ID = 2
  const THIRD_TOKEN_ID = 3

  const TOKEN_TYPE = 2

  beforeEach(async function () {
    publisherContract = await Publisher.deployed();
    voteCoinContract = await VoteCoin.deployed();
  })

  describe('Mint Token', () => {

    it('should return 0 when no tokens', async () => {
      assert.equal((await voteCoinContract.balanceOf(otherUser)).length, 1)
    })

    it('should count tokens properly', async () => {

      try {

        let publishResponse = await publisherContract.publish("randomhas1sdf", { from: otherUser });

        console.log("PUBLISH RESPONSE".yellow);
        console.log(publishResponse.logs);

        console.log("getting token");
        // console.log("token: ", await voteCoinContract.getToken(1));

        let tokens = await voteCoinContract.balanceOf(otherUser)
        assert.equal(tokens.length, 1)

        let rePublishResponse = await publisherContract.publish("randow2", { from: otherUser })

        console.log("PUBLISH RESPONSE".yellow);
        console.log(rePublishResponse.logs);

        tokens = await voteCoinContract.balanceOf(otherUser)
        assert.equal(tokens.length, 2)
      } catch(e) {
        console.log("ERROR".red);
        console.log(e);
      }
    })

    it('should emit the bought event', async () => {
      var transaction = await publisherContract.publish("randow3", { from: otherUser })

      // PaperPublished event
      assert.equal(transaction.logs.length, 1)
      assert.equal(transaction.logs[0].event, 'PaperPublished')
      assert.equal(transaction.logs[0].args.tokenId.toString(), THIRD_TOKEN_ID.toString())
    })

    it('should fail to mint new tokens when called by non-minter', async () => {
      assertRevert(voteCoinContract.mint(owner, FIRST_TOKEN_ID.toString(),
          { from: otherUser}))
    })
  })

  describe('getToken', () => {
    it('should return the baseValue and multiplier of the token', async () => {
      var transaction = await publisherContract.publish("randow3", { from: otherUser })
      let res = await voteCoinContract.getToken(FIRST_TOKEN_ID)

      assert.equal(res.baseValue_.toNumber(), 1)
      assert.equal(res.multiplier_, 1)
    })
  })

});
