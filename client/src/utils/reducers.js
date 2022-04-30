import { useReducer } from "react";
import {
  UPDATE_GROUPS,
  UPDATE_INTERESTS,
  UPDATE_CURRENT_INTEREST,
  FILTER_GROUPS,
} from "./actions";

// GET_INTERESTS
// first query to get interests
// let allGroups = []
// interests.forEach(i=> allGroups.concat(i.groups))
//if UPDATE_INTERESTS_FILTER
//let newinterestFilters= [...state.interestFilters, action.interestFilter]
//let newVisibleGroups = []
//interest.forEach(i=> newInterestFilter.includes(i)? newVisibleGroups.concat(i.groups))[...state.allGroups.filter((i)=> {return newinterestFilters.includes(i.groups}]

export const reducer = (state, action) => {
  console.log(`action:`, action);
  switch (action.type) {
    case UPDATE_GROUPS:
      return {
        ...state,
        groups: [...action.groups.getallgroups],
      };
    case UPDATE_INTERESTS:
      return {
        ...state,
        interests: [...action.interests.interests],
      };
    case UPDATE_CURRENT_INTEREST:
      return {
        ...state,
        currentInterest: action.currentInterest,
      };
    case FILTER_GROUPS: // not sure about this one for adding group??
      return {
        ...state,
        groups: [...action.groups]
      };
    default:
      return state;
  }
};

export function useGroupReducer(initialState) {
  return useReducer(reducer, initialState);
}
