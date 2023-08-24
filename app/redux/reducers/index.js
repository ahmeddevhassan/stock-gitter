import { combineReducers } from 'redux';
import User from './User';
import News from './News';
import Simulation from './Simulation';
import Notification from './Notification';
import Game from './Game';
import Search from './Search';
export default combineReducers({
  auth: User,
  news: News,
  simulation: Simulation,
  notification: Notification,
  game: Game,
  search: Search
});
