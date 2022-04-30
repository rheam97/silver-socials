import React from "react";
import { Link } from "react-router-dom";

import {JOIN_GROUP} from '../../utils/mutations'
import { useQuery, useMutation } from "@apollo/client";
import {QUERY_ME, QUERY_GROUP} from '../../utils/queries'
//import GroupItem from "../../components/GroupItem";
// import { pluralize } from "../../utils/helpers";
//import { useStoreContext } from "../../utils/GlobalState";
// import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
// import { idbPromise } from "../../utils/helpers";

function GroupItem(group) {

  const { name, _id, members} = group;
  // const [joinGroup] = useMutation(JOIN_GROUP)
// do i need to add cache?????

const [joinGroup, { error }] = useMutation(JOIN_GROUP, {
  // update(cache, { data: { joinGroup } }) {
  //   try {
  //     // update group array's cache
  //     // could potentially not exist yet, so wxrap in a try/catch
  //     //not sure about this because mutation returns interest?
  //     const { group } = cache.readQuery({ query: QUERY_GROUP });
  //     cache.writeQuery({
  //       query: QUERY_GROUP,
  //       data: { group: [...group, members: [...group.members, joinGroup]] },
  //     });
  //   } catch (e) {
  //     console.error(e);
  //   }
  //   // update me object's cache
  //   const { me } = cache.readQuery({ query: QUERY_ME });
  //   cache.writeQuery({
  //     query: QUERY_ME,
  //     data: { me: { ...me, groups: [...me.groups, joinGroup] } },
  //   });
  // },
});

  const joinAsMember = async() => {

    try {
      await joinGroup({
        variables: { groupId: group._id },
      });
      console.log(group);
    } catch (e) {
      console.error(e);
    }
   
 
  };

  return (
    <div className="card px-1 py-1">
      <Link to={`/group/${_id}`}>
        {/* <img alt={name} src={`/images/${image}`} /> */}
        <p>{name}</p>
      </Link>
      <div>
        <span>{members.length} <span>{members.length===1 ? <span>Member</span> : <span>Members</span> }</span></span>
      </div>
      <button onClick={joinAsMember}>Join this Group Now</button>
    </div>
  );
}

export default GroupItem;
