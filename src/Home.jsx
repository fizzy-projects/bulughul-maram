import { useNavigate } from "react-router-dom";


function Home(){
    const navigate = useNavigate();

    return(
        <div className="homepage">
            <h1>Hello</h1>
            <div>
                <button onClick={() => navigate("/baamarabic")}>
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