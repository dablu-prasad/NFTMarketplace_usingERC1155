const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("NFT_MarketPlace", function () {
  let NFT_MarketPlace ;
  let nft_marketplace;
  let marketplace_address;

  //Declear pre-script in all it-declearation
  beforeEach(async () => {
     NFT_MarketPlace = await ethers.getContractFactory("NFT_MarketPlace");
     nft_marketplace = await NFT_MarketPlace.deploy();
    await nft_marketplace.deployed();
    marketplace_address=nft_marketplace.address

  });

  // get NFT Marketplace  address
    it("Should return the nft marketplace test cases", async function () {

      console.log("NFT_MArketplace Address:",marketplace_address);
    });

    // get the list of all 
    it("check the listprice,mint,createtoken,buy token", async function () {

      [owner, seller, addr1, addr2] = await ethers.getSigners();
      console.log(owner.address)
      console.log(seller.address)
      console.log(addr1.address)
      console.log(addr2.address)
        
//check the listpice
      let listingprice=await nft_marketplace.getListingPrice();
    //  console.log(listingprice.toString());
 
// mint the Token heare    
      const auctionPrice=ethers.utils.parseUnits('1', 'ether')
    //const mintToken=  await  nft_marketplace.mintToken("0xE06280b1d230707E9C245D96DEA7d6B8678B8042",2,auctionPrice);
    const mintToken1=await  nft_marketplace.connect(owner).mintToken("https://gateway.pinata.cloud/ipfs/QmUrGsnXcvQgJDSAFnsomjT9nQWdDPrbscu9x4Y48EEFkm/1.jpg",2,auctionPrice);
    const mintToken2=await  nft_marketplace.connect(owner).mintToken("https://gateway.pinata.cloud/ipfs/QmUrGsnXcvQgJDSAFnsomjT9nQWdDPrbscu9x4Y48EEFkm/1.jpg",2,auctionPrice);

      //console.log(mintToken1)
      //console.log(mintToken2)

// fetch the minted NFT Marketplace items
     items=await nft_marketplace.connect(owner).fetchMarketItems();
     console.log(items)

// Any other address comes and buy the NFT     
          await nft_marketplace.connect(seller).createMarketSale(1,2,{ value: listingprice });
          await nft_marketplace.connect(seller).createMarketSale(2,2,{ value: listingprice });

              
     // console.log(itemsSold)

// fetch the MyNFT items and display it
      address1=await nft_marketplace.connect(seller).fetchMyNFTs();
      myNFTDetails1 = await Promise.all(address1.map(async i => {
      // console.log(i)
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        // tokenUri
       sold:i.sold
      }
      return item
    }))
    console.log('Address 1 items: ', myNFTDetails1)      
    
// after buy the NFT then check how much left the NFT Token
    items1=await nft_marketplace.connect(owner).fetchMarketItems();
    console.log(items1)
      });
  });





//   const { expect } = require("chai");

// describe("NFTMarket", function () {
//   let Market;
//   let market;
//   let marketAddress; 
  
//   beforeEach(async () => {
//     Market = await ethers.getContractFactory("NFTKart");
//     market = await Market.deploy();
//     marketAddress=market.address;
//   });
//   it("Should create the NFT and make a market for nft", async function () {
//     const NFT = await ethers.getContractFactory("NFT")
//     const nft = await NFT.deploy(marketAddress)
//     await nft.deployed()
//     const nftContractAddress = nft.address

//     let listingPrice = await market.getListingPrice()
//     listingPrice = listingPrice.toString()

//     const auctionPrice = ethers.utils.parseUnits('1', 'ether')

//     await nft.createToken("https://www.mytokenlocation.com")
//     await nft.createToken("https://www.mytokenlocation2.com")
  
//     await market.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice })
//     await market.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice })
    
//     const [_, buyerAddress] = await ethers.getSigners()

//     await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice})

//     Createditems = await market.fetchItemsCreated()
//     Createditems = await Promise.all(Createditems.map(async i => {
//       const tokenUri = await nft.tokenURI(i.tokenId)
//       let item = {
//         price: i.price.toString(),
//         tokenId: i.tokenId.toString(),
//         seller: i.seller,
//         owner: i.owner,
//         tokenUri
//       }
//       return item
//     }))
//     console.log('Created items: ', Createditems)

    
//     items = await market.fetchMarketItems()
//     items = await Promise.all(items.map(async i => {
//       const tokenUri = await nft.tokenURI(i.tokenId)
//       let item = {
//         price: i.price.toString(),
//         tokenId: i.tokenId.toString(),
//         seller: i.seller,
//         owner: i.owner,
//         tokenUri
//       }
//       return item
//     }))
//     console.log('Unsold items: ', items)


//     Purchaseditems = await market.connect(buyerAddress).fetchMyNFTs()
//     Purchaseditems = await Promise.all(Purchaseditems.map(async i => {
//       const tokenUri = await nft.tokenURI(i.tokenId)
//       let item = {
//         price: i.price.toString(),
//         tokenId: i.tokenId.toString(),
//         seller: i.seller,
//         owner: i.owner,
//         tokenUri
//       }
//       return item
//     }))
//     console.log('Purchased items: ', Purchaseditems)
//   })
// });



//////////////////////////////////////////////////////////////////////////////////////////////////////

// const { expect } = require('chai');
// const { ethers } = require('hardhat');

// describe('NFTMint', function () {
//   it("Should return the new greeting once it's changed", async function () {
//     [owner, creator, addr1, addr2] = await ethers.getSigners();

//     const NFTMint = await ethers.getContractFactory('NFTMint');
//     const nftMint = await NFTMint.deploy();
//     await nftMint.deployed();
//     nftMintAddress = nftMint.address;

//     const Marketplace = await ethers.getContractFactory('Marketplace');
//     const marketplace = await Marketplace.deploy(nftMintAddress);
//     await marketplace.deployed();
//     marketplaceAddress = marketplace.address;

//     await nftMint.connect(owner).mint(1, 2000);

//     expect(await nftMint.balanceOf(owner.address, 1)).to.be.equal(2000);

//     await nftMint.connect(addr1).setApprovalForAll(marketplaceAddress, true);
//     await nftMint.connect(addr2).setApprovalForAll(marketplaceAddress, true);
//     await nftMint.connect(owner).setApprovalForAll(marketplaceAddress, true);

//     listNFT = await marketplace.connect(owner).listNft(1, 44, 14, 4);

//     // const ownerAmount = await nftMint.balanceOf(owner.address, 0);
//     // console.log(ownerAmount);

//     await nftMint.safeTransferFrom(
//       owner.address,
//       addr2.address,
//       0,
//       14000,
//       '0x00'
//     );

//     // const addr1Amount = await nftMint.balanceOf(addr2.address, 1);
//     // console.log(addr1Amount);

//     buyNFT1 = await marketplace.connect(addr2).buyNFT(1, 14);
//   });
// });





////////////////////////////////////////////////////////////////////////

// const { expect } = require('chai');
// const { ethers } = require('hardhat');

// describe('NFTMint', function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const NFTMint = await ethers.getContractFactory('NFTMint');
//     const nftMint = await NFTMint.deploy();
//     await nftMint.deployed();
//   });
// });