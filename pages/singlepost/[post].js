import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { globalState } from "../../features/api/apiSlice"
import { useGetPostsQuery } from "../../features/api/apiSlice"
import { useAddCommentMutation } from "../../features/api/apiSlice"
import useCheckUserObj from "../../custom hooks-functions/checkUserObject"
import PostExcerpt from "../../features/posts/postExcerpt"
import Loading from "../../components/loadingSpinner"
import styles from '../../styles/singlepost.module.css'

export default function SinglePost () {

    const {data, status} = useGetPostsQuery()
    const [comment, setComment] = useState('')
    const [commentRequestStatus, setCommentRequestStatus] = useState('idle')
    const {postData, currentUser} = globalState    
    const [displayLoading, setDisplayLoading] = useState(false)
    const router = useRouter()
    const postId = router.query.post
    const commentInputRef = useRef()
        

    const [commentDispach] = useAddCommentMutation()
    const [errorDetails, setErrorDetails] = useState({
        display: false,
        message: ''
    })
    // console.log(postId)
    console.log(router)
    // console.log(postData)
    const [objectEmpty] = useCheckUserObj()

    function addComment() {
        if (objectEmpty) {
            return setErrorDetails(prevState => ({message: 'You Need to be Logged In', display: true}))
        }
        else {
            setDisplayLoading(true)
            setCommentRequestStatus('pending')
            // console.log(commetData)
            const {name, username, photo} = currentUser
            commentDispach({comment: comment, postId: postId, authorName: name, authorUserName: username, authorImage: photo }).unwrap()
                .then(fulfilled => {setDisplayLoading(false), setCommentRequestStatus('idle') ,setComment('')})
                .catch(rejected => {
                        console.log(rejected)
                        setDisplayLoading(false)
                        return (
                            setCommentRequestStatus('idle'),
                            setErrorDetails(prevState => ({message: 'An Error Occured', display: true})) 
                        )
                    })

        }
    }
    const canAdd = commentRequestStatus == 'idle' && comment

    // console.log(postData)
    if (status == "fulfilled" && postData.length <= 0 ) {
        return (
            <div className={styles.singlePostPage}>
                <h2>No post has being made.</h2>
            </div>
        )
    } else if (postData.length > 0 && postId) {
//        console.log(postId)
        let currentPost;
        // const currentBook = bookData.filter(item => item.id == bookId)
        const filterPost = postData.map(postItem => {
            // item.posts.filter((postItem) => {
                if (postItem._id == postId) {
                    currentPost = postItem
                }
                // console.log(postItem._id)
            // })
        })

        console.log(currentPost)
        
        if (!currentPost) {
            return (
                <h1>Post Dosent exist</h1>
            )
        }

        let isCommentsEmpty;
        if (currentPost.comments.length <= 0) {
            isCommentsEmpty = true        
        } else {
            isCommentsEmpty = false
        }

        // console.log(isCommentsEmpty)
        // console.log(currentPost)
    
        return (
            <div className={styles.singlePostPage}>
                <div style={{height: '3em', width: '3em', position: 'absolute', top:'4em' , right: '0', marginRight: '2em'}}>
                    {displayLoading && <Loading style={{scale: '0.6'}}/>}
                </div>
                <PostExcerpt 
                    singlePost={true}
                    createdAt={currentPost.createdAt}
                    body={currentPost.body}
                    username={currentPost.authorUserName}
                    userLiked={currentUser.likedPost}
                    postId={currentPost._id}
                    name={currentPost.authorName}
                    authorImage={currentPost.authorPhoto}
                    />

                <div className={styles.addComments}>
                    <input className={styles} type={'text'} value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Add a comment'/>
                    <button disabled={!canAdd} onClick={() => addComment()}>Comment</button>
                </div>
                {errorDetails.display && <p style={{color: 'red'}}>{errorDetails.message}</p>}
                <div className={styles.commentList}>
                    <hr/>
                    {!isCommentsEmpty ? currentPost.comments.map((item, i) => (
                        <div key={i}>
                            {/* <p>Comment: {item.comment}</p> */}
                            <PostExcerpt body={item.comment} type={'comment'} username={item.authorUserName} name={item.authorName} authorImage={item.authorImage} displayIcon={false}/>
                        </div>
                    )) : 
                        <p>No Comments Under This Post</p>
                    }    
                </div>
            </div>
        )
    } else {
        return (
            <Loading />
        )
    }

}