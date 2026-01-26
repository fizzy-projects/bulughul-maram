import { useEffect, useState } from "react";
import styles from "./AutoCompleteInput.module.css"

function useAutocomplete(items, transformItem, value) {
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        if ( (!value)|(value=="") ) {
            setFiltered([]);
            return; // maybe can remove this??
        } else {
            // const q = value.toLowerCase();
            setFiltered(
                items.filter((item) =>
                    // getLabel(row).toLowerCase().includes(q)
                    transformItem(item).includes(value)
                )
            );
        }
    }, [items, transformItem, value]);

    return filtered;
}

function AutocompleteInput({
                                        labelText=null,
                                        items, //list
                                        transformItem = (c)=>c , // function to transform an item from items to a transformed item
                                        value, //form input value which references a state value
                                        onChangeObjects, // object containing setStates
                                        onSelectFunc, //function
                                        placeholder = "Type to search",
                                        disableCondition
                                        }) {
    const [isOpen, setIsOpen] = useState(false);
    const filtered = useAutocomplete(items, transformItem, value);


    return (
        <div className={styles.row}>
            {labelText && <label className={styles.label}>{labelText}</label>}
            <div className={styles.autocompleteDiv}>
                <input
                    className={styles.autocompleteInput}
                    value={value}
                    // onChange={(e) => onChange(e.target.value)}
                    onChange={(e)=>{
                        onChangeObjects.setState(e.target.value);
                        setIsOpen(true);
                        }
                    }
                    placeholder={placeholder}
                    disabled={disableCondition}
                />

                {isOpen && filtered.length > 0 && (
                    <ul className={styles.autocompleteList}>
                    {filtered.map((transformedItem) => ( // Filtered is usually a list of values, not a list of rows of values. So an item is a value.
                        <li
                        key={transformedItem}
                        className={styles["autocompleteItem"]}
                        onClick={() => {//console.log("this is onClick function"); 
                                        onSelectFunc(transformedItem);
                                        setIsOpen(false);
                                        }
                                }
                        >
                        {transformedItem}
                        </li>
                    ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default AutocompleteInput;