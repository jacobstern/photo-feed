import * as actionTypes from './action-types';

const initialState = {
  entities: {},
  favorites: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MERGE_ENTITIES:
      const newEntities = {};
      action.payload.entities.forEach(entity => {
        newEntities[entity.id] = entity;
      });
      return {
        ...state,
        entities: {
          ...state.entities,
          ...newEntities,
        },
      };
    case actionTypes.ADD_FAVORITE:
      const addedId = action.payload.id;
      return {
        ...state,
        entities: {
          ...state.entities,
          [addedId]: {
            ...state.entities[addedId],
            favorited: true,
          },
        },
        favorites: [...state.favorites, action.payload],
      };
    case actionTypes.REMOVE_FAVORITE:
      const removedId = action.payload.id;
      return {
        ...state,
        entities: {
          ...state.entities,
          [removedId]: {
            ...state.entities[removedId],
            favorited: false,
          },
        },
        favorites: state.favorites.filter(favorite => favorite.id !== action.payload.id),
      };
    default:
      return state;
  }
};
