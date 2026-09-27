import { useState } from 'react'
import styles from './searchcomponent.module.css'
// import { useGetAllUsersQuery } from '../features/api/apiSlice'
import { useRouter } from 'next/router'
import Loading from './loadingSpinner'

export default function SearchComponent({data, status}) {
    // const {data, status} = useGetAllUsersQuery()
    const [input, setInput] = useState('')
    const [filteredList, setFilteredList] = useState([])
    const router = useRouter()
    
    function handleFilter(event) {
        setInput(event)

        let filtered = data.filter(dataItem => (
            dataItem.toLowerCase().includes(event.toLowerCase())
        ))
        console.log(filtered)
        if (event) {
            setFilteredList(filtered)
        } else { // if input box is empty, set itemList back to normal.
            setFilteredList([])
        }
    }  

    console.log(status)
    if (status == 'fulfilled') {
        return (
            <div className="searchComponent">
                <div className={styles.searchComponent}>
                    {/* This is the search component */}
                    <input type={"text"} value={input} onChange={(e) => handleFilter(e.target.value)} placeholder='Search for a User...'/> 
                    <div className={styles.searchUserList}>
                        <p>@user1234</p>
                        {data.length !== 0 && filteredList.map((item, i) => <p key={i} style={{cursor: 'pointer'}} onClick={() => (setInput(''), router.push(`/userProfile/?username=${item}`))}>@{item}</p>)}
                    </div>
                </div>
    
            </div>
        )
    }
    else {
        return (
            <div className='searchComponent'>
                {/* <h3>Loading...</h3> */}
                <Loading style={{scale: 1.0, display: 'flex'}}/>
            </div>
        )
    }
}