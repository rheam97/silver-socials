// may be able to consolidate into one group list file using conditional rendering?

//import React from "react";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import GroupItem from "../GroupItem";
import { useHomeContext } from "../../utils/HomeStore";
import { UPDATE_GROUPS, GET_GROUPS } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_GROUPS } from "../../utils/queries";
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
    // not sure why its doing this twice but works now!!
    // return state.groups.filter((g)=> filteredGroups
 

    return [state.groups, filteredGroups]

    //when currentInterest exists
    // ***if the interests on the state has the currentinterest as a name,
    // return that interests' groups
    // return state.groups.filter((group) => {
    /// says cannot read prop of undefined reading name when i map filter
    // if (state.interests.interests.name===currentInterest) {
    //   group = state.interests.interests.groups;
    // }
    // ***not good nested for loop

    // }
  }

  // // const handleClick = (id) => {
  // //   console.log(id);
  // //     dispatch({
  // //       type: UPDATE_CURRENT_INTEREST,
  // //       currentInterest: id,
  // //     });
  //   //render(<GroupList />);
  //   //<Link to="/group">{item.name}</Link>
  // };

  // mock data
  // const interests = [
  //   { name: "Ballroom Dancing", _id: 1 },
  //   { name: "Yoga", _id: 2 },
  //   { name: "Photography", _id: 3 },
  //   { name: "Hiking", _id: 4 },
  //   { name: "Cooking", _id: 5 },
  // ];

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
