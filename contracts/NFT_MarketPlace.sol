// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0<0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
 import "hardhat/console.sol";
// import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
// Token URL 
// https://gateway.pinata.cloud/ipfs/QmUrGsnXcvQgJDSAFnsomjT9nQWdDPrbscu9x4Y48EEFkm/1.jpg

contract NFT_MarketPlace is ERC1155, Ownable,ReentrancyGuard {
  
    constructor() ERC1155("")
     {
  
     }
//25000000000000000
   // using Strings for uint256;
    using Counters for Counters.Counter;
    string private _baseURI = "";
    mapping(uint256 => string) public _tokenURIs;
    mapping(uint256 => MarketItem) public idToMarketItem;
    mapping(address => uint256) public _balances;
    uint256 private platformFee = 25;
    uint256 private deno = 1000;

    Counters.Counter public _itemIds;
    Counters.Counter public _itemsSold; 
    Counters.Counter public _tokenIds;
//25000000000000000

    uint256 listingprice=0.025 ether;

    struct MarketItem {
       uint256 itemId;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }
    event MarketItemCreated(
        uint256 indexed itemId,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );
    event Transfer(address indexed sender,address indexed receiver,uint256 value);

    /** Return the listing price of contract */
     function getListingPrice() public view returns(uint256)
     {
         return listingprice;
      }


    function mintToken(
        string memory tokenURI,
        uint256 amount,
        uint256 price
    ) public returns (uint256) {
         _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId, amount, "");
        _setTokenUri(newItemId, tokenURI);
        createMarketItem(newItemId, price, amount);
        return newItemId;
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }

// create marketplace items
    function createMarketItem(
        uint256 tokenId,
        uint256 price,
        uint256 amount
    ) private  nonReentrant{
      _itemIds.increment();
         uint256 itemId=_itemIds.current();
        require(price > 0, "Price must be at least 1 wei");
        idToMarketItem[itemId] = MarketItem(
           itemId,
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );
        setApprovalForAll(address(this), true);

        safeTransferFrom(msg.sender, address(this), tokenId, amount, "");

        emit MarketItemCreated(
          itemId,
            tokenId,
            msg.sender,
            address(this),
            price,
            false
        );     
    }
    
/* Returns all unsold market items */
    function fetchMarketItems() public view returns (MarketItem[] memory) {

    uint256 itemCount = _tokenIds.current();
    uint256 unsoldItemCount = _tokenIds.current() - _itemsSold.current();
    uint currentIndex=0;

    MarketItem[] memory items=new MarketItem[](unsoldItemCount);

    for(uint i=0;i<itemCount;i++)
    {
         if(idToMarketItem[i+1].owner==address(this))
         {
            uint currentId=i+1;
            MarketItem storage currentItem=idToMarketItem[currentId];
            items[currentIndex]=currentItem;
            currentIndex+=1;
        }
    }
    return items;

    }

/**Create the Sale of a marketplace item */
/**Transfer ownership of the item, as well as funds between partied */
function createMarketSale( uint256 itemId,uint256 amount) public payable  nonReentrant
{
        uint256 price = idToMarketItem[itemId].price;
    
      //  address owner = idToMarketItem[itemId].owner;
        address seller = idToMarketItem[itemId].seller;
        uint256 tokenId = idToMarketItem[itemId].tokenId;

        payable(seller).transfer( price);
       // _owner.transfer( listingprice);
     
      // payable(address(this)).transfer(listingprice);
     //   _transfer(address(this),listingprice);

        idToMarketItem[itemId].owner = payable(msg.sender);
        idToMarketItem[itemId].sold = true;
        _itemsSold.increment();

        _safeTransferFrom(address(this), msg.sender, tokenId, amount, "");

        // console.log("seller address::",idToMarketItem[itemId].seller);
        // console.log("owner address::",idToMarketItem[itemId].owner);
        // console.log("sold address::",idToMarketItem[itemId].sold);
        // console.log("seller address::",seller);
        //  console.log("address(this):", address(this));



             //  idToMarketItem[itemId].seller = payable(address(0));
     //   setApprovalForAll(address(this), true);  
    //    payable(seller).transfer(msg.value);

//     uint price = idToMarketItem[itemId].price;
//     uint tokenId = idToMarketItem[itemId].tokenId;
//     require(msg.value == price, "Please sumbit the asking price in order to complete the purchase");

//     idToMarketItem[itemId].seller.transfer(msg.value);
//    _safeTransferFrom(address(this), msg.sender, tokenId, amount, "");
//     idToMarketItem[itemId].owner = payable(msg.sender);
//     idToMarketItem[itemId].sold = true;
//     _itemsSold.increment();
//     payable(owner).transfer(listingprice);
        
       // payable(seller).transfer(listingprice);
      //   payable(seller).transfer(listingprice);
}

/* Returns only items that a user has purchased */
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

/* Returns only items a user has listed */
    function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public virtual override {
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
            "ERC1155: caller is not token owner nor approved"
        );
        _safeTransferFrom(from, to, id, amount, data);
    }

    function onERC1155Received(
        address _operator,
        address _from,
        uint256 _id,
        uint256 _value,
        bytes calldata _data
    ) external returns (bytes4) {
        return
            bytes4(
                keccak256(
                    "onERC1155Received(address,address,uint256,uint256,bytes)"
                )
            );
    }

// Get URI link of any Token.
  function uri(uint256 tokenId) public view virtual override returns (string memory) {
        string memory tokenURI = _tokenURIs[tokenId];

        // If token URI is set, concatenate base URI and tokenURI (via abi.encodePacked).
        return bytes(tokenURI).length > 0 ? string(abi.encodePacked(_baseURI, tokenURI)) : super.uri(tokenId);
    }

//    function uri(uint256 _tokenid) override public pure returns (string memory) {
//         return string(string(abi.encodePacked("", _tokenid.toString())));
//     }

    // function uri(uint256 _tokenid) override public pure returns (string memory) {
    //     return string(
    //         abi.encodePacked(
    //             "https://gateway.pinata.cloud/ipfs/QmW6BQqh6zRtcFtaqUNaxnDEzDtfG24dHaLp7txXoQuMhv/",
    //             Strings.toString(_tokenid),".json"
    //         )
    //     );
    // }

//To chnage the URL String after the contract is deployed
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function _setTokenUri(uint256 tokenId, string memory tokenURI) private {
        _tokenURIs[tokenId] = tokenURI;
    }

     function balanceOfAddress(address account) public view returns (uint256) {
        return _balances[account];
    }

    // transfer function
function _transfer(address _to,uint256 _amount)public payable returns (bool success)
{
    console.log("transfer starting");
    require(_amount <= _balances[payable(msg.sender)],"transfer required fail");
         _balances[msg.sender] -= _amount;
         _balances[_to] += _amount;
          
        emit Transfer(msg.sender, _to, _amount);
        return true;
        console.log("transfer true");
}

// // The following functions are overrides required by Solidity.
//     function _beforeTokenTransfer(
//         address operator,
//         address from,
//         address to,
//         uint256[] memory ids,
//         uint256[] memory amounts,
//         bytes memory data
//     ) internal override(ERC1155, ERC1155Supply) {
//         super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
//     }

//     function getMarketArrayitem(uint256 _tokenid1) public view returns(MarketItem memory)
//     {
//        return idToMarketItem[_tokenid1];
//     }

   
    
}

