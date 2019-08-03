pragma solidity ^0.5.0;

import "@openzeppelin/contracts/drafts/Counters.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

import "./VoteCoin.sol";

contract Publisher is Ownable {
    using Counters for Counters.Counter;

    /*** Events ***/
    event PaperPublished(address indexed author, uint256 tokenId, string contentHash);

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
    
    function getPaper(string memory _contentHash) public view returns (address author, string memory contentHash, uint256 voteWeight){
        Paper memory p = papers[_contentHash];
        return  (p.author, p.contentHash, p.votesInWeight);
    }
    
    function publish(string memory _contentHash) public {
        _tokenIds.increment();
        
        uint256 newTokenId = _tokenIds.current();

        // Only this contract (Publisher) can mint tokens
        // by calling VoteCoin.addMinter() with the contracts
        // address from the owner address.
        voteCoin.mint(msg.sender, newTokenId);

        uint8 newVoteWeight = 1 * 1; // basevalue * weight
        userHasPublished[msg.sender] = true;

        papers[_contentHash] = Paper({
            author: msg.sender,
            contentHash: _contentHash,
            votesInWeight: newVoteWeight
        });

        papers[_contentHash].hasVoted[msg.sender][newTokenId] = true;
        emit PaperPublished(msg.sender, newTokenId, _contentHash);
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


