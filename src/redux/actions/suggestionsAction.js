import {
  fetchEmployeeSuggestions,
  fetchCompanySuggestions,
} from "api/mockSuggestionsDataAPI";

export const FETCH_EMPLOYEE_SUGGESTIONS_REQUEST =
  "FETCH_EMPLOYEE_SUGGESTIONS_REQUEST";
export const FETCH_EMPLOYEE_SUGGESTIONS_SUCCESS =
  "FETCH_EMPLOYEE_SUGGESTIONS_SUCCESS";
export const FETCH_EMPLOYEE_SUGGESTIONS_FAILURE =
  "FETCH_EMPLOYEE_SUGGESTIONS_FAILURE";

export const FETCH_COMPANY_SUGGESTIONS_REQUEST =
  "FETCH_COMPANY_SUGGESTIONS_REQUEST";
export const FETCH_COMPANY_SUGGESTIONS_SUCCESS =
  "FETCH_COMPANY_SUGGESTIONS_SUCCESS";
export const FETCH_COMPANY_SUGGESTIONS_FAILURE =
  "FETCH_COMPANY_SUGGESTIONS_FAILURE";

export const fetchEmployeeSuggestionsRequest = () => ({
  type: FETCH_EMPLOYEE_SUGGESTIONS_REQUEST,
});

export const fetchEmployeeSuggestionsSuccess = (suggestions) => ({
  type: FETCH_EMPLOYEE_SUGGESTIONS_SUCCESS,
  payload: suggestions,
});

export const fetchEmployeeSuggestionsFailure = (error) => ({
  type: FETCH_EMPLOYEE_SUGGESTIONS_FAILURE,
  payload: error,
});

export const fetchCompanySuggestionsRequest = () => ({
  type: FETCH_COMPANY_SUGGESTIONS_REQUEST,
});

export const fetchCompanySuggestionsSuccess = (suggestions) => ({
  type: FETCH_COMPANY_SUGGESTIONS_SUCCESS,
  payload: suggestions,
});

export const fetchCompanySuggestionsFailure = (error) => ({
  type: FETCH_COMPANY_SUGGESTIONS_FAILURE,
  payload: error,
});

export const fetchEmployeeSuggestionsAction =
  (searchText) => async (dispatch) => {
    dispatch(fetchEmployeeSuggestionsRequest());
    try {
      const suggestions = await fetchEmployeeSuggestions(searchText);
      dispatch(fetchEmployeeSuggestionsSuccess(suggestions));
    } catch (error) {
      dispatch(fetchEmployeeSuggestionsFailure(error));
    }
  };

export const fetchCompanySuggestionsAction =
  (searchText) => async (dispatch) => {
    dispatch(fetchCompanySuggestionsRequest());
    try {
      const suggestions = await fetchCompanySuggestions(searchText);
      dispatch(fetchCompanySuggestionsSuccess(suggestions));
    } catch (error) {
      dispatch(fetchCompanySuggestionsFailure(error));
    }
  };
