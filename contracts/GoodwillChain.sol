// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract GoodwillChain is ERC721{

  constructor() ERC721("GoodwillChain", "GC") {
  }

  uint tCount;
  uint oCount;

  mapping(address => string) artists;
  mapping(uint => NFT) public nfts;
  mapping(uint => Offer) public offers;

  
  uint funds;
  address payable org_address;

  struct NFT {
        uint id;
        uint price;
        bool isListed;
        string name;
        string filecid;
        string aName;
        address artist;
        address owner;
    }
  
  struct Offer {
        uint id;
        uint nftID;
        uint offerAmount;
        address bidder;
        address institution;
        bool isApproved;
    }

  modifier idExists(uint id) {
    require(id > 0 && id <= tCount);
    _;
  }

  event createdNFT(
        uint id, 
        string name, 
        address owner
    );

    event setNFTPrice(
        uint id, 
        uint newPrice, 
        bool listed
    );

    event offerApproved(
        uint id,
        uint nftID, 
        uint amount, 
        bool approved
    );

    event boughtTrack(
        uint id, 
        address buyer
    );

  function registerArtist(string memory _name) external {
        artists[msg.sender] = _name;
    }

  function createNFT(string memory _name,string memory _filecid)   external {
        require(bytes(_name).length > 0 && bytes(_filecid).length > 0, "Name and file required");
        tCount++;
        _safeMint(msg.sender, tCount);
        _setTokenURI(tCount, _filecid);
        nfts[tCount] = NFT(tCount, 0, false, _name, _filecid, artists[msg.sender], msg.sender, msg.sender);
        emit createdNFT(tCount, nfts[tCount].name, nfts[tCount].owner);
    }   

  function setPrice(uint _id, uint _price) external idExists(_id) {
        nfts[_id].isListed = true;
        nfts[_id].price = _price;
        emit setNFTPrice(_id, nfts[_id].price, nfts[_id].isListed);
    } 

  function makeOffer(uint _tid, uint _amount ) external payable idExists(_tid) {
        require(_amount > nfts[_tid].price, "Invalid offer");
        oCount++;    
        offers[oCount] = Offer(oCount, _tid, _amount, msg.sender, nfts[_tid].owner, false);
    }

  function approveOffer(uint _id) external {
        approve(offers[_id].bidder, offers[_id].nftID);
        offers[_id].isApproved = true;
        emit offerApproved(oCount, offers[_id].nftID, offers[_id].offerAmount, offers[_id].isApproved);
    }

  function buyTrack(uint _id) external payable idExists(_id) {
        (bool paid,) = org_address.call{ value: msg.value }("");
        require(paid == true, "Not sent");
        //org_address.transfer(msg.value);
        funds = funds + msg.value;
        safeTransferFrom(nfts[_id].owner, msg.sender, _id);
        nfts[_id].owner = msg.sender;
        nfts[_id].isListed = false;
        emit boughtTrack(_id, nfts[_id].owner);
    }
}
