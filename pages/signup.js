import Head from 'next/head'
import FormComponent from '../components/FormComponent'
import styles from '../styles/signup.module.css'
import Link from 'next/link'
import useCheckUserObj from '../custom hooks-functions/checkUserObject'

export default function SignUp() {

    const [isObjectEmpty] = useCheckUserObj()
    
    if (isObjectEmpty) {
        return (
            <div className='signup-page'>
                <Head>
                    <title>signup-theNetwork</title>
                    <meta
                    name="description"
                    content="sign up for theNetwork"
                    />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Head>
                <div className={styles.signupPage}>
                    <h1 style={{textAlign: 'center'}}>Get Started</h1>     
                    <p style={{width: '80%', textAlign: 'center'}}>Sign up to join the <span style={{color: '#1bca1b'}}>The</span>Network and interact with friends and strangers from all over the world.</p>
                    <FormComponent />
                </div>
            </div>
        )
    } else {
        return (
            <div className='signup-page'>
                <div className={styles.signupPage} style={{textAlign: 'center'}}>
                    <h2>Already Signed In. Navigate To your <Link style={{color: '#1bca1b'}} href='/profile'>Profile</Link></h2>
                </div>
            </div>
        )
    }
}