## Novelty Network

http://novelty.network

Novelty network solidity contracts and subgraph node setup configs


### Open Research Areas
There are still a few things we have to figure out before something like can
takeoff:

 * Prevent/limit Sybil Attacks: Currently there's nothing preventing anyone from
   publishing 1000s of new papers with the motive of minting new tokens.
 * Have an effective and trustless off-chain mechanism of checking the quality of the papers
   especially for plagiarism.
 * Parse and track the citations of a paper to enable stronger network effects.

### Contribute

To contribute make setup you have your dev environment setup correctly.

Install all dependencies
```
npm install
```

Install and run a ganache chain locally
```
ganache-cli
```

To compile and deploy on localhost run:
```
truffle migrate
```

To deploy on ropsten make sure you have your mnemonics added in `.secret` file

```
touch .secret
truffle migrate --network ropsten
```

### Tests

To run tests:
```
truffle test
```

To test on a specific network specify the network to truffle with `--network` flag.
For example:
```
truffle test --network ropsten
```
