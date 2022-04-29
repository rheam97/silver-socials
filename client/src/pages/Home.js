// should include search for groups, filterable by interest, groups in user's profile(?) or link to profile?
// button to make a group?

import React from "react";
import GroupForm from "../components/GroupForm";
import GroupList from "../components/GroupList";

import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_GROUPS, QUERY_INTERESTS, QUERY_INTEREST } from "../utils/queries";
import InterestMenu from "../components/InterestMenu";
// import {HomeProvider} from '../utils/HomeStore'
import Header from '../components/Header';

const Home = () => {
  const { loading, data } = useQuery(QUERY_GROUPS);

  const groups = data?.groups || [];

  const loggedIn = Auth.loggedIn();

  return (
    <main>
    <Header />
      {/* <HomeProvider> */}
      <div className="flex-row justify-space-between">
        <div>
          <GroupList/>
          <GroupForm/>
      </div>
      <div className="col-12 mb-3">
          <InterestMenu /> 
        </div>
      </div>
      {/* </HomeProvider> */}
    </main>
  );
};

export default Home;