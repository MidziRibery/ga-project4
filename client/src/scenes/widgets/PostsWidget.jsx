import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch(); //redux
  const posts = useSelector((state) => state.posts); //store list of posts
  const token = useSelector((state) => state.token); 

  //1st API call: grab all the post from everyone.
  const getPosts = async () => {
    console.log("getPosts() fired ")
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log("posts data", data);
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    console.log("getUserPosts() fired with userId", userId);
    try{
      const response = await fetch(
        `http://localhost:3001/posts/${userId}/posts`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      console.log("user posts data", data);
      dispatch(setPosts({ posts: data }));
    }catch(e){
      console.log("GET /posts/:userId/posts encountered an error", e);
    }
    
  };

  useEffect(() => {
    console.log("useEffect fired with isProfile", isProfile);
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); 

  return (
    <>
      { posts.length > 0 ? posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      ) : null }
    </>
  );
};

export default PostsWidget;
