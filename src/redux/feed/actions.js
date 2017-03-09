import * as actionTypes from './action-types';
import * as selectors from './selectors';
import * as photosActions from '../photos/actions';
import * as photosSelectors from '../photos/selectors';
import asyncStatus from '../common/async-status';

const UPDATE_INTERVAL = 60000;

const mergeResponseEntities = (dispatch, getState, response) => {
  const state = getState();
  const currentEntities = photosSelectors.selectEntities(state);
  // Make sure we are not stomping over the favorited flag
  const entities = response.items.map(responseObject => {
    const existingEntity = currentEntities[responseObject.link];
    return {
      ...responseObject,
      id: responseObject.link,
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
  // Don't add any duplicates to next
  const compare = new Set(next);
  const updatesFiltered = entities.map(entity => entity.id).filter(id => !compare.has(id));
  dispatch({
    type: actionTypes.UPDATES,
    payload: {
      next: updatesFiltered.concat(next),
    },
  });
};

export const getFeed = () => (dispatch, getState, { feedService }) => {
  dispatch({
    type: actionTypes.FEED_PENDING,
    payload: {},
  });
  feedService.getFeed()
    .then(feed => {
      dispatch(feedResponse(feed));
    })
    .catch(() => {
      dispatch({
        type: actionTypes.FEED_ERROR,
        payload: {},
      });
    });
};

let intervalToken = null;

export const startPollingUpdates = () => (dispatch, getState, { feedService }) => {
  clearInterval(intervalToken);
  intervalToken = setInterval(() => {
    const state = getState();
    if (selectors.selectStatus(state) === asyncStatus.SUCCESS) {
      feedService.getFeed()
        .then(feed => {
          dispatch(updatesResponse(feed));
        });
    }
  }, UPDATE_INTERVAL);
}

export const acceptUpdates = () => ({
  type: actionTypes.ACCEPT_UPDATES,
  payload: {},
});
