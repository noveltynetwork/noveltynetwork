## Novelty Network

http://novelty.network

Novelty network solidity contracts and subgraph node setup configs


### Introduction
Novelty network aims to provide an open access, decentralized paper publishing
platform with an in-built reputation system where every vote is weighted based on the
voters paper publishing history and increases when used to vote between two authors.
The reputation accrued by a paper from votes can also be passed on forward or backwards
to reward the work of other authors and peer reviewers.

Every vote's weight represented by an NFT is reset if the token is transferred
outside the network i.e. to a non-author entity thus disincentivizing selling tokens
as a value losing action.

### Background
With the current state of global academic journals publishing a research paper is heavily centralized
with only three major academics journal publishers (Elsevier, Springer, Wiley)
having a monopoly on deciding and publishing papers in their periodic journals
and over 72% scientific publications locked up behind a paywall.
We aim to provide a different incentive model for academics and scientists
that rewards them by both building up their reputation as well as getting capital investments.

### Open Research Areas
There are still a few things we have to figure out before something like this can
takeoff:

 * Prevent/limit Sybil Attacks: Currently there's nothing preventing anyone from
   publishing 1000s of new papers with the motive of minting new tokens.
 * Have an effective and trustless off-chain mechanism of checking the quality of the papers
   especially for plagiarism.
 * Parse and track the citations of a paper to enable stronger network effects.

### Contribute

To contribute make sure you have your dev environment setup correctly.

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
