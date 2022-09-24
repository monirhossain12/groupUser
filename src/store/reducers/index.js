import { combineReducers } from 'redux';
import groupListReducer from './groupListReducer';
import userListReducer from './userListReducer';




const appReducer = combineReducers({
  allGroupList: groupListReducer,
  allUserList: userListReducer,
});

const rootReducer = (state, action) => {

  return appReducer(state, action);
}

export default rootReducer;