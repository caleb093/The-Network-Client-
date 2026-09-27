import styles from '../styles/profilePage.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { globalState } from '../features/api/apiSlice';
import PostExcerpt from '../features/posts/postExcerpt';
import LikedPostSection from '../components/profile_components/LikedPostSection';
import PostSection from '../components/profile_components/PostSection';
import { useState } from 'react';
import Loading from '../components/loadingSpinner';

export default function Profile({isLoggedIn, status}) {

    const {currentUser} = globalState
    const router = useRouter()
    const [display, setDisplay] = useState('post')

    if (status === 'pending') {
        return (
            <Loading />
        )
    } else if (status == 'fulfilled') {

        if (isLoggedIn.userId == false) {
            return (
                <div className={styles.profilePage}>
                    <div className={styles.notLoggedIn}>
                        <h3 style={{textAlign: 'center'}}>You Need To be Logged In to View This Page</h3>
                        <p>Log In <button onClick={() => router.push('/login')}>Here</button> </p>

                        <p>Dont have an Account ? </p>
                        <button onClick={() => router.push('/signup')}>Sign Up</button>
                    </div>
                </div>
            )
        } else {

            console.log(currentUser.likedPost)
            const normalPost = currentUser.posts ? currentUser.posts.map(item => (
                <PostSection key={item._id} body={item.body} postId={item._id} username={item.authorUserName} userLiked={currentUser.likedPost} name={item.authorName} authorImage={item.authorPhoto} />
            )) : <p style={{color: 'white', textAlign: 'center'}}>You Currently Have No Posts</p>

            const likedPost = currentUser.likedPost ? currentUser.likedPost.map(item => (
                <LikedPostSection key={item.postId} body={item.body} postId={item.postId} userLiked={currentUser.likedPost} username={item.username} name={item.name} authorImage={item.authorPhoto} />
            )) : <p style={{color: 'white', textAlign: 'center'}}>You Currently Have No Posts</p>
            
            // console.log(currentUser.photo)
            return (
                <div className={styles.profilePage}>
                    <div className={styles.coverImgContainer}>
                        <Image src={currentUser.photo ? currentUser.photo : '/user.png'} alt='profile picture' width={100} height={90}/>
                    </div>
        
                    <h2>{currentUser.name}</h2>
                    <p className={styles.username}>@{currentUser.username}</p>
        
                    <p>{currentUser.bio}</p>
                    <p>Joined</p>
                    {/* <p className='ppo'>Link:</p> */}
        
                    <div className={styles.postContainer}>
                        <div className={styles.span}>
                            <p onClick={() => setDisplay('post')} style={display == 'post' ? {borderBottom: '3px solid rgb(9, 242, 9)'} : {}}>POSTS</p>
                            <p  onClick={() => setDisplay('likedPost')} style={display == 'likedPost' ? {borderBottom: '3px solid rgb(9, 242, 9)'} : {}} >Liked Posts</p>
                        </div>

                        {
                            display == 'post' ? normalPost : likedPost
                        }
                    </div>
                </div>
            )
        }
    } else {
        return (
            <div className={styles.profilePage}>
                <h1>An Error Occured</h1>
                <p>Please Reload the Page</p>
            </div>
        )
    }

}