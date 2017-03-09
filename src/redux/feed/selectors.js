import { createSelector } from 'reselect';
import * as photosSelectors from '../photos/selectors';

const selectFeed = state => state.feed;

export const selectCurrent = createSelector(
  [selectFeed, photosSelectors.selectEntities],
  (state, entities) => state.current.map(id => entities[id])
);

export const selectNext = createSelector(
  [selectFeed],
  (state, entities) => state.next
);

export const selectNextCount = createSelector(
  [selectFeed],
  state => state.next.length
);

export const selectDirty = createSelector(
  [selectFeed],
  state => state.dirty
);

export const selectStatus = createSelector(
  [selectFeed],
  state => state.status
);
