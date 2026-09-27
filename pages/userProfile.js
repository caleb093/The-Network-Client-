import { useRouter } from "next/router"
import { memo, useEffect, useState } from "react"
import { useGetUserAccountMutation } from "../features/api/apiSlice"
import styles from '../styles/profilePage.module.css'
import Image from "next/image"
import PostExcerpt from "../features/posts/postExcerpt"
import Loading from "../components/loadingSpinner"

export default function UserProfile() {
    console.log('Re-Rendered')
    const router = useRouter()
    const [status, setStatus] = useState('loading')
    const [data, setData] = useState({})

    // useGetUserAccountMutation(router.query.username)
    const [testS] = useGetUserAccountMutation()
    // console.log(router)

    useEffect(() => {
        const isObjectEmpty = Object.keys(router.query).length === 0
        const dataObjectEmpty = Object.keys(data).length === 0

        !isObjectEmpty && dataObjectEmpty
        testS(router.query.username).unwrap()
            .then(fulfilled => ( 
                console.log('SUCCEDD'),
                setStatus('fulfilled'),
                setData(fulfilled.data))
            )
            .catch(err => (
                console.log('ERROR'),
                setStatus('error'),
                console.log(err)
            ))
    // },[])
    },[router.query])



    const display_profile = 
        <>
             <div className={styles.profilePage}>
                    {/* <h3>This the Profile Page ?</h3> */}
                    <div className={styles.coverImgContainer}>
                        <Image src={data.photo ? data.photo : '/user.png'} alt='profile picture' width={100} height={90}/>

                    </div>
        
                    <h2>{data.name}</h2>
                    <p className={styles.username}>@{data.username}</p>
        
                    <p>{data.bio}</p>
                    <p>Joined today</p>
                    <p className='ppo'>Link:</p>
        
                    <div className={styles.postContainer}>
                        <div className={styles.span}>
                            <p style={{marginRight: 'auto', borderBottom: '3px solid rgb(9, 242, 9)'}}>POSTS</p>
                        </div>
                        {data.posts ? data.posts.map(item => (
                            <PostExcerpt body={item.body} postId={item._id} username={item.authorUserName} userLiked={data.likedPost} name={item.authorName} authorImage={item.authorPhoto} />
                        )) : <p style={{color: 'white'}}>You Currently Have no Posts</p>}

                        {/* {
                            display == 'post' ? normalPost : likedPost
                        } */}
                    </div>
                </div>    
        </>

    return (
        <div>
            {status == 'loading' && <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Loading /></div>}
            {status == 'fulfilled' && display_profile}
            {status == 'error' && <h3 style={{color: 'white', textAlign:'center', marginTop: '3em'}}>User Dosen't Exist</h3>}
        </div>

    )
}
