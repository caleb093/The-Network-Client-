import PostExcerpt from "../../features/posts/postExcerpt"

export default function LikedPostSection({body, postId, userLiked, username, name, authorImage}) {
    // console.log(authorPhoto)
    return (
        <>
            <PostExcerpt body={body} postId={postId} username={username} userLiked={userLiked} name={name} authorImage={authorImage}/>
            {/* <PostExcerpt body={item.body} postId={item.postId} userLiked={currentUser.likedPost} username={item.username} name={item.name}/> */}
        </>
    )
}