// group name and  description, number of members, posts, join button

import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

import PostList from "../components/Post";
import PostForm from "../components/PostForm";
import Interest from "../components/InterestMenu";
import GroupForm from "../components/GroupForm";
import GroupItem from "../components/GroupItem";
import Header from '../components/Header'
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_GROUP } from "../utils/queries";
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
      <div className="jumbotron flex flex-col justify-content-center items-center">
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
      </div>
    </>
  );
};

export default SingleGroup;
