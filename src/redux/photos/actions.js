import * as actionTypes from './action-types';

export const mergeEntities = entities => ({
  type: actionTypes.MERGE_ENTITIES,
  payload: { entities },
});

export const addFavorite = (id, timestamp) => ({
  type: actionTypes.ADD_FAVORITE,
  payload: { id, timestamp },
});


export const removeFavorite = id => ({
  type: actionTypes.REMOVE_FAVORITE,
  payload: { id },
});
