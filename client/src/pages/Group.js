// group name and  description, number of members, posts, join button

import React, {useEffect} from "react";
import { useParams } from "react-router-dom";

import PostList from "../components/Post";
import PostForm from "../components/PostForm";
import Interest from "../components/InterestMenu";
import GroupForm from "../components/GroupForm";
import GroupItem from "../components/GroupItem";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_GROUP } from "../utils/queries";

const SingleGroup = (props) => {
  const { id: groupId } = useParams();

  const { loading, data } = useQuery(QUERY_GROUP, {
    variables: { id: groupId },
  });

  const group = data?.group || {};

  if (loading) {
    return <div>Loading...</div>;
  }

 
  return (
    <>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {group.name}
          </span>{" "}
          {group.member}
        </p>
        <div className="card-body">
          <p>{group.description}</p>
        </div>
      </div>
      <div>
        {<PostList posts={group.posts} />}
        {/* {<GroupItem />} */}
        {<PostForm />}
        {/* {Auth.loggedIn() && <GroupForm groupId={group._id} />} */}
      </div>
    </>
  );
};

export default SingleGroup;
