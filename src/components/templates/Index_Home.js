/* pages/index.js */
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import '../../App.css'
import { nftmarketaddress } from './config'
import NFT_MarketPlace from './artifacts/contracts/NFT_MarketPlace.sol/NFT_MarketPlace.json'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function Index_Home() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    // const provider = new ethers.providers.JsonRpcProvider("https://ropsten.infura.io/v3/04132d4001834221a021b8e2eac7766c")
    const provider = new ethers.providers.JsonRpcProvider()

    //await window.ethereum.request({ method: 'eth_requestAccounts' })
    //const provider = new ethers.providers.Web3Provider(window.ethereum);
    //const signer = provider.getSigner();
    const tokenContract = new ethers.Contract(nftmarketaddress, NFT_MarketPlace.abi, provider)
    console.log(tokenContract)
    const data = await tokenContract.fetchMarketItems()
    console.log(data)
    // let meta ;
    /*
    *  map over items returned from smart contract and format 
    *  them as well as fetch their token metadata
    */
    const items = await Promise.all(data.map(async i => {
      console.log(i.tokenId.toNumber())
      console.log(i.seller)
      console.log(i.owner)
      console.log(i.seller)
      console.log(i.image)
      const tokenUri = await tokenContract.uri(i.tokenId.toNumber())
      console.log(tokenUri)

      const meta = await axios.get(tokenUri)
      console.log(meta)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
        //     amount:meta.data.amount
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded')
  }
  async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const contract = new ethers.Contract(nftmarketaddress, NFT_MarketPlace.abi, signer)

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    console.log(price)
    console.log(nfts)
    const transaction = await contract.createMarketSale(nft.tokenId, 1, { value: price })
    console.log(transaction)
    //await transaction.wait()
    loadNFTs()
  }
  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>)
  return (
    nfts.map((nft, i) => (

      <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={nft.image}  style={{width:'300px',height:'300px'}}/>
        </div>
        <div className="flip-card-back">
          <h1 className='Title'>{nft.name}</h1> 
          <p>{nft.description}</p> 
          <Button variant="btn btn-primary" className='button' onClick={() => buyNft(nft)}>Buy</Button>
        </div>
      </div>
    </div>


      
      // <Card style={{ width: '18rem' ,height:'80%' }} classNameName='main-card'>
      //   <Card.Img className='image' variant="top" src={nft.image} style={{ width:'100%' ,height:'50%'}} />
      //   <Card.Body className='body'>
      //     <Card.Title className='title' ><h3>{nft.name}</h3></Card.Title>
      //     <Card.Text className='text'>  {nft.description}</Card.Text>
      //     <Button variant="outline-success" className='button' onClick={() => buyNft(nft)}>Buy</Button>
      //   </Card.Body>
      // </Card>




      // <div className="flex justify-center"  >
      //   <div className="px-4" style={{ maxWidth: '600px'}}>
      //   <div  className="card" style={{width: '80%',height:'600px',display:'grid',gridTemplateColumns:'auto auto auto' ,margin:'10px  0px 0px 10px'}}>
      //       {
      //         nfts.map((nft, i) => (
      //           <div key={i} className="border shadow rounded-xl overflow-hidden"  >
      //             <img src={nft.image} width="400px" height="250px" />
      //             <div className="p-4">
      //               <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
      //               <div style={{ height: '70px', overflow: 'hidden' }}>
      //                 <p className="text-gray-400">{nft.description}</p>
      //               </div>
      //             </div>
      //             <div className="p-4 bg-black">
      //               <p className="text-2xl mb-4 font-bold text-white">{nft.price} ETH</p>
      //               <button className="btn btn-primary" onClick={() => buyNft(nft)}>Buy</button>
      //               {/* <button className="btn btn-primary">Buy</button> */}
      //             </div>
      //           </div>
      //         ))
      //       }
      //     </div>
      //   </div>
      // </div>
    )))
}

export default Index_Home;