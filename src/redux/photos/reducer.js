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
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case actionTypes.REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(favorite => favorite.id !== action.payload.id)
      };
    default:
      return state;
  }
};
