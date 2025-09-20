import React from "react";

const PostItem = ({ post }) => {
  return (
    <div>
      <h3>{post?.title || "Post Title"}</h3>
      <p>{post?.body || "Post content goes here..."}</p>
    </div>
  );
};

export default PostItem;
