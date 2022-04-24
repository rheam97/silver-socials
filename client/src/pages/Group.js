// group name and  description, number of members, posts, join button

import React from "react";
import { useParams } from "react-router-dom";

import ReactionList from "../components/ReactionList";
import ReactionForm from "../components/ReactionForm";

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
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {group.username}
          </span>{" "}
          group on {group.createdAt}
        </p>
        <div className="card-body">
          <p>{group.groupText}</p>
        </div>
      </div>

      {group.reactionCount > 0 && <PostList reactions={group.reactions} />}

      {Auth.loggedIn() && <GroupForm groupId={group._id} />}
    </div>
  );
};

export default SingleGroup;
