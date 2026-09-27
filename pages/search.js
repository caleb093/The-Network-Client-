import SearchComponent from "../components/searchComponent"
import styles from "../styles/searchpage.module.css"
import { useRouter } from "next/router"
import { useState } from "react"

export default function SearchPage({userData, userDataStatus}) {

    const [input, setInput] = useState('')
    const [filteredList, setFilteredList] = useState([])
    const router = useRouter()

    function handleFilter(event) {
        setInput(event)

        let filtered = userData.filter(dataItem => (
            dataItem.toLowerCase().includes(event.toLowerCase())
        ))
        
        if (event) {
            setFilteredList(filtered)
        } else { // if input box is empty, set itemList back to normal.
            setFilteredList([])
        }
    }  


    if (userDataStatus == 'fulfilled' && userData.length !== 0) {
        return (
            <div >
                <div className="searchpage">
                    <div className={styles.searchPage}>
                        {/* This is the search component */}
                        <input type={"text"} value={input} onChange={(e) => handleFilter(e.target.value)} placeholder='Search for a User...'/> 
                        <div className={styles.searchUserList}>
                            <p>@user1234</p>
                            {filteredList.map((item, i) => <p key={i} style={{cursor: 'pointer'}} onClick={() => (setInput(''), router.push(`/userProfile/?username=${item}`))}>@{item}</p>)}
                        </div>
                    </div>
    
                </div>
    
            </div>
        )        
    }

    return (
        <h3>Loading...</h3>
    )
}