const VoteCoin = artifacts.require("VoteCoin");
const Publisher = artifacts.require("Publisher");

contract("Publisher", async accounts => {
  let voteCoinContract, publisherContract;

  const owner = accounts[0]
  const otherUser = accounts[1]

  const FIRST_TOKEN_ID = 1
  const SECOND_TOKEN_ID = 2
  const THIRD_TOKEN_ID = 3

  const TOKEN_TYPE = 2

  beforeEach(async function () {
    publisherContract = await Publisher.new();
    voteCoinContract = await VoteCoin.new();

    await voteCoinContract.setPublisher(publisherContract.address);
    await voteCoinContract.addMinter(publisherContract.address);
    await publisherContract.setVoteCoin(voteCoinContract.address);

    console.log(owner);
    console.log(otherUser);
  })

  describe('Mint Token', () => {

    it('should return 0 when no tokens', async () => {
      assert.equal((await voteCoinContract.balanceOf(otherUser)).length, 1)
    })

    it('should count tokens properly', async () => {
        await publisherContract.publish("randomhas1sdf");
        console.log("getting token");
        // console.log("token: ", await voteCoinContract.getToken(1));

        let tokens = await voteCoinContract.balanceOf(otherUser)
        assert.equal(tokens.length, 1)

        await publisherContract.publish("randow2")
        tokens = await voteCoinContract.balanceOf(otherUser)
        assert.equal(tokens.length, 2)
    })
  })
});
