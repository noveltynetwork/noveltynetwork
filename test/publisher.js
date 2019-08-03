const Web3 = require('web3');
const assert = require('assert');
const ganache = require('ganache-cli');
const web3 = new Web3(ganache.provider());
web3.currentProvider.setMaxListeners(300)
const { abi, evm } = require('../build/contracts/Publisher.json');

let Publisher;
let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    Publisher = await new web3.eth.Contract(abi, "0x4fDF0E154B39Dd2B7AE17412038d9E13B87a7229")
});

describe('Publish', () => {
    it('should be deployed', async () => {
        console.log(Publisher);

        assert.notEqual(Publisher.options.address, undefined);
    });


    it('should publish paper', async () => {
        try {
            // await Publisher.methods.Publish("asldalskdjaskd")
            await Publisher.methods.Publish("aslkdjasdlkj").call({
                from: accounts[0]
            });
        } catch (e) {
            console.log(e)
        }
    });


    it('should get author', async () => {
        try {
            let author = await Publisher.methods.getAuthor("aslkdjasdlkj").call({
                from: accounts[0]
            });

            console.log(author);
        } catch (e) {
            console.log(e);
        }
    });
})
