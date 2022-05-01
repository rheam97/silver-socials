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

  const { image, name, _id, members} = group;
  // const [joinGroup] = useMutation(JOIN_GROUP)
// do i need to add cache?????
// console.log(members)

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
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <Link to={`/group/${_id}`}>
        <img alt={name} src={`${image}`} className="w-full" onError = {e => e.target.style.display = 'none'}/>
        <strong className="font-bold text-blue-500 text-xl mb-2">{name}</strong>
      </Link>
      <div className="inline-block bg-gray-200 rounded-full ml-2 px-5 py-1 text-sm font-semibold text-gray-700 mr-2">
        <strong>{members.length} <strong>{members.length===1 ? <strong>Member</strong> : <strong>Members</strong> }</strong></strong>
    </div>
    <div>
    <button onClick={joinAsMember} className="font-bold text-black-500 text-xl mb-2">+ Join this Group Now</button>
    </div>
    </div>
  );
}

export default GroupItem;
