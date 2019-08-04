pragma solidity ^0.5.0;

import "@openzeppelin/contracts/drafts/Counters.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

import "./NoveltyCoin.sol";

contract Publisher is Ownable {
    using Counters for Counters.Counter;

    /*** Events ***/
    event PaperPublished(address indexed author, uint256 tokenId, string contentHash);
    event Voted(address indexed voter, string _paperHash, uint256 totalVoteWeight);

    /*** DATA TYPES ***/

    Counters.Counter private _tokenIds;

    NoveltyCoin public noveltyCoin;

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
        // by calling NoveltyCoin.addMinter() with the contracts
        // address from the owner address.
        noveltyCoin.mint(msg.sender, newTokenId);

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

    function addVote(string memory _contentHash, uint256 tokenId) public {
        // Make sure the same token is not used twice on the same paper.
        require(papers[_contentHash].hasVoted[msg.sender][tokenId] == false);

        uint256 weight = noveltyCoin.getVoteWeights(tokenId);
        papers[_contentHash].votesInWeight += weight;

        noveltyCoin.safeTransferFrom(msg.sender,
                                  papers[_contentHash].author,
                                  tokenId);

        emit Voted(msg.sender, _contentHash, papers[_contentHash].votesInWeight);
    }

    function getAuthor(string memory _contentHash) public view returns (address) {
        return papers[_contentHash].author;
    }

    function hasPublishedPapers(address user) public view returns (bool) {
        return userHasPublished[user];
    }

    function setNoveltyCoin(address _contractAddress) public onlyOwner {
        noveltyCoin = NoveltyCoin(_contractAddress);
    }
}


