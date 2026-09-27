import PostExcerpt from './postExcerpt'
import { globalState } from '../api/apiSlice'
import Loading from '../../components/loadingSpinner'
export default function AllPost({data, status, error, isLiked, setIsLiked}) {
    const {currentUser} = globalState
    // console.log(data)
    if (status == 'pending') {
        return (
                <div style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '1em'}}>
                    <Loading />
                </div>
            )
    } else if(status == 'fulfilled') {
        // console.log(data)
        return (
            data.map((postItem) => (
                <div key={postItem._id}>
                    <PostExcerpt 
                        body={postItem.body}
                        username={postItem.authorUserName}
                        name={postItem.authorName}
                        postId={postItem._id}
                        userLiked={currentUser.likedPost}
                        authorImage={postItem.authorPhoto}
                        />
                </div>
            ))
        )
    } else {
        console.log(error)
        return (
            <>
                {/* <h2 style={{color: 'red'}}>{error.error}</h2> */}
                <h2 style={{color: 'red', textAlign: 'center'}}>Failed to fetch</h2>
                <p style={{textAlign: 'center'}}>Please Reload The Page</p>
            </>
        )
    }

}