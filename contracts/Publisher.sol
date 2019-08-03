pragma solidity ^0.5.0;

import "@openzeppelin/contracts/drafts/Counters.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

import "./VoteCoin.sol";

contract Publisher is Ownable {
    using Counters for Counters.Counter;

    /*** Events ***/
    event PaperPublished(address indexed author, uint256 contentHash);

    /*** DATA TYPES ***/

    Counters.Counter private _tokenIds;

    VoteCoin public voteCoin;

    struct Paper {
        address author;
        string contentHash;
        uint256 votesInWeight;
        // Track if a token from a address has already voted on the paper.
        mapping(address => mapping(uint256 => bool)) hasVoted;
    }

    mapping(address => bool) userHasPublished;
    mapping(string => Paper) papers;

    function Publish(string memory _contentHash) public {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        require(voteCoin.mint(msg.sender, newTokenId));
        uint8 newVoteWeight = 1 * 1; // basevalue * weight

        userHasPublished[msg.sender] = true;

        papers[_contentHash] = Paper({
            author: msg.sender,
            contentHash: _contentHash,
            votesInWeight: newVoteWeight
        });

        papers[_contentHash].hasVoted[msg.sender][newTokenId] = true;
        emit PaperPublished(msg.sender, newTokenId);
    }

    function addVote(string memory _contentHash, uint256 tokenId) public {
        // Make sure the same token is not used twice on the same paper.
        require(papers[_contentHash].hasVoted[msg.sender][tokenId] == false);

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

    function hasPublishedPapers(address user) public view returns (bool) {
        return userHasPublished[user];
    }

    function setVoteCoin(address _contractAddress) public onlyOwner {
        voteCoin = VoteCoin(_contractAddress);
    }
}


