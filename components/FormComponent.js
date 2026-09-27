import { useRef, useState } from "react"
import styles from '../styles/signup.module.css'
import { useGetSignUpMutation} from "../features/api/apiSlice"
import { useRouter } from "next/router"
import toast from "react-hot-toast";
import Loading from "./loadingSpinner"
import Image from "next/image"


export default function FormComponent() {

    const [displayLoading, setDisplayLoading] = useState(false)
    const [path, setPath] = useState('') // image path

    const [email, setEmail] = useState('')
    const [createPassword, setCreatePassword] = useState('')
    const [signupRequestStatus, setSignupRequestStatus] = useState('idle')
    const [name2, setName2] = useState('')
    const [username, setUserName] = useState('')
    const [number, setNumber] = useState('')
    const [bio, setBio] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [Imgvalue, setImgValue] = useState('')
    const eMessageRef = useRef()
    const [errorDetails, setErrorDetails] = useState({
        display: false,
        message: ''
    })

    const router = useRouter()

    const [signUp] = useGetSignUpMutation()
    const [step, setStep] = useState(0)

    const handleShowParagraph = () => {
        // setIsParagraphShown(true);
        // eMessageRef.current.scrollIntoView({ behavior: "smooth" });
    };

    function handleSignIn(e) {
        e.preventDefault()
        setDisplayLoading(true)

        const DataToSave = {
            name: name2,
            username,
            bio,
            number,
            email,
            photo: path,
            dateOfBirth,
            password: createPassword
        }

        if (signupRequestStatus === 'idle') {
            signUp({...DataToSave}).unwrap()
            .then(fulfilled => {
                toast.success('signUp successful')
                return (
                    setDisplayLoading(false),
                    router.push('/profile')
                )
            })
            .catch(rejected => {
                console.log(rejected)
                setDisplayLoading(false)
                setSignupRequestStatus('idle')

                if (rejected.status == 'FETCH_ERROR') {
                    return setErrorDetails({display: true, message: `${rejected.error} Please reload page`})
                } else {
                    return setErrorDetails({display: true, message: `${rejected.data.message} `}) // rejected.data.data.err.message
                }

            })
            
        }

        console.log('Submit Called')
    }

    function previewImage(e) {
        const selectedFile = e.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);

        reader.onload = () => {
            setPath(reader.result)
        };

        setImgValue(URL.createObjectURL(selectedFile))
    }

    const firstGroup = 
        <>  
            <label>Name <span>Min length: 5</span></label>
            <input minLength={5} maxLength={30} required className='' type={"text"} value={name2} onChange={(e) => setName2(e.target.value)} placeholder='Enter your name'/>

            <label>UserName: <span>Min length: 5</span></label>
            <input minLength={5} maxLength={15} required type={"text"} value={username} onChange={(e) => setUserName(e.target.value)} placeholder='kalix8812'/>

            <label>Phone Number : </label>
            <input required className={styles.number} type={"number"} value={number} onChange={(e) => setNumber(e.target.value)} placeholder='+(234)-1111-111'/>

            <label>Date of Birth</label>
            <input type={'date'} value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}/>
        </>        

    const secondGroup = 
        <>
            <label>Email </label>
            <input required className={styles.email} type={"email"} value={email} onChange={(e) => setEmail(e.target.value)} placeholder='name@gmail.com'/>

            <label>Enter Your Password <span>Min length: 8</span></label>
            <input required minLength={8} maxLength={20} type={"password"} value={createPassword} onChange={(e) => setCreatePassword(e.target.value)} placeholder='*********'></input>

            <label>Enter a Brief Bio </label> 
            <textarea minLength={10} maxLength={120} required className={styles.textarea} value={bio} onChange={(e) => setBio(e.target.value)} type='text' placeholder="Hello I'm john doe, I like listening to movies and watching music"/>

            <label>Profile Picture (optional) </label>
            <input type={'file'} name={'file'} accept={'.png, .jpeg, .jpg'} onChange={(e) => previewImage(e)}/>

            <Image id="preview-image" className={styles.previewImage} src={Imgvalue} alt="preview Image" width={0} height={0}/>
            {/* <img id="preview-image" className={styles.previewImage} src={Imgvalue} alt="Preview Image"/> */}
        </>

    // check if 'secondGroup' can be displayed
    const canNext = [name2.length >= 5, username.length >= 5, number, dateOfBirth].every(Boolean)

    // Navigate Back and Forth btw the 2 form groups
    const Navigation = () => (
        <>
            {
                step == 0 ?
                <button disabled={!canNext} className={styles.nextBtn} type='button' onClick={() => setStep(prevstate => prevstate + 1)}>Next {">"} </button>
                    :
                <div className={styles.btnContainer}>
                    <button className={styles.prevBtn} onClick={() => setStep(prevstate => prevstate - 1)}>Back</button>
                    <button className={styles.submitBtn} type='submit'>Submit</button>
                </div>
            }
        </>
    )
    return (
        <>
            <div style={{height: '3em', width: '3em', position: 'fixed', top:'5em' , right: '0', marginRight: '2em'}}>
                {displayLoading && <Loading style={{scale: '0.6'}}/>}
            </div>

            <form onSubmit={handleSignIn}>
                {step == 0 ? firstGroup : secondGroup}
                <Navigation />
                {errorDetails.display && <p ref={eMessageRef} style={{color: 'red'}}>{errorDetails.message}</p>}
            </form>
        </>

    )
    
}


