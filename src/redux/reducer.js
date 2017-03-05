import { combineReducers } from 'redux';
import photosReducer from './photos/reducer';

export default combineReducers({
  photos: photosReducer,
});
