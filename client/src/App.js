import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import About from "./pages/About";
import CheckoutForm from "./pages/CheckoutForm";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import GroupList from "./components/GroupList";
import GroupItem from "./components/GroupItem";
import Group from "./pages/Group";
// import Interest from "./pages/Interest";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import "./App.css";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const stripe = loadStripe(
  "{PUBLIC-KEY}"
);

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          {/* hide header when url on signup page */}
          {/* {
          props.location.pathname!=='/signup' ? <Header/>:null
          } */}
          {/* <Header /> */}
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile/:username?" component={Profile} />
              {/*<Route exact path="/group" component={GroupList} /> */}
              {/* <Route exact path="/groupitem" component={GroupItem} />  */}
              <Route exact path="/group/:id" component={Group} />
              <Route exact path="/about" component={About} />
              <Route exact path="/donation" component={CheckoutForm} />

              {/* <Route exact path="/interest/:id" component={Interest} /> */}

              <Route component={NoMatch} />
            </Switch>
          </div>
          {/* <Footer /> */}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
