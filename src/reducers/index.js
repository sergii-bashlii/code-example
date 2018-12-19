import { combineReducers } from 'redux'
import searchReducer from './searchReducer';
import modalReducer from './modalReducer';
import mapReducer from './mapReducer';
import pathReducer from './pathReducer';

export default combineReducers({
  search: searchReducer,
  modal: modalReducer,
  map: mapReducer,
  paths: pathReducer,
});