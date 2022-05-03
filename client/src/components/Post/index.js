import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {
  return (
    <div className="list-group w-[75%] mt-5">
      <div className="card-header">
        <span className="text-light">Discussion</span>
      </div>
      <div className="bg-gray-300 mb-2">
        {posts &&
          posts.map(post => (
            <p  key={post._id}>
              {post.postText} {' '}
              <Link to={`/profile/${post.username}`} style={{ fontWeight: 700 }}>
                {post.username} on {post.createdAt}
              </Link>
            </p>
          ))}
      </div>
    </div>
  );
};

export default PostList;
