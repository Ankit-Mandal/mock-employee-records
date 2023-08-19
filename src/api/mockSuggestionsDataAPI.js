import { employeeNames, companyNames } from "data/mockSuggestionsData";

export const fetchEmployeeSuggestions = (searchText) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredEmployeeSuggestions = employeeNames.filter((name) =>
        name.toLowerCase().includes(searchText.toLowerCase())
      );
      resolve(filteredEmployeeSuggestions);
    }, 1000);
  });
};

export const fetchCompanySuggestions = (searchText) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredCompanySuggestions = companyNames.filter((name) =>
        name.toLowerCase().includes(searchText.toLowerCase())
      );
      resolve(filteredCompanySuggestions);
    }, 1000);
  });
};
