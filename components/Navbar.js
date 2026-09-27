import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css'
import { useGetLogOutMutation } from '../features/api/apiSlice';
import { useState } from 'react';
import toast from "react-hot-toast";
import { globalState } from '../features/api/apiSlice';
import Image from 'next/image';

export default function Navbar({isLoggedIn, status}) {
    const router = useRouter()
    const [logout] = useGetLogOutMutation()
    const [open, setOpen] = useState(false)

    let loggedIn;
    let image = ''

    function handleLogOut() {
        logout().unwrap()
            .then(fulfilled => {
                console.log('log out successful'),
                toast.success('logged Out')
                return router.push('/')
            })
            .catch(rejected => (
                toast.error('An error occured'),
                console.log(rejected)
            ))
    }


    if (status === 'pending') {
        loggedIn = false
    } else if (status === 'fulfilled') {
        loggedIn = isLoggedIn.userId     
        loggedIn && (image = globalState.currentUser.photo)
    } else {
        loggedIn = false
    }

    // To Open and Close the Phone Naigation Bar
    function handlePhoneNav() {
        setOpen(prevState => !prevState)
    }

    return (
        <div className={styles.navbar}>
            <h1 onClick={() => router.push('/')}><span>The</span>Network</h1>
            <span onClick={() => handlePhoneNav()}  className={styles.hamburger}><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" style={{fill: "white" }}><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg></span>
            <ul className={styles.navLinks} id={open? 'open' : 'close'}>
                <span className={styles.searchIcon}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'white'}}><path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path></svg></span>
                <p onClick={() => (router.replace('/profile'), handlePhoneNav() ) } >Profile</p>
                <p onClick={() => (router.replace('/signup'), handlePhoneNav() ) } >Sign up</p>
                {loggedIn ? <p style={{color: 'red'}} onClick={() => (handleLogOut(), handlePhoneNav()) } >Log Out</p> : <p onClick={() => (router.replace('/login'), handlePhoneNav() )} > Log In </p>}
                <Image style={{borderRadius: '50%', border: '2px solid #06c706'}} src={image == '' ? '/user.png' : image}  alt='profile picture' width={'40'} height={'40'}/>
            </ul>
        </div>
    )
}