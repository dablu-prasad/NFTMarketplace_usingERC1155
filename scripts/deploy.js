const hre = require("hardhat");
const fs = require('fs');
async function main() {
  const NFT_MarketPlace = await hre.ethers.getContractFactory("NFT_MarketPlace");
  const nft_MarketPlace = await NFT_MarketPlace.deploy();
  await nft_MarketPlace.deployed();
  console.log("nftMarket deployed to:", nft_MarketPlace.address);


  let config = `export const nftmarketaddress = "${nft_MarketPlace.address}"`

let data = JSON.stringify(config)
fs.writeFileSync('./src/components/templates/config.js', JSON.parse(data))
 }
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
