
const Navbar=(props)=>{

    // console.log(props.account)
  return(
      <div>
     <nav className="navbar navbar-dark bg-dark">
   <div className="container-fluid">
     <a className="navbar-brand">NFT marketplace</a>
      {/* <h5 className="navbar-brand">balance: {props.balance} {props.symbol}</h5>  */}
     <form className="d-flex"> 
       <h4 className="navbar-brand">account:{props.account}</h4>
     </form>
   </div>
 </nav>
      </div>
  )
 }
 
 export default Navbar;