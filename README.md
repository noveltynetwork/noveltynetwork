## Novelty Network

Novelty network solidity contracts and subgraph node setup configs

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
