import { combineReducers } from 'redux';
import feedReducer from './feed/reducer';
import photosReducer from './photos/reducer';

export default combineReducers({
  feed: feedReducer,
  photos: photosReducer,
});
