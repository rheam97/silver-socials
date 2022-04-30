// may be able to consolidate into one group list file using conditional rendering?

//import React from "react";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import GroupItem from "../GroupItem";
import { useHomeContext } from "../../utils/HomeStore";
import { UPDATE_GROUPS, GET_GROUPS } from "../../utils/actions";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_GROUPS, QUERY_ME } from "../../utils/queries";
import {JOIN_GROUP} from '../../utils/mutations'
// import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";

function GroupList() {
  const [state, dispatch] = useHomeContext();

  const { currentInterest } = state;

  const { loading, error, data } = useQuery(QUERY_GROUPS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_GROUPS,
        groups: data,
      });
    }
    console.log(error);
    console.log(data); // comes before interests, undefined
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
  }, [data, loading, dispatch]);

  //if UPDATE_INTERESTS_FILTER
  //let newinterestFilters= [...state.interestFilters, action.interestFilter]
  //let newVisibleGroups = []
  //interest.forEach(i=>
  //newInterestFilter.includes(i)? newVisibleGroups.concat(i.groups))[...state.allGroups.filter((i)=> {return newinterestFilters.includes(i.groups}]
  function filterGroupsbyInterest() {
    if (!currentInterest) {
      return state.groups;
    }
    let filteredGroups
    state.interests.forEach((i) =>
      i.name === currentInterest ?  filteredGroups=i.groups : null
    )
    console.log('these r the filtered groups', filteredGroups)


 
    
    return state.groups =filteredGroups

    //when currentInterest exists
    // ***if the interests on the state has the currentinterest as a name,
    // return that interests' groups

  }


  return (
    <div className="my-2">
      <h2>Groups for {currentInterest}:</h2>
      {state.groups.length ? (
        <div className="flex-row">
          {filterGroupsbyInterest().map((group) => (
            <GroupItem
              key={group._id}
              _id={group._id}
              name={group.name}
              description={group.description}
              members={group.members}
              posts={group.posts}
            />
          ))}
        </div>
      ) : (
        <h3>No groups added under this interest yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default GroupList;
