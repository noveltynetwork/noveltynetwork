const assertRevert = require("./support/assert-revert");

const NoveltyCoin = artifacts.require("NoveltyCoin");
const Publisher = artifacts.require("Publisher");
const colors = require("colors");

contract("Publisher", async accounts => {
    let noveltyCoinContract, publisherContract;

    const owner = accounts[0];

    const USER_1 = accounts[1];
    const USER_1_PAPER = "paper1";
    const USER_2 = accounts[2];
    const USER_2_PAPER = "paper2";

    const FIRST_TOKEN_ID = 1;
    const SECOND_TOKEN_ID = 2;
    const THIRD_TOKEN_ID = 3;

    beforeEach(async function() {
        publisherContract = await Publisher.deployed();
        noveltyCoinContract = await NoveltyCoin.deployed();
    });

    describe("Vote", () => {
        it("Can vote on a Paper", async () => {
            const tx = await publisherContract.publish(
                "testpaper",
                "for testing",
                USER_1_PAPER,
                { from: USER_1 }
            );
            await publisherContract.publish(
                "testpaper2",
                "for testing",
                USER_2_PAPER,
                { from: USER_2 }
            );

            await noveltyCoinContract.approve(
                publisherContract.address,
                FIRST_TOKEN_ID.toString(),
                { from: USER_1 }
            );
            await publisherContract.addVote(
                USER_2_PAPER,
                FIRST_TOKEN_ID.toString(),
                { from: USER_1 }
            );

            let res = await noveltyCoinContract.getToken(FIRST_TOKEN_ID.toString());
        });

        it("should not allow a address to vote a token twice on a paper", async () => {
            // From the above test USER_2 already has the token
            await noveltyCoinContract.approve(
                publisherContract.address,
                FIRST_TOKEN_ID.toString(),
                { from: USER_2 }
            );
            await publisherContract.addVote(
                USER_1_PAPER,
                FIRST_TOKEN_ID.toString(),
                { from: USER_2 }
            );

            await noveltyCoinContract.approve(
                publisherContract.address,
                FIRST_TOKEN_ID.toString(),
                { from: USER_1 }
            );
            assertRevert(
                publisherContract.addVote(
                    USER_2_PAPER,
                    FIRST_TOKEN_ID.toString(),
                    { from: USER_1 }
                )
            );

            let res = await noveltyCoinContract.getToken(FIRST_TOKEN_ID.toString());
        });

        it("Token weight increases on voting on another paper", async () => {
            let weight = await noveltyCoinContract.getToken(SECOND_TOKEN_ID.toString());
            await noveltyCoinContract.approve(
                publisherContract.address,
                SECOND_TOKEN_ID.toString(),
                { from: USER_2 }
            );
            await publisherContract.addVote(
                USER_1_PAPER,
                SECOND_TOKEN_ID.toString(),
                { from: USER_2 }
            );

            let newWeight = await noveltyCoinContract.getToken(SECOND_TOKEN_ID.toString());
            assert.equal(
                newWeight.multiplier_.toNumber() - weight.multiplier_.toNumber(),
                1
            );
        });

        it("Token weight resets on sending to a non-author", async () => {

        });

        it("Token weight stays same on sending to a author", async () => {

        });
    });
});
