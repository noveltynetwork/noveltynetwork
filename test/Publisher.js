const assertRevert = require('./support/assert-revert');

const NoveltyCoin = artifacts.require("NoveltyCoin");
const Publisher = artifacts.require("Publisher");
const colors = require('colors');

contract("Publisher", async accounts => {
  let noveltyCoinContract, publisherContract;

  const owner = accounts[0]
  const otherUser = accounts[1]
  const someOtherUser = accounts[2]

  const FIRST_TOKEN_ID = 1
  const SECOND_TOKEN_ID = 2
  const THIRD_TOKEN_ID = 3

  const TOKEN_TYPE = 2

  beforeEach(async function () {
    publisherContract = await Publisher.deployed();
    noveltyCoinContract = await NoveltyCoin.deployed();
  })

  describe('Vote', () => {

    it('Can vote on a Paper', async () => {
      const tx = await publisherContract.publish("randowhas2", { from: otherUser })
      await publisherContract.publish("randow3", { from: someOtherUser })
      const tokenId = tx.logs[0].args.tokenId;
      console.log(tokenId);

      await noveltyCoinContract.approve(publisherContract.address, tokenId, { from: otherUser});
      const transaction = await publisherContract.addVote("randow3", tokenId, { from: otherUser});

      let res = await noveltyCoinContract.getToken(tokenId)
        console.log(res);

    })
  })

});
