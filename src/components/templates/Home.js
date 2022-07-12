import { useNavigate } from "react-router-dom";


function Home(){
    const navigate=useNavigate();
    return(
        <div>
           <button class="btn btn-primary"  onClick={()=>navigate('/')}>GoBack</button>
        </div>
    )
    
}

export default Home;