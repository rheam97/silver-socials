import React from 'react';
import { Link } from 'react-router-dom';

const fakePhoto = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80';

const PostList = ({ posts }) => {
  return (

            <div class="w-[70%] w-screen mt-12">

                {posts &&
                  posts.map(post => (
                    <>
                    <div className="p-3 mb-8 border border-1 border-gray-300 rounded">

                      <div className="flex flex-col items-center md:flex-row py-2 last:pb-0 font-[Poppins]">
                        <img 
                        className="h-16 w-16 object-cover rounded-full mb-6 mx-6" 
                        src={fakePhoto} 
                        alt="Current profile photo" />
                        <div className="text-center md:text-left md:ml-8 md:pr-6">
                        <Link to={`/profile/${post.username}`} style={{ fontWeight: 700 }}>
                          <span className="text-cyan-600 text-center md:text-left">{post.username}</span>
                          <p className='text-gray-600 text-sm text-center mb-2 md:text-left'>on {post.createdAt}</p>
                        </Link> 
                        <hr />
                        <p  
                        key={post._id} 
                        className="mt-4 text-sm text-center font-medium text-slate-900 md:text-left font-[Poppins]">
                        {post.postText} {' '}
                        </p>
                        </div>  
                      </div>
                      <div>
                     
                        
                        
                      </div>
                        
                          
                    </div>
                    </>
                      
                ))}
            
   </div>
  );
};

export default PostList;


 {/* <div className="list-group w-[75%] mt-5">
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
    </div> */}