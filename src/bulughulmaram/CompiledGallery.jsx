import supabase from "../admin/supabase-client";
import { useEffect,useState } from "react";
import GoToDropdown from "./GoToDropdown";

function CompiledGallery(){
    const [imageList,setImageList]=useState([]);

    useEffect(() => {
        const fetchList = async () => {
        const { data, error } = await supabase
            .from("tblCompiledNotes")
            .select("imageID,hadithNumber, hadithPart,imageUrl")
            .order("hadithNumber,hadithPart");
            if (error) {
                console.error(error);
                return;
            }
            setImageList(data);
            };
        fetchList();
    }, []);

    useEffect(() => {
        if (!imageList.length) return;

        const hash = window.location.hash.replace("#", "");
        if (hash) {
        document.getElementById(hash)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
        }
    }, [imageList]);


    

    return(
        <div>
            <GoToDropdown imageList={imageList}/>
            <div className="galleryContainer" style={{height:"65vh", width:"80vw"}}>
                {imageList.map((img,i) => (
                    <img
                        id={img.imageID}
                        key={img.imageID}
                        src={img.imageUrl}
                        alt={img.imageID}
                    />
                ))}
            </div>
            
        </div>
    )
}



export default CompiledGallery