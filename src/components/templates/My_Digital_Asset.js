import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Home from './Home'
import {nftmarketaddress, nftaddress} from './config'
import NFT_MarketPlace from './artifacts/contracts/NFT_MarketPlace.sol/NFT_MarketPlace.json'

function My_Digital_Asset() {
    
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    const [account]= await window.ethereum.request({ method: 'eth_requestAccounts' })
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    
    const marketContract = new ethers.Contract(nftmarketaddress, NFT_MarketPlace.abi, signer)
    const data = await marketContract.fetchMyNFTs()
    console.log(data)
    console.log("Hello My_Digital_Asset")
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await marketContract.uri(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded') 
    console.log(nfts)
  }
//  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No assets owned</h1>)
  return (
    <div className="flex justify-center">
    <Home/>
      <div className="p-4">
      <div  className="card" style={{width: 18+'rem'}}>
          {
            nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} className="rounded" />
                <div className="p-4 bg-black">
                  <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
 }

 export default My_Digital_Asset