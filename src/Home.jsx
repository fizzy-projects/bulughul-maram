import { useNavigate } from "react-router-dom";


function Home(){
    const navigate = useNavigate();

    return(
        <div style={{gap:"0.5rem", display:"flex",display:"flex",flexDirection:"column"}}>
            <h1>Hello</h1>
            <div>
                <button onClick={() => navigate("/arabic")}>
                    BAAM Arabic
                </button>
            </div>
            <div>
                <button onClick={() => navigate("/bulughulmaram")}>
                    Bulughul Maram
                </button>
            </div>


        </div>
    )
}

export default Home;