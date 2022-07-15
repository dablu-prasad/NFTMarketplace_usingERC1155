
import React from 'react';
import { useNavigate } from "react-router-dom";
import Index_Home from './Index_Home';
import '../../App.css'
const Menu=()=>{
const navigate=useNavigate();
    const navSellAsset=()=>{navigate('/sell_digital_asset')}
    const navMyAsset=()=>{navigate('/my_digital_asset')}
    const navdashboard=()=>{navigate('/create_dashboard')}
    const navHome=()=>{navigate('/')}
    return(
      <div className='App'>
<div className="menu" >
<button type="button" className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top" >
  Browser
</button>
<button type="button" className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top" onClick={navHome}>
  MarketPlace
</button>
<button type="button" className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top" onClick={navSellAsset}>
  MintNFT
</button>
<button type="button" className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top" onClick={navMyAsset}>
  MyNFT
</button>

{/* <button type="button" className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top" onClick={navdashboard}>
  Create DashBoard
</button> */}
</div>
</div>
    )
    
}

export default Menu;