import * as actionTypes from './action-types';

const initialState = {
  entities: {},
  favorites: {},
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
      const { id } = action.payload;
      return {
        ...state,
        favorites: {
          ...state.favorites,
          [id]: action.payload,
        },
      }
    default:
      return state;
  }
};
