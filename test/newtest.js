const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarketPlace", async () => {
    let NFT_MarketPlace;
    let nft_marketplace;
    let marketplace_address;
    let owner, addr1, addr2;
    beforeEach(async () => {
        NFT_MarketPlace = await ethers.getContractFactory("NFT_MarketPlace");
        nft_marketplace = await NFT_MarketPlace.deploy();
        await nft_marketplace.deployed();
        marketplace_address = nft_marketplace.address

    })

    it("Mint the Token", async () => {
        console.log("Contract Address is:", marketplace_address);
        [owner, addr1, addr2] = await ethers.getSigners();
        let listprice = await nft_marketplace.getListingPrice();
        console.log("Listing Price is:", listprice.toString());

        expect(await nft_marketplace.owner()).to.equal(owner.address);

        // mint the Token heare    
        const auctionPrice = ethers.utils.parseUnits('1', 'ether')
        //const mintToken=  await  nft_marketplace.mintToken("0xE06280b1d230707E9C245D96DEA7d6B8678B8042",2,auctionPrice);
        const mintToken1 = await nft_marketplace.connect(owner).mintToken("https://gateway.pinata.cloud/ipfs/QmUrGsnXcvQgJDSAFnsomjT9nQWdDPrbscu9x4Y48EEFkm/1.jpg", 2, auctionPrice, { value: listprice });
        const mintToken2 = await nft_marketplace.connect(owner).mintToken("https://gateway.pinata.cloud/ipfs/QmUrGsnXcvQgJDSAFnsomjT9nQWdDPrbscu9x4Y48EEFkm/1.jpg", 2, auctionPrice, { value: listprice });

        //console.log(mintToken1)
        //console.log(mintToken2)

        // fetch the minted NFT Marketplace items
        items = await nft_marketplace.connect(owner).fetchMarketItems();
        //console.log(items)

        // Any other address comes and buy the NFT     
       const l1= await nft_marketplace.connect(addr1).createMarketSale(1, 2, { value: auctionPrice });
       const l2= await nft_marketplace.connect(addr2).createMarketSale(2, 2, { value: auctionPrice });



     //  console.log(l1);
      // console.log(l2)

    //    // after buy the NFT then check how much left the NFT Token
    items1=await nft_marketplace.connect(addr1).fetchMyNFTs();
   // console.log(items1)
    items2=await nft_marketplace.connect(addr2).fetchMyNFTs();
   // console.log(items2)

   await nft_marketplace.connect(addr1).burnNFT(1,1)
   const p1=await nft_marketplace._balances(1,addr1.address)
   console.log("After Burn amount Left:",p1.toString())
    })
})