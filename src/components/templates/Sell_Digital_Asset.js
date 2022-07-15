
import NFT_MarketPlace from './artifacts/contracts/NFT_MarketPlace.sol/NFT_MarketPlace.json'
import { useState } from "react";
import { ethers } from "ethers";
import { nftmarketaddress} from './config.js'
import Home from "./Home"
import { create as ipfsHttpClient } from 'ipfs-http-client'
import My_Digital_Asset from './My_Digital_Asset';
import Create_DashBoard from './Create_DashBoard';
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
//import My_Digital_Asset from './src/components/templates/My_Digital_Asset';
//import My_Digital_Asset from './My_Digital_Asset.js';
//http://localhost:5001/api/v0


export default function CreateItem() {
    const[fileUrl,setFileUrl]=useState(null);
    const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })

   
    async function onChange(e) {
        const file = e.target.files[0]
        try {
          const added = await client.add(
            file,
            {
              progress: (prog) => console.log(`received: ${prog}`)
            }
          )
          const url = `https://ipfs.infura.io/ipfs/${added.path}`
          console.log(url)
          setFileUrl(url)
        } catch (error) {
          console.log('Error uploading file: ', error)
        }  
      }
      async function createMarket() {
        const { name, description, price } = formInput

       
       // if (!name || !description || !price || !amount || !fileUrl) return

        console.log(formInput.name);
        console.log(formInput.price);
       // console.log(formInput.amount);
        console.log("1");
        /* first, upload to IPFS */
        const data = JSON.stringify({
          name, description,price, image: fileUrl
        })
        try {
          const added = await client.add(data)
          const url = `https://ipfs.infura.io/ipfs/${added.path}`
          /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
          console.log("2");
          createSale(url)
         
        } catch (error) {
          console.log('Error uploading file: ', error)
        }  
        clearText() ;
      }

      function clearText()  
    {
        document.getElementById('i1').value = "";
        document.getElementById('i2').value = "";
        document.getElementById('i3').value = "";
        document.getElementById('i4').value = "";
        //document.getElementById('i5').value = "";
     //   document.getElementById('i6').value = "";
    } 

      async function createSale(url) {
         const [account]=await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.providers.Web3Provider(window.ethereum);   
        const signer = provider.getSigner()
        const price = ethers.utils.parseUnits(formInput.price, 'ether')
        console.log(url)
        console.log(formInput.price.toString())
       // console.log(formInput.amount)        
        console.log("3");
      //  amount=1;
        /* next, create the item */
        let contract = new ethers.Contract(nftmarketaddress, NFT_MarketPlace.abi, signer)
        let transaction = await contract.mintToken(url,1,price.toString(), { gasLimit: 500000}) 

       // console.log("Amount:",amount);
        console.log("4");

      
}
return (
  
  <div>
  {/* <Home/> */}
<div className="mb-3">
<label  className="form-label">Name:</label>
<input className="form-control" id="i1" onChange={e => updateFormInput({ ...formInput, name: e.target.value })} />
</div>
<div className="mb-3">
<label  className="form-label">Description:</label>
<textarea  className="form-control" id="i2" onChange={e=>updateFormInput({ ...formInput,description:e.target.value})}/>
</div>
<div className="mb-3">
<label  className="form-label">Price:</label>
<input  className="form-control" id="i3" onChange={e=>updateFormInput({...formInput,price:e.target.value})}/>
</div>

{/* <div className="mb-3">
<label  className="form-label">Amount:</label>
<input  className="form-control" id="i4" onChange={e=>updateFormInput({...formInput,amount:e.target.value})}/>
</div> */}

<div>
<input type="file" className="my-4" id="i4" onChange={onChange}/>
{ fileUrl && (<img className="rounded mt-4"  width="350" src={fileUrl} />)}
</div>
<button onClick={createMarket} className="btn btn-primary" >Mint NFT</button>
<Create_DashBoard/>
  </div>
  
  
)
}
