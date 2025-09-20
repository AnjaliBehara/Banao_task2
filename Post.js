import React from "react";
import PostItem from "./PostItem";

const Post = ({ posts }) => {
  return (
    <div>
      {posts?.map((singlePost) => (
        <PostItem key={singlePost._id} post={singlePost} />
      ))}
    </div>
  );
};

export default Post;
