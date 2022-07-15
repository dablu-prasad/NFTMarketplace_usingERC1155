
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NFT_MarketPlace from './artifacts/contracts/NFT_MarketPlace.sol/NFT_MarketPlace.json'
import {nftmarketaddress} from './config.js'
import { ethers } from 'ethers';
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
const Navbar1=(props)=>{

   const navigate=useNavigate();
    const navSellAsset=()=>{navigate('/sell_digital_asset')}
    const navMyAsset=()=>{navigate('/my_digital_asset')}
    const navdashboard=()=>{navigate('/create_dashboard')}
    const navHome=()=>{navigate('/')}

  const[account,setaccount]=useState();
   const getAddress= async()=>
    {
     // const provider = new ethers.providers.JsonRpcProvider("https://ropsten.infura.io/v3/04132d4001834221a021b8e2eac7766c")
      const [account]= await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider  = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress();
      console.log(signerAddress);

      await signer.signMessage("Welcome to Vinove NFT Marketplace")
      // const contract = new ethers.Contract(nftmarketaddress, NFT_MarketPlace.abi, signer);

      // console.log(contract)
      setaccount(account)

    }

  
  return(

    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
      <Navbar.Brand href="#home">
            <img
              src="../../../public/images/9.jpg"
              width="50px"
              height="50px"
              className="d-inline-block align-top"
              alt=""
            />
          </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link onClick={navHome}>MarketPlace</Nav.Link>
          <Nav.Link onClick={navMyAsset}>My NFTs</Nav.Link>
          <NavDropdown title="Browser" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">All NFT</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Art</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Music</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Video</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
     
        <h5 className="text-light bg-dark">Account:</h5>
       <h6 className="text-white-50 bg-dark">{account}</h6>
      
        <Nav>
          <Nav.Link onClick={navSellAsset}>Create NFT</Nav.Link>
          <NavDropdown title="Connect Wallet" id="collasible-nav-dropdown">
            {/* <NavDropdown.Item href="#action/3.1">MetaMask</NavDropdown.Item> */}
            {/* <button onClick={Connect_Wallet} className="btn btn-primary" >Metamask</button> */}
            <button type="button" className="btn btn-primary" onClick={getAddress}>
            Metamask
            </button>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>



//       <div>
//      <nav className="navbar navbar-dark bg-dark">
//    <div className="container-fluid">
//      <a className="navbar-brand">NFT marketplace</a>
//       {/* <h5 className="navbar-brand">balance: {props.balance} {props.symbol}</h5>  */}
//       <Menu/>
//      <form className="d-flex"> 
//        <h4 className="navbar-brand">account:{props.account}</h4>
//      </form>
//      <button type="button" className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top" >
//   Connect Wallet
// </button>
//    </div>
//  </nav>
//       </div>
  )
 }
 
 export default Navbar1;