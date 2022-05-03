// should include search for groups, filterable by interest, groups in user's profile(?) or link to profile?
// button to make a group?

import React from "react";
import GroupForm from "../components/GroupForm";
import GroupList from "../components/GroupList";
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import {
  QUERY_GROUPS,
  QUERY_INTERESTS,
  QUERY_INTEREST,
} from "../utils/queries";
import InterestMenu from "../components/InterestMenu";
// import {HomeProvider} from '../utils/HomeStore'
import Header from "../components/Header";
import Footer from "../components/Footer";
import ImageCards from "../components/ImageCards";

import Hero from "../components/Hero";
import { HomeProvider } from "../utils/HomeStore";

const Home = () => {
  const { loading, data } = useQuery(QUERY_GROUPS);

  const groups = data?.groups || [];

  const loggedIn = Auth.loggedIn();

  return (
    <main className="w-screen">
      <Header />
      <Hero />
      {/* <HomeProvider> */}
      <div maxWidth="lg" className="mt-10 flex-row flex-wrap justify-space-between mx-8">
          <InterestMenu />
      </div>

      <Container maxWidth="lg" className="mt-10 flex-row flex-wrap justify-space-between w-[70%] mx-8">
      {/* <AppBar position="static" color="inherit"> */}
      {/* </AppBar> */}
      {/* <Grow in> */}
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <GroupList />
            </Grid>
            <Grid item xs={12} sm={4}>
              <GroupForm />
            </Grid>
          </Grid>
        </Container>
      {/* </Grow> */}
    </Container>
      {/* <div className="mt-10 flex-row justify-space-between w-[70%] mx-auto">
          <div className="col-12 mb-3">
            <ImageCards />
          </div>
      </div> */}
      {/* <div className="mt-10 flex-row flex-wrap justify-space-between w-[70%] mx-8">
        <div>
          <InterestMenu />
          <GroupList />
        </div>
        <GroupForm />
        <div className="mt-10 flex-row justify-space-between w-[70%] mx-auto">
          <div className="col-12 mb-3">
            <ImageCards />
          </div>
        </div>
      </div> */}
      {/* </HomeProvider> */}
      <Footer />
    </main>
  );
};

export default Home;


