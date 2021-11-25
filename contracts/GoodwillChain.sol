// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract GoodwillChain is ERC721, Ownable {

  mapping(address => string) artists;

  uint public tCount;
  uint public funds;
  address payable public org_address;

  mapping(uint => NFT) public nfts;

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

  constructor() ERC721("GoodwillChain NFT", "GWC") { }

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

  event boughtNFT(
    uint id,
    address buyer
  );

  function setOrgAddress(address _org_address) external onlyOwner {
    org_address = payable(_org_address);
  }

  function registerArtist(string memory _name) external {
    artists[msg.sender] = _name;
  }

  function createNFT(string memory _name,string memory _filecid, uint256 _price) external {
    require(bytes(_name).length > 0 && bytes(_filecid).length > 0, "Name and file required");
    tCount++;
    nfts[tCount] = NFT(tCount, _price, true, _name, _filecid, artists[msg.sender], msg.sender, msg.sender);
    emit createdNFT(tCount, nfts[tCount].name, nfts[tCount].owner);
  }

  function buyNFT(uint _id) external payable idExists(_id) {
    require(msg.value >= nfts[_id].price, "Insufficient amount");
    org_address.transfer(msg.value);
    funds = funds + msg.value;
    _safeMint(msg.sender, _id);
    _setTokenURI(_id, nfts[_id].filecid);
    nfts[_id].owner = msg.sender;
    nfts[_id].isListed = false;
    emit boughtNFT(_id, nfts[_id].owner);
  }
}
