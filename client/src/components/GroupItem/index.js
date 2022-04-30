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
  //const [state, dispatch] = useStoreContext();

  const { description, name, _id, members, posts } = group;

  //const { cart } = state

  const addMember = () => {
   
    //const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    //if (itemInCart) {
    // dispatch({
    //   type: UPDATE_CART_QUANTITY,
    //   _id: _id,
    //   purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
    // });
    //   idbPromise('cart', 'put', {
    //     ...itemInCart,
    //     purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
    //   });
    // } else {
    //   dispatch({
    //     type: ADD_TO_CART,
    //     product: { ...item, purchaseQuantity: 1 }
    //   });
    //   idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    // }
  };

  return (
    <div className="card px-1 py-1">
      <Link to={`/group/${_id}`}>
        {/* <img alt={name} src={`/images/${image}`} /> */}
        <p>{name}</p>
      </Link>
      <div>
        <div>
          {/* {quantity} {pluralize("item", quantity)} in stock */}
        </div>
        <span>{members.length} <span>{members.length===1 ? <span>Member</span> : <span>Members</span> }</span></span>
      </div>
      <button onClick={addMember}>Join this Group Now</button>
    </div>
  );
}

export default GroupItem;
