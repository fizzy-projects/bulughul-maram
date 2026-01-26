import { useEffect, useState } from "react";
import supabase from "../../../admin/supabase-client";
import createSupabaseChannel from "../../../utils/createSupabaseChannel";
import ProtectedComponent from "../../../admin/ProtectedComponent";
import AutocompleteInput from "../../../utils/AutoCompleteInput";
import styles from "../../../utils/AutoCompleteInput.module.css"

function AddWordDetails() {
  // List states mirroring database entries
  const [listBooks,setListBooks]=useState([]);
  const [listWords,setListWords]=useState([]);
  // Form input states
  const [newWord, setNewWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [bookName, setBookName] = useState("")
  const [storyNumber, setStoryNumber] = useState("");
  // Form control states
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(()=>{
    // Fetches initial lists for books and words
    const fetchList = async ({tableName,columnName,setState}) => {
      const {data,error} = await supabase.from(tableName).select(columnName);
      if (error){
        console.error(error);
        alert(error);
      } else {
        setState(data);
      }
    }
    fetchList({tableName:"baam_sources",columnName:"source",setState:setListBooks});
    fetchList({tableName:"baam_words",columnName:"word",setState:setListWords});
    // Sets up Realtime subscription for the updating lists
    const subscription=createSupabaseChannel({handlers:[
        {table:"baam_sources",setState:setListBooks},
        {table:"baam_words",setState:setListWords}
    ]});
    subscription.subscribe();

    // Unmounts to prevent memory leakage
    return () => {
        supabase.removeChannel(subscription); // cleanup on unmount
    };
  },[])

  useEffect(()=>{
    console.log(bookName);
  },[bookName])

  const upsertWord = async()=>{
    const {error} = await supabase
                                .from("baam_words")
                                .upsert({word:newWord})
                                .select();
    return error;
  }
  const upsertMeaning = async()=>{
    const {error} = await supabase
                                .from("baam_word_meaning")
                                .upsert({word:newWord,meaning:meaning})
                                .select();
    return error;
  }
  const upsertBook = async()=>{
    const {error} = await supabase
                                .from("baam_sources")
                                .upsert({source:bookName})
                                .select();
    return error;
  }
  const upsertStoryWords = async()=>{
    const numericStoryNumber = Number(storyNumber);
    const {error} = await supabase
                                .from("baam_story_words")
                                .upsert({bookName:bookName,storyNumber:numericStoryNumber,word:newWord})
                                .select();
    return error;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newWord.trim()=="") {
      alert("Word is empty.")
      return null;
    }
    setIsUpdating(true);

    let error = await upsertWord(newWord);
    if (error) {
      console.error(error);
      alert("error inserting word");
      setIsUpdating(false);
      return null;
    }

    if (meaning.trim()!=="") {
      error = await upsertMeaning();
      if (error) {
        console.error(error);
        alert("error inserting meaning");
        setIsUpdating(false);
        return null;
      }
    }

    if (bookName.trim()!=="") {
      error = await upsertBook();
      if (error) {
        console.error(error);
        alert("error inserting book");
        setIsUpdating(false);
        return null;
      }
    }

    if (storyNumber.trim()!=="") {
      error = await upsertStoryWords();
      if (error) {
        console.error(error);
        alert("error inserting story words");
        setIsUpdating(false);
        return null;
      }
    }

    alert("Word details added successfully!")
    setNewWord("");
    setMeaning("");
    // setBookName("");
    // setStoryNumber(0);
    setIsUpdating(false);
    // setRefreshToggle((prev) => !prev);
  };



  return (
    <ProtectedComponent>
      <div style={{marginTop:"2rem", width:"90vw"}}>
        <form onSubmit={handleSubmit} className="product-form" 
        style={{width:"100%", display:"flex", flexDirection:"column", gap:"0.3rem"}}
        >
          
            <AutocompleteInput
                labelText="BookName:"
                items={listBooks.map(row=>row.source)}
                transformItem={(c) => c}
                value={bookName}
                disableCondition={isUpdating}
                onChangeObjects={
                  {setState:setBookName}
                }
                onSelectFunc={(transformedItem) => {
                  setBookName(transformedItem);
                }}
                placeholder="Type the source of the word"
            />


          <div className={styles.row}>
            <label>StoryNumber: </label>
            <input
              className={styles.autocompleteDiv}
              style={{padding:"8px",boxSizing:"border-box"}}
              type="number"
              value={storyNumber}
              onChange={(e) => setStoryNumber(e.target.value)}
              disabled={isUpdating}
            />
          </div>

            <AutocompleteInput
                labelText="Word:"
                items={listWords.map(row=>row.word)}
                transformItem={(c) => c}
                value={newWord}
                disableCondition={isUpdating}
                onChangeObjects={
                  {setState:setNewWord}
                }
                onSelectFunc={(transformedItem) => {
                  setNewWord(transformedItem);
                }}
                placeholder="Type the word to be added"
            />

          <div className={styles.row}>
            <label>Meaning: </label>
            <input
              className={styles.autocompleteDiv}
              style={{padding:"8px",boxSizing:"border-box"}}
              type="text"
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              placeholder="Do..."
              disabled={isUpdating}
            />
          </div>

          <button type="submit" disabled={isUpdating}
          style={{alignSelf:"center", marginTop:"0.5rem",padding:"0.6rem",width:"30%"}}>
            {isUpdating ? "Adding..." : "Add"}
          </button>
        </form>
      </div>
    </ProtectedComponent>
  )
}

export default AddWordDetails;