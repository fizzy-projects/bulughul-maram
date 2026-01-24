import ProtectedComponent from "../../admin/ProtectedComponent";
import AddWordMeaning from "./admin/AddWordMeaning"; 
import ArabicList from "./ArabicList";

export default function ArabicVocab(){
    return(
        <div>
            <ArabicList/>
            {/* <ProtectedComponent> */}
                <AddWordMeaning/>
            {/* </ProtectedComponent> */}
        </div>
    )
}