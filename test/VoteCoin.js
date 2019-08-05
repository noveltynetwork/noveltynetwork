const assertRevert = require("./support/assert-revert");

const NoveltyCoin = artifacts.require("NoveltyCoin");
const Publisher = artifacts.require("Publisher");
const colors = require("colors");

contract("NoveltyCoin", async accounts => {
    let noveltyCoinContract, publisherContract;

    const owner = accounts[0];
    const otherUser = accounts[1];

    const FIRST_TOKEN_ID = 1;
    const SECOND_TOKEN_ID = 2;
    const THIRD_TOKEN_ID = 3;

    const TOKEN_TYPE = 2;

    beforeEach(async function() {
        publisherContract = await Publisher.deployed();
        noveltyCoinContract = await NoveltyCoin.deployed();
    });

    describe("Mint Token", () => {
        it("should return 0 when no tokens", async () => {
            assert.equal(
                (await noveltyCoinContract.balanceOf(otherUser)).length,
                1
            );
        });

        it("should count tokens properly", async () => {
            try {
                let publishResponse = await publisherContract.publish(
                    "paper1",
                    "global warming",
                    "randomhas1sdf",
                    { from: otherUser }
                );

                console.log("PUBLISH RESPONSE".yellow);
                console.log(publishResponse.logs);

                console.log("getting token");

                let tokens = await noveltyCoinContract.balanceOf(otherUser);
                assert.equal(tokens.length, 1);

                let rePublishResponse = await publisherContract.publish(
                    "paper2",
                    "global warning",
                    "randow2",
                    { from: otherUser }
                );

                console.log("PUBLISH RESPONSE".yellow);
                console.log(rePublishResponse.logs);

                tokens = await noveltyCoinContract.balanceOf(otherUser);
                assert.equal(tokens.length, 2);
            } catch (e) {
                console.log("ERROR".red);
                console.log(e);
            }
        });

        it("should emit the bought event", async () => {
            const transaction = await publisherContract.publish(
                "Paper3",
                "global warping",
                "randow3",
                { from: otherUser }
            );

            // PaperPublished event
            assert.equal(transaction.logs.length, 1);
            assert.equal(transaction.logs[0].event, "PaperPublished");
            assert.equal(
                transaction.logs[0].args.tokenId.toString(),
                THIRD_TOKEN_ID.toString()
            );
        });

        it("should fail to mint new tokens when called by non-minter", async () => {
            assertRevert(
                noveltyCoinContract.mint(owner, FIRST_TOKEN_ID.toString(), {
                    from: otherUser
                })
            );
            assertRevert(
                noveltyCoinContract.mint(owner, FIRST_TOKEN_ID.toString(), {
                    from: owner
                })
            );
        });
    });

    describe("getToken", () => {
        it("should return the baseValue and multiplier of the token", async () => {
            const transaction = await publisherContract.publish(
                "paper4",
                "global wanting",
                "randow3",
                { from: otherUser }
            );
            let res = await noveltyCoinContract.getToken(FIRST_TOKEN_ID);

            assert.equal(res.baseValue_.toNumber(), 1);
            assert.equal(res.multiplier_, 1);
        });
    });
});
