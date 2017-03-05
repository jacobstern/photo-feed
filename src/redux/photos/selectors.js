import { createSelector } from 'reselect';

const selectPhotos = state => state.photos;

export const selectEntities = createSelector(
  [selectPhotos],
  state => state.entities
);

export const selectFavorites = createSelector(
  [selectPhotos, selectEntities],
  (state, entities) => Object.keys(state.favorites)
    .sort((a, b) => state.favorites[a].timestamp < state.favorites[b].timestamp)
    .map(key => entities[key])
);
