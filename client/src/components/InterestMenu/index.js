// may be able to consolidate into one group list file using conditional rendering?

//import React from "react";
import { Link } from "react-router-dom";
import React, { useEffect, render } from "react";
import { useQuery } from "@apollo/client";
import { useHomeContext } from '../../utils/HomeStore';
import {
  UPDATE_INTERESTS,
  UPDATE_CURRENT_INTEREST,
} from '../../utils/actions';
import { QUERY_INTERESTS } from "../../utils/queries";
import GroupList from "../GroupList";

//import { render } from "express/lib/response";
// import { idbPromise } from "../../utils/helpers";

function InterestMenu() {
  const [state, dispatch] = useHomeContext();

  const { interests } = state;
  console.log(interests)

  const { loading, error, data} = useQuery(QUERY_INTERESTS);

   useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_INTERESTS,
        interests: data,
      });}
      // console.log(interestData) // coming undefined
      // console.log(error) 
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
  }, [data, loading, dispatch])

  const handleClick = (name) => {
    // console.log(name);
      dispatch({
        type: UPDATE_CURRENT_INTEREST,
        currentInterest: name,
      });
    
    //render(<GroupList />);
    //<Link to="/group">{item.name}</Link>
  };

  // mock data
  // const interests = [
  //   { name: "Arts & Crafts", _id: 1 },
  //   { name: "Outdoor Adventures", _id: 2 },
  //   { name: "Health & Wellness", _id: 3 },
  //   { name: "Community Service", _id: 4 },
  //   { name: "Music & Dance", _id: 5 },



  // ];

  return (
    <div className="flex justify-content-space-between">
      <h2 className= "font-bold text-black-500 text-xl mb-2 block mr-3">Choose By Interest:</h2>
      {interests.map((interest) => (
        <button
        className="px-3 py-1  w-[30%] md:w-[30%] lg:w-[30%] my-4 bg-cyan-600 rounded-full text-white hover:bg-cyan-900 duration-500"
          key={interest.name}
          onClick={() => {
            handleClick(interest.name);
          }}
        > {interest.name}
        {/* <Link to="/group">{item.name}</Link>   */}
        </button>
      ))}
    </div>
  );
}

export default InterestMenu;
