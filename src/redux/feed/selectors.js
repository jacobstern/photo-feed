import { createSelector } from 'reselect';

const selectFeed = state => state.feed;

export const selectCurrent = createSelector(
  [selectFeed],
  state => state.current
);

export const selectNext = createSelector(
  [selectFeed],
  state => state.next
);

export const selectDirty = createSelector(
  [selectFeed],
  state => state.dirty
);

export const selectStatus = createSelector(
  [selectFeed],
  state => state.status
);
