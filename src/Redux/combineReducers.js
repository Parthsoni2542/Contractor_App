import { applyMiddleware, combineReducers, createStore } from 'redux';
import auth from './Reducers/authReducer/auth';
import Sitelist from './Reducers/SiteListingReducer/Sitelist';
import visited from './Reducers/VisitedSiteReducer/visited';
import filter from './Reducers/filterReducer/filter';
import checklist  from './Reducers/checklistReducer/checklistdata';
import ongoinglist from './Reducers/ongoingReducer/ongoinglist';
import thunk from 'redux-thunk';
 const combineReducerss = combineReducers({
  auth,
  Sitelist,
  visited,
  filter,
  checklist,
  ongoinglist
});



const store = createStore(combineReducerss, applyMiddleware(thunk));
export default store;