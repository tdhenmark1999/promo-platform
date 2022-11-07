import { getActionTypeFromInstance } from '@ngxs/store';
import { Logout } from '../../components/auth/store/auth.action';

export function logoutPlugin(state:any, action:any, next:any) {
  // Use the get action type helper to determine the type
  if (getActionTypeFromInstance(action) === Logout.type) {
    // if we are a logout type, lets erase all the state
    state = {};
  }

  // return the next function with the empty state
  return next(state, action);
}