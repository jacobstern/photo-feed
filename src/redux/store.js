import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducer';

export const initStore = (initialState, injectedServices) => {
  let enhancer;
  const thunkEnhancer = applyMiddleware(thunk.withExtraArgument(injectedServices));
  if (typeof window === undefined) {
    enhancer = thunkEnhancer;
  }
  else {
    enhancer = composeWithDevTools(thunkEnhancer);
  }
  return createStore(reducer, initialState, enhancer);
};
