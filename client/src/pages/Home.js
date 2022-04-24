// should include search for groups, filterable by interest, groups in user's profile(?) or link to profile?
// button to make a group?

import React from "react";
import SocialGroup from "../components/SocialGroup";
import GroupForm from "../components/GroupForm";
import FriendList from "../components/FriendList";

import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_GROUPS, QUERY_ME_BASIC } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_GROUPS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const groups = data?.groups || [];

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-3">
            <GroupForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <SocialGroup groups={groups} title="Some Feed for Group(s)..." />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
