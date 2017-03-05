import * as actionTypes from './action-types';
import asyncStatus from '../common/async-status';

const initialState = {
  current: [],
  next: [],
  dirty: false,
  status: asyncStatus.NONE,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FEED_PENDING:
      return {
        ...state,
        status: asyncStatus.PENDING,
      };
    case actionTypes.FEED_ERROR:
      return {
        ...state,
        status: asyncStatus.ERROR,
      };
    case actionTypes.FEED_SUCCESS:
      return {
        ...state,
        status: asyncStatus.SUCCESS,
        current: action.payload.feed,
        next: action.payload.feed,
        dirty: false,
      };
    case actionTypes.UPDATES:
      return {
        ...state,
        next: action.payload.next,
        dirty: true,
      };
    case actionTypes.ACCEPT_UPDATES:
      return {
        ...state,
        current: state.next,
        dirty: false,
      };
    default:
      return state;
  }
};
