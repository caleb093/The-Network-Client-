import styles from './bottomnav.module.css'
import { useRouter } from 'next/router'

export default function BottomNav() {
    const route = useRouter()

    return (
        <div className={styles.navBody}>
            {/* <p>Bottom nav</p> */}
            <svg onClick={() => route.push('/')} xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" style={{fill: 'green'}}><path d="M12.71 2.29a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 0 1.42A1 1 0 0 0 3 13h1v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7h1a1 1 0 0 0 1-1 1 1 0 0 0-.29-.71zM6 20v-9.59l6-6 6 6V20z"></path></svg>
            <span onClick={() => route.push('/search')} className={styles.searchIcon}><svg xmlns="http://www.w3.org/2000/svg" width="34" height="3    4" viewBox="0 0 24 24" style={{fill: 'white'}}><path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path></svg></span>
            <svg onClick={() => route.push('/chat')} xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" style={{fill: 'green'}}><path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"></path></svg>
        </div>
    )
}