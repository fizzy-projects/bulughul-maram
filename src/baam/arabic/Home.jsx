import ProtectedComponent from "../../admin/ProtectedComponent";
import { useNavigate } from "react-router-dom";

export default function ArabicHome(){
    const navigate=useNavigate();
    return(
        <div className="mainBody" 
        style={{gap:"0.5rem", marginTop:"4rem",display:"flex", flexDirection:"column"}}
        >
            <div>
                <button onClick={() => navigate("/arabic/list")}>
                    Arabic Words
                </button>
            </div>
            <ProtectedComponent>
                <div>
                    <button onClick={() => navigate("/arabic/addword")}>
                        Add Words
                    </button>
                </div>
            </ProtectedComponent>
        </div>
    )
}