// should include list of groups, maybe profile picture, otherwise name and posts maybe in addtion to groups

import React from "react";
import { Redirect, useParams } from "react-router-dom";

import ProfileGroups from "../components/ProfileGroups";
import { useQuery} from "@apollo/client";
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

const Profile = (props) => {
  const { username: userParam } = useParams();

  // const [addpost] = useMutation(ADD_POST);
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  
  const user = data?.me || data?.user || {};
  console.log(user, "testing")
  // console.log(user, "testing")
  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
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

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {`${user.username}'s`} profile.
        </h2>

      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <ProfileGroups // instead of this you can just map the groups returned by the query into a list element
            groups={user.groups}
            title={`${user.username}'s Groups...`}
          />
        </div>

      </div>

    </div>
  );
};

export default Profile;
