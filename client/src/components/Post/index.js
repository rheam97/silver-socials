import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <span className="text-light">Posts</span>
      </div>
      <div className="card-body">
        {posts &&
          posts.map(post => (
            <p className="pill mb-3" key={post._id}>
              {post.postBody} //{' '}
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
