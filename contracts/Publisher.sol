pragma solidity ^0.5.0;
import "./ERC721.sol";

contract Publisher{
    address owner;

    uint256 totalBalance;

    struct Paper {
        address author;
        string contentHash;
        uint256 votesInWeight;
    }

    mapping(string => Paper) papers;

    constructor() public {
        owner = msg.sender;
    }

    function Publish(string memory _contentHash) public {
        address author = msg.sender;

        //Vote vote = _mint();

        papers[_contentHash] = Paper({
            author: msg.sender,
            contentHash: _contentHash,
            votesInWeight: 1 //vote.value
        });
    }

    function addVotes(string memory _contentHash, uint256 weight) internal {
        papers[_contentHash].votesInWeight += weight;
    }

    function getAuthor(string memory _contentHash) public returns (address) {
        return papers[_contentHash].author;
    }
}


