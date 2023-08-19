import {
  FETCH_EMPLOYEE_SUGGESTIONS_REQUEST,
  FETCH_EMPLOYEE_SUGGESTIONS_SUCCESS,
  FETCH_EMPLOYEE_SUGGESTIONS_FAILURE,
  FETCH_COMPANY_SUGGESTIONS_REQUEST,
  FETCH_COMPANY_SUGGESTIONS_SUCCESS,
  FETCH_COMPANY_SUGGESTIONS_FAILURE,
} from "redux/actions/suggestionsAction";

const initialState = {
  employeeSuggestions: [],
  companySuggestions: [],
  loading: false,
  error: null,
};

export const suggestionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEE_SUGGESTIONS_REQUEST:
    case FETCH_COMPANY_SUGGESTIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_EMPLOYEE_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        employeeSuggestions: action.payload,
        loading: false,
      };
    case FETCH_COMPANY_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        companySuggestions: action.payload,
        loading: false,
      };
    case FETCH_EMPLOYEE_SUGGESTIONS_FAILURE:
    case FETCH_COMPANY_SUGGESTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
