import { useReducer } from "react";
import {
  UPDATE_GROUPS,
  UPDATE_INTERESTS,
  UPDATE_CURRENT_INTEREST,
  ADD_TO_INTEREST,
} from "./actions";

export const reducer = (state, action) => {
  console.log(`action:`, action);
  switch (action.type) {
    case UPDATE_GROUPS:
      console.log(`action products: `, action.products);
      return {
        ...state,
        products: [...action.products],
      };
    // GET_INTERESTS
    // first query to get interests
    // let allGroups = []
    // interests.forEach(i=> allGroups.concat(i.groups))
    case UPDATE_CATEGORIES:
      //if UPDATE_INTERESTS_FILTER
      //let newinterestFilters= [...state.interestFilters, action.interestFilter]
      //let newVisibleGroups = []
      //interest.forEach(i=> newInterestFilter.includes(i)? newVisibleGroups.concat(i.groups))[...state.allGroups.filter((i)=> {return newinterestFilters.includes(i.groups}]
      return {
        ...state,
        categories: [...action.categories],
      };
    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };
    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };
    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };
    case REMOVE_FROM_CART:
      let newState = state.cart.filter((product) => {
        return product._id !== action._id;
      });
      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        }),
      };
    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };
    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };
    default:
      return state;
  }
};

export function useGroupReducer(initialState) {
  return useReducer(reducer, initialState);
}
