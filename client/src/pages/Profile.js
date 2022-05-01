// should include list of groups, maybe profile picture, otherwise name and posts maybe in addtion to groups

import React from "react";
import { Redirect, useParams } from "react-router-dom";

import GroupForm from "../components/GroupForm";
import SocialGroup from "../components/InterestMenu";
import PersonalList from "../components/GroupList";
import Posts from "../components/Post";
import Header from '../components/Header';
import Footer from '../components/Footer';
import spinner from "../assets/spinner.gif";

import { useQuery, useMutation } from "@apollo/client";
import ProfileGroups from "../components/ProfileGroups";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

// const Profile = () => {
//   const { username: userParam } = useParams();

//   const { loading, data } = useQuery(QUERY_USER, {
//     variables: { username: userParam }
//   });

//   // const user = data?.user || {};

//   const user = data?.me || data?.user || {};
//   // console.log(user, "testing")
//   // redirect to personal profile page if username is yours
//   if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
//     return <Redirect to="/profile" />;
//   }

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!user?.username) {
//     return (
//       <h4>
//         You need to be logged in to see this. Use the navigation links above to
//         sign up or log in!
//       </h4>
//     );
//   }

//   return (
//     <div>
//       <div className="flex-row mb-3">
//         <h2 className="bg-dark text-secondary p-3 display-inline-block">
//           Viewing {user.username}'s profile.
//         </h2>
//       </div>

//       <div className="flex-row justify-space-between mb-3">
//         <div className="col-12 mb-3 col-lg-8">
//           <ProfileGroups groups={user.groups} title={`${user.username}'s groups...`} />
//         </div>
//       </div>
//     </div>
//   );
// };

const Profile = () => {
  const { username: userParam } = useParams();
  // console.log(username, "logging username")
  // const [addpost] = useMutation(ADD_POST);
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const user = data?.me || data?.user || {};

  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div>{spinner}Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  // const handleClick = async () => {
  //   try {
  //     await addpost({
  //       variables: { id: user._id },
  //     });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return ( // needs userParams condition
  <main>
    <Header />
  
  <div className="relative pb-2 h-full w-screen justify-center items-center">
      <div className="flex flex-col pb-5 font-[Poppins]">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className="w-[70%] h-370 2xl:h-510 shadow-lg object-cover"
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
              alt="user-pic"
            />
            <img
              className="rounded-full border border-white w-40 h-40 -mt-20 shadow-xl object-cover"
              src={user.image}
              // src="https://source.unsplash.com/1600x900/?username"
              alt="user-pic"
            />
          </div>
          <h1 className="font-bold text-3xl text-center mt-3">
            {/* {user.userName} */}
            {`${user.username}`}
          </h1>
        </div>
        <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8 text-center">
          <ProfileGroups // instead of this you can just map the groups returned by the query into a list element
            groups={user.groups}
            title={`${user.username}'s Groups...`}
          />
        </div>

      </div>
      </div>
    </div>
    <Footer />
    </main>
    );
};

export default Profile;
