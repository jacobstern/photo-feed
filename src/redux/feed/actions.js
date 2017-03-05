import * as actionTypes from './action-types';
import * as selectors from './selectors';
import * as photosActions from '../photos/actions';
import * as photosSelectors from '../photos/selectors';

const mergeResponseEntities = (dispatch, getState, response) => {
  const state = getState();
  const currentEntities = photosSelectors.selectEntities(state);
  // Make sure we are not stomping over the favorited flag
  const entities = response.items.map(responseObject => {
    const existingEntity = currentEntities[responseObject.url];
    return {
      ...responseObject,
      id: responseObject.url,
      favorited: existingEntity && existingEntity.favorited ? true : false,
    };
  });
  dispatch(photosActions.mergeEntities(entities));
  return entities;
}

export const feedResponse = response => (dispatch, getState) => {
  const entities = mergeResponseEntities(dispatch, getState, response);
  dispatch({
    type: actionTypes.FEED_SUCCESS,
    payload: {
      feed: entities.map(entity => entity.id),
    },
  });
};

export const updatesResponse = response => (dispatch, getState) => {
  const entities = mergeResponseEntities(dispatch, getState, response);
  const state = getState();
  const next = selectors.selectNext(state);
  const compare = new Set(next);
  const updatesFiltered = entities.map(entity => entity.id).filter(id => !compare.has(id));
  dispatch({
    type: actionTypes.UPDATES,
    payload: {
      next: next.concat(updatesFiltered),
    },
  });
};

export const acceptUpdates = () => ({
  type: actionTypes.ACCEPT_UPDATES,
  payload: {},
});
