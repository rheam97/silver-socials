// group name and  description, number of members, posts, join button

import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';


import PostList from "../components/Post";
import PostForm from "../components/PostForm";
import Interest from "../components/InterestMenu";
import GroupForm from "../components/GroupForm";
import GroupItem from "../components/GroupItem";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_GROUP } from "../utils/queries";
import Header from '../components/Header';
import Footer from '../components/Footer';
import spinner from '../assets/spinner.gif'

const SingleGroup = (props) => {
  const [isAuth, setIsAuth]=useState(false)
  const { id: groupId } = useParams();

  const { loading, data: {group}={} } = useQuery(QUERY_GROUP, {
    variables: { id: groupId },
  });


useEffect(()=> {
if(group){
  const success =group.members.find(m=> m._id===Auth.getProfile().data._id)
  if (success) {
    setIsAuth(true)
  }
}


}, [group])

if (loading) {
  return <div>{spinner}Loading...</div>;
}
 
  return (
    <>
    <Header className='z-50'/>

    <div className='w-screen h-full flex flex-col justify-between md:h-screen'>
        <div className='w-screen grid md:grid-cols-2 max-w-[1980px] sm:m-auto sm:bg-white md:drop-shadow-lg'>
            <div className='w-full h-full md:h-screen'>
              <img className='w-full h-full object-cover' alt={group.name} src={`${group.image}`} />
            </div>
            <div className='flex flex-col justify-center md:items-start w-full px-12 py-8 font-[Poppins]'>
                <div className="rounded-full bg-black w-20 h-1">
                </div>   
                <h1 className='py-3 text-5xl md:text-7xl font-bold'>
                {/* <span style={{ fontWeight: 700 }} className=""> */}
                  {group.name}
                {/* </span> */}
                </h1>
                <p className='text-2xl'>{group.description}</p>
                <Link to='/donation' className='drop-shadow-lg text-center mt-12 py-3 px-6 w-[45%] md:w-[45%] lg:w-[40%] my-4 bg-cyan-600 rounded-full text-white hover:bg-cyan-900 duration-500'>
                    <button> Donation </button>
                </Link>
            </div>
            
        </div>
    </div>

    <div className= "flex flex-col justify-content-center items-center mt-20 w-screen">
        { isAuth ? <PostForm /> : <div className='bg-gray-100 rounded-lg p-6 shadow-xl w-[70%] font-[Poppins] text-center mx-auto'>
      <p>You must join the group to post in the group discussion</p>
    </div>}
        {<PostList posts={group.posts} />}
    </div>

    
      {/* <div className="jumbotron flex flex-col justify-content-center items-center">
      <img alt={group.name} src={`${group.image}`} className="w-[70%] h-400  shadow-lg object-cover"/>
        <p className='py-3 text-5xl md:text-7xl font-bold position-absolute top-30 start-50'>
          <span style={{ fontWeight: 700 }} className=" w-40 mx-50 h-40 mt-5 shadow-xl object-cover">
            {group.name}
          </span>
        </p>
        <div className="text-2xl">
          <p>{group.description}</p>
        </div>
      </div>
      <div className= "flex flex-col justify-content-center items-center">
        { isAuth ? <PostForm /> : <strong>You must join the group to post in the group discussion</strong>}
        {<PostList posts={group.posts} />}
      </div> */}
      <Footer />
    </>
  );
};

export default SingleGroup;
