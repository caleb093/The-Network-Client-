import styles from './profilecomponent.module.css'
import { globalState } from '../features/api/apiSlice';
import Image from 'next/image'
import Loading from './loadingSpinner';


export default function ProfileDisplay({isLoggedIn, status}) {
    console.log('Profile Display')
    let loggedIn;
    // console.log(isLoggedIn)
    // console.log(status)
    console.log(status)
    if (status == 'pending') {
        loggedIn = false

        return (
            <div className="profileComponent">
                <div className={styles.ProfileDisplay}>
                    <div className={styles.imgContainer}>
                        {/* <p>Loading...</p> */}
                        <Loading style={{scale: '0.6'}}/>
                    </div>
                    <div className={styles.texts}>
                        <Loading style={{scale: '0.6'}}/>
                        {/* <p>Loading...</p> */}
                    </div>


                </div>
            </div>
        )
    }
    else if (status === 'fulfilled') {
        loggedIn = isLoggedIn
        console.log(loggedIn.userId)

        if (loggedIn.userId == false) {
            return (
                <div className="profileComponent">
                    <div className={styles.ProfileDisplay}>
                        <div className={styles.imgContainer}>
                            <Image src='/user.png' width={100} height={50}  alt='profile img'/>
                        </div>
                        <div className={styles.texts}>
                            <h3>[Not Logged In]</h3>
                            <p>Welcome to <span style={{color: '#1bca1b'}}>The</span>Network. A platform that you can use to network with friends and strangers
                                from all over the world
                            </p>
                            <hr />
                            <p>Number of Post: <span>0</span></p>
                            <p>Impressions on your post: <span>0</span> </p>
                            <hr />
                            <p>Checkout my other projects <a href='#'>Here</a> </p>
                        </div>


                    </div>
                </div>

            )

        } else {
            const {currentUser} = globalState
            return (
                <div className="profileComponent">
                    <div className={styles.ProfileDisplay}>
                        <div className={styles.imgContainer}>
                            <Image src={currentUser.photo ? currentUser.photo : '/avatar.png'} width={100} height={50}  alt='profile img'/>
                        </div>
                        <div className={styles.texts}>
                            <h3>{currentUser.name}</h3>
                            <p><span>Bio</span> : {currentUser.bio}
                            </p>
                            <hr />
                            <p>Number of Post: <span>{currentUser.posts ? currentUser.posts.length : 0}</span></p>
                            <p>Impressions on your post: <span>{currentUser.posts ? currentUser.posts.length : 0}</span> </p>
                            <hr />
                            <p>Checkout my other projects <a href='#'>Here</a> </p>
                        </div>
        
        
                    </div>
                </div>
            )            
        }
    } else {
        return (
            <div className="profileComponent">
                <div className={styles.ProfileDisplay}>
                    <div className={styles.imgContainer}>
                        <Image src='/avatar.png' width={100} height={50}  alt='profile img'/>
                    </div>
                    <div className={styles.texts}>
                        <h3>[Not Logged In]</h3>
                        <p>Welcome to <span style={{color: '#1bca1b'}}>The</span>Network. A platform that you can use to network with friends and strangers
                            from all over the world
                        </p>
                        <hr />
                        <p>Number of Post: <span>0</span></p>
                        <p>Impressions on your post: <span>0</span> </p>
                        <hr />
                        <p>Checkout my other projects <a href='#'>Here</a> </p>
                    </div>


                </div>
            </div>

        )
    }   

}