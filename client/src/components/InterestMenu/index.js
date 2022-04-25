// may be able to consolidate into one group list file using conditional rendering?

//import React from "react";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
//import { useStoreContext } from '../../utils/GlobalState';
// import {
//   UPDATE_INTERESTS,
//   UPDATE_CURRENT_INTEREST,
// } from '../../utils/actions';
import { QUERY_INTERESTS } from "../../utils/queries";
import { render } from "express/lib/response";
// import { idbPromise } from "../../utils/helpers";

function InterestMenu() {
  //const [state, dispatch] = useStoreContext();

  //const { interests } = state;

  // const { loading, data: interestData } = useQuery(QUERY_INTERESTS);

  // useEffect(() => {
  //   if (interestData) {
  //     // dispatch({
  //     //   type: UPDATE_INTERESTS,
  //     //   interests: interestData.interests,
  //     // });
  //     interestData.interests.forEach((interest) => {
  //       idbPromise('interests', 'put', interest);
  //     });
  //   } else if (!loading) {
  //     idbPromise('interests', 'get').then((interests) => {
  //       // dispatch({
  //       //   type: UPDATE_INTERESTS,
  //       //   interests: interests,
  //       // });
  //     });
  //   }
  // }, [interestData, loading, dispatch])

  const handleClick = (id) => {
    console.log(id);
    //   dispatch({
    //     type: UPDATE_CURRENT_INTEREST,
    //     currentInterest: id,
    //   });
  };

  // mock data
  const interests = [
    { name: "Arts & Crafts", _id: 1 },
    { name: "Outdoor Adventures", _id: 2 }
  ];

  return (
    <div>
      <h2>Choose a Interest:</h2>
      {interests.map((item) => (
        <button
          key={item._id}
          // onClick={() => {
          //   handleClick(item._id);
          // }}
          >
          {item.name}
          {/* <Link to="/group">{item.name}</Link> */}
        </button>
      ))}
    </div>
  );
}

export default InterestMenu;
