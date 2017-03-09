import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createTransform, persistStore, autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk';
import localForage from 'localforage';
import reducer from './reducer';

export const initStore = (services, initialState) => {
  let enhancer;
  const thunkEnhancer = applyMiddleware(thunk.withExtraArgument(services));
  if (typeof window === undefined) {
    enhancer = thunkEnhancer;
  }
  else {
    enhancer = composeWithDevTools(thunkEnhancer, autoRehydrate());
  }

  const store = createStore(reducer, initialState, enhancer);
  persistStore(store, {
    storage: localForage,
    whitelist: ['photos'],
    transforms: [
      createTransform(
        state => {
          const favoriteIds = new Set(state.favorites.map(favorite => favorite.id));
          // Only persist entities in the favorites list
          const entities = {}
          Object.keys(state.entities)
            .forEach(key => {
              if (favoriteIds.has(state.entities[key].id)) {
                entities[key] = state.entities[key];
              }
            });
          return {
            entities,
            favorites: state.favorites,
          };
        },
        state => state,
      )
    ],
  });

  return store;
};
