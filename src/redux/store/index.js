import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import { suggestionsReducer } from "redux/reducers/suggestionsReducer";

const rootReducer = combineReducers({
  suggestionsRd: suggestionsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
