import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, TextField, Box } from "@mui/material";

import { ExpandableTable } from "components/ExpandableTable";
import {
  fetchEmployeeSuggestionsAction,
  fetchCompanySuggestionsAction,
} from "redux/actions/suggestionsAction";

export const EmployeeComponent = () => {
  const dispatch = useDispatch();
  const [employeeSearchText, setEmployeeSearchText] = useState("");
  const [companySearchText, setCompanySearchText] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);

  const employeeSuggestions = useSelector(
    (state) => state.suggestionsRd.employeeSuggestions
  );
  const companySuggestions = useSelector(
    (state) => state.suggestionsRd.companySuggestions
  );

  useEffect(() => {
    if (employeeSearchText) {
      dispatch(fetchEmployeeSuggestionsAction(employeeSearchText));
    }
  }, [dispatch, employeeSearchText]);

  useEffect(() => {
    if (companySearchText) {
      dispatch(fetchCompanySuggestionsAction(companySearchText));
    }
  }, [dispatch, companySearchText]);

  useEffect(() => {
    setEmployeeOptions(employeeSuggestions);
  }, [employeeSuggestions]);

  useEffect(() => {
    setCompanyOptions(companySuggestions);
  }, [companySuggestions]);

  const handleEmployeeInputChange = (event, value, reason) => {
    setEmployeeOptions([]);
    setSelectedEmployee("");

    if (value?.length) {
      setEmployeeSearchText(value);
    } else {
      setEmployeeSearchText("");
      setSelectedEmployee("");
      setEmployeeOptions([]);
    }
    if (reason === "clear" || reason === "reset") {
      setEmployeeSearchText("");
      setSelectedEmployee("");
      setEmployeeOptions([]);
    }
  };

  const handleCompanyInputChange = (event, value, reason) => {
    setCompanyOptions([]);

    if (value?.length) {
      setCompanySearchText(value);
    } else {
      setCompanySearchText("");
      setSelectedCompany("");
      setCompanyOptions([]);
    }
    if (reason === "clear" || reason === "reset") {
      setCompanySearchText("");
      setSelectedCompany("");
      setCompanyOptions([]);
    }
  };

  const handleEmployeeChange = (event, newValue) => {
    setSelectedEmployee(newValue);
    setEmployeeSearchText(newValue);
  };

  const handleCompanyChange = (event, newValue) => {
    setSelectedCompany(newValue);
    setCompanySearchText(newValue);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <Autocomplete
          options={employeeOptions}
          getOptionLabel={(option) => option}
          onInputChange={handleEmployeeInputChange}
          onChange={handleEmployeeChange}
          value={selectedEmployee || null}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search by Employee"
              sx={{ width: 300, borderBottom: "1px solid black" }}
              variant="standard"
              margin="normal"
            />
          )}
        />
        <Autocomplete
          options={companyOptions}
          getOptionLabel={(option) => option}
          onInputChange={handleCompanyInputChange}
          onChange={handleCompanyChange}
          value={selectedCompany || null}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search by Company"
              sx={{ width: 300, borderBottom: "1px solid black" }}
              variant="standard"
              margin="normal"
            />
          )}
          clearOnBlur
        />
      </Box>
      <ExpandableTable
        isFirstLevel={true}
        selectedEmployee={selectedEmployee}
        selectedCompany={selectedCompany}
      />
    </>
  );
};
