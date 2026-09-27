import styles from './postExcerpt.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { globalState } from '../api/apiSlice'
import { usePostlikeUnlikeMutation } from '../api/apiSlice'
import Modal from 'react-modal'
import useCheckUserObj from '../../custom hooks-functions/checkUserObject'
import Image from 'next/image'
import Link from 'next/link'

export default function PostExcerpt({body, authorImage, postId, username, userLiked , name, createdAt , singlePost = false ,type = 'post',displayIcon = true }) {
    const [isLiked, setIsLiked] = useState(false)
    const [likeUnlike] = usePostlikeUnlikeMutation()
    const [isOpen, setIsOpen] = useState(false)

    const router = useRouter() 
    let {postData} = globalState

    const [objectEmpty] = useCheckUserObj()

    useEffect(() => {
        if (!objectEmpty) {
            userLiked &&
            userLiked.map(item => (
                item.postId == postId && setIsLiked(true)
            ))
        }
        // return () => {
        //     userLiked &&
        //     userLiked.map(item => (
        //         item.postId !== postId && setIsLiked(false)
        //     )) 
        // }
    },[])


    // styles for singlePOST
    const singleHead = {
        fontSize: '1.3em'
    }

    const singleImageContainer = {
        height: '2.8em',
        width: '2.8em',
    }

    // styles for the Modal Component
    const customStyles = {
        overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
        },
        content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        backgroundColor: 'rgb(31, 29, 29)',
        border: '1px solid green',
        color: 'white',
        transform: 'translate(-50%, -50%)'
        }
    }

    // handle Like clicking like button
    function handleLike() {
        if (objectEmpty !== false) {
            return setIsOpen(true)
        }

        let type = isLiked ? 'unlike' : 'like'

        setIsLiked(prevState => !prevState)
        likeUnlike({type, name, username, body, postId, authorImage}).unwrap()
            .then(fulfilled => console.log('yo shit gotten'))
            .catch(err => console.log(err))
    }
    // console.log(authorImage)
    return (
        <div className={singlePost ? styles.single_post : styles.post}>
            <div style={singlePost ? singleImageContainer : {}} className={styles.imgContainer}><Image src={authorImage ? authorImage : '/user.png'} alt='profile picture' width={'50'} height={'50'} /> </div>

                <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
                    <h3>You need to be logged in to Perform this action</h3>
                    <p onClick={() => router.push('/login')} style={{color: '#c51212', textDecoration: 'underline', cursor: 'pointer'}}>Login Here</p>
                    <button style={{backgroundColor: 'green', border: 'none', color: 'white', padding: '0.5em 1em'}} onClick={() => setIsOpen(false)}>Close</button>
                </Modal>

                <div className={singlePost ? styles.singlePostDetails : styles.postDetails}>
                <Link href={`/userProfile/?username=${username}`}><p style={singlePost ? singleHead : {}}>{name} <span>@{username}</span></p></Link>

                {/* {type == 'comment' ? <p>{body}</p> : <Link as={'/singlepost/post'} href={`/singlepost/post/?postId=${postId} `}  ><p >{body}</p></Link>  } */}

                {/* {type == 'comment' ? <p>{body}</p> : <Link as={`/singlepost/apost`} href={`/singlepost/post/?title=${'123'}`} ><p>{body}</p></Link>  } */}
                {type == 'comment' ? <p>{body}</p> : <p onClick={() => router.push(`/singlepost/${postId}`)}>{body}</p> }

                {singlePost && <p style={{fontStyle: 'italic', color: '#06c706'}}>created at: {createdAt.substring(0,10)}</p> }
                {displayIcon && 
                <>
                    <hr />
                    <div className={styles.icons}>
                        {isLiked ? 
                            <svg onClick={() => handleLike()} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "rgba(236, 35, 6, 1)", transform: "scaleX(-1)" }}><path d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z"></path></svg>
                        : 
                            <svg onClick={() => handleLike()} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z"></path></svg>                        
                        }
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2zM4 10h2v9H4v-9zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7v1.819z"></path></svg> */}
                        {/* <Link as={'/singlepost/post'} href={`/singlepost/post/?postId=${postId} `}  ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M11 14h2v-3h3V9h-3V6h-2v3H8v2h3z"></path><path d="M20 2H4c-1.103 0-2 .897-2 2v18l5.333-4H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14H6.667L4 18V4h16v12z"></path></svg></Link> */}
                        <svg onClick={() => router.push(`/singlepost/${postId}`)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M11 14h2v-3h3V9h-3V6h-2v3H8v2h3z"></path><path d="M20 2H4c-1.103 0-2 .897-2 2v18l5.333-4H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14H6.667L4 18V4h16v12z"></path></svg>
                    </div>
                </>
                }
            </div>
        </div>
    )
}

// React.memo()
