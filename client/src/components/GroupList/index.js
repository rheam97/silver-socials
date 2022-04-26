// may be able to consolidate into one group list file using conditional rendering?

//import React from "react";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import GroupItem from "../GroupItem";
//import { useStoreContext } from "../../utils/GlobalState";
//import { UPDATE_GROUPS } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_GROUPS } from "../../utils/queries";
// import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";

function GroupList() {
  //const [state, dispatch] = useStoreContext();

  //const { currentInterest } = state;

  const { loading, data } = useQuery(QUERY_GROUPS);

  // useEffect(() => {
  //   if (data) {
  //     // dispatch({
  //     //   type: UPDATE_GROUPS,
  //     //   groups: data.groups,
  //     // });
  //     data.groups.forEach((group) => {
  //       idbPromise("groups", "put", group);
  //     });
  //   } else if (!loading) {
  //     idbPromise("groups", "get").then((groups) => {
  //       // dispatch({
  //       //   type: UPDATE_GROUPS,
  //       //   groups: groups,
  //       // });
  //     });
  //   }
  // }, [data, loading, dispatch]);

  // function filterGroups() {
  //   if (!currentInterest) {
  //     return state.groups;
  //   }

  //   return state.groups.filter(
  //     (group) => group.interest._id === currentInterest
  //   );
  // }

  return (
    <div className="my-2">
      <h2>Our Groups:</h2>
      {/* {state.groups.length ? (
        <div className="flex-row">
          {filterGroups().map((group) => (
            <GroupItem
              key={group._id}
              _id={group._id}
              image={group.image}
              name={group.name}
              price={group.price}
              quantity={group.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any groups yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null} */}
    </div>
  );
}

export default GroupList;