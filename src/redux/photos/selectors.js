import { createSelector } from 'reselect';

const selectPhotos = state => state.photos;

export const selectEntities = createSelector(
  [selectPhotos],
  state => state.entities
);

export const selectFavorites = createSelector(
  [selectPhotos, selectEntities],
  (state, entities) => state.favorites
    .sort((a, b) => b.timestamp - a.timestamp)
    .map(favorite => entities[favorite.id])
);
