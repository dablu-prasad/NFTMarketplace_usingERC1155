import NFT_MarketPlace from './components/templates/artifacts/contracts/NFT_MarketPlace.sol/NFT_MarketPlace.json'
import { ethers } from 'ethers';
import {useState} from 'react';
import Navbar from './components/templates/Navbar'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Menu from './components/templates/Menu';
import Sell_Digital_Asset from './components/templates/Sell_Digital_Asset';
import {nftmarketaddress} from './components/templates/config.js'
import My_Digital_Asset from './components/templates/My_Digital_Asset';
import Create_DashBoard from './components/templates/Create_DashBoard';
import Index_Home from './components/templates/Index_Home';
 function App() {
  
 // const [name,setname]=useState();
  //const [symbol,setsymbol]=useState();
  const[account,setaccount]=useState();
  //const[balance,setbalance]=useState();
 
    async function getAddress()
    {
      console.log("Hello")
      const [account]= await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(nftmarketaddress, NFT_MarketPlace.abi, signer);

      console.log(contract)

      setaccount(account)
    }
    
    getAddress();
  
  return (
    <>
    <Router>
      <div className="App">
      <Navbar account={account}/>
      <Menu/>
        <Routes>
        <Route exact path="/" element={<Index_Home/>}/>
          <Route exact path="/sell_digital_asset" element={<Sell_Digital_Asset/>} />
          <Route exact path="/my_digital_asset" element={<My_Digital_Asset/>} />
          <Route exact path="/create_dashboard" element={<Create_DashBoard/>} />
        </Routes>
      </div>
    </Router>
     </>
  );
}

export default App;
