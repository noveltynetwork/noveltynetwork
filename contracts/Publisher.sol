pragma solidity ^0.5.0;

import "@openzeppelin/contracts/ownership/Ownable.sol";

import "./ERC721.sol";

contract Publisher is Ownable{
    uint256 totalBalance;

    ERC721 public voteCoin;

    struct Paper {
        address author;
        string contentHash;
        uint256 votesInWeight;
    }

    mapping(string => Paper) papers;

    function Publish(string memory _contentHash) public {
        //Vote vote = _mint();

        papers[_contentHash] = Paper({
            author: msg.sender,
            contentHash: _contentHash,
            votesInWeight: 1 //vote.value
        });
    }

    function addVote(string memory _contentHash, uint256 tokenId) public {
        uint256 weight = voteCoin.getVoteWeights(tokenId);
        papers[_contentHash].votesInWeight += weight; 

        voteCoin.safeTransferFrom(address(this),
                                  papers[_contentHash].author,
                                  tokenId);
    }

    function addVotes(string memory _contentHash, uint256 weight) internal {
    }

    function getAuthor(string memory _contentHash) public view returns (address) {
        return papers[_contentHash].author;
    }

    function setVoteCoin(address _contractAddress) public onlyOwner {
        voteCoin = ERC721(_contractAddress);
    }
}


