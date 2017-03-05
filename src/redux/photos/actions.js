import * as actionTypes from './action-types';
import * as selectors from './selectors';

export const mergeEntities = entities => ({
  type: actionTypes.MERGE_ENTITIES,
  payload: { entities },
});

export const addFavorite = (id, timestamp) => (dispatch, getState) => {
  // Update the favorited flag on the photo entity, then add to the favorites store
  const state = getState();
  const entities = selectors.selectEntities(state);
  const photo = entities[id];
  if (photo) {
    const updated = { ...photo, favorited: true };
    dispatch(mergeEntities([updated]));
    dispatch({
      type: actionTypes.ADD_FAVORITE,
      payload: { id, timestamp },
    });
  }
};

export const removeFavorite = id => (dispatch, getState) => {
  // Update the favorited flag on the photo entity, then remove from the favorites store
  const state = getState();
  const entities = selectors.selectEntities(state);
  const photo = entities[id];
  if (photo) {
    const updated = { ...photo, favorited: false };
    dispatch(mergeEntities([updated]));
    dispatch({
      type: actionTypes.REMOVE_FAVORITE,
      payload: { id },
    });
  }
};
