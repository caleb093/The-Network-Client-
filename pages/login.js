import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { useGetLogInMutation, globalState } from "../features/api/apiSlice"
import styles from '../styles/loginPage.module.css'
// import {toast} from "react-toastify"
import toast from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css'
import Loading from "../components/loadingSpinner"
import useCheckUserObj from "../custom hooks-functions/checkUserObject"

export default function LogIn() {

    const [displayLoading, setDisplayLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [getLogIn] = useGetLogInMutation()
    const [loginRequestStatus, setLoginRequestStatus] = useState('idle')
    const [errorDetails, setErrorDetails] = useState({
        display: false,
        message: ''
    })

    const [objectEmpty] = useCheckUserObj(globalState.currentUser)
    
    const router = useRouter()

    function handleLogIn(e) {
        e.preventDefault() // To prevent automatic submit from the form

        if (loginRequestStatus == 'idle') {
            setDisplayLoading(true)
            try {
                setLoginRequestStatus('pending')
                // setDisplayErrorMessage(false)

                setErrorDetails(prevState => ({...prevState, display: false}))

                getLogIn({email: email, password: password}).unwrap()
                    .then(fulfilled => {
                        setDisplayLoading(false)
                        toast.success('login successful')
                        return router.push('/')
                    })
                    .catch(rejected => {
                        console.log(rejected)
                        if (rejected.status == 'FETCH_ERROR') {
                            setErrorDetails({display: true, message: `${rejected.error} Please reload page`})
                        } else {
                            setErrorDetails({display: true, message: `${rejected.data.message} `})
                        }

                        setLoginRequestStatus('idle')
                        setDisplayLoading(false)
                    })
                    // setCanLogIn(true)
            } catch (err) {
                console.log('Failed to Post', err)
            } 
        }

    }

    const canLogIn = true && loginRequestStatus == 'idle'

    // console.log(canLogIn)

    if (objectEmpty) {
        return (
            <div className={styles.loginPage}>
                <Head>
                    <title>login theNetwork</title>
                    <meta
                    name="description"
                    content="Login to theNetwork"
                    />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Head>
                 <div style={{height: '3em', width: '3em', position: 'absolute', top:'0' , right: '0', marginRight: '3em'}}>
                    {displayLoading && <Loading style={{scale: '0.6'}}/>}
                </div>
                <h1>Login</h1>
                {/* <div className='w-fit h-fit'> */}
                
                <form onSubmit={handleLogIn}>
                    <input required className={styles.email} type={"email"} value={email} onChange={(e) => setEmail(e.target.value)} placeholder='name@gmail.com'/>
                    <input required className={styles.password} type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='*********'></input>
                    <button disabled={!canLogIn} className={styles.submit} style={canLogIn ? {opacity: 1} : {opacity: 0.3}}>Log In</button>
                    {errorDetails.display && <p style={{color: 'red'}}>{errorDetails.message}</p>}
                </form>
                <span><input type={"checkbox"} />Remember me</span>
    
                <p>Don &apos t have an account? <Link href='/signup'>Sign Up</Link></p>
            </div>
        )
    }
    
    return (
        <div className={styles.loginPage}>
            <h2>Already loggedIn In. Navigate To your <Link style={{color: '#1bca1b'}} href='/profile'>Profile</Link></h2>
        </div>
    )   

}