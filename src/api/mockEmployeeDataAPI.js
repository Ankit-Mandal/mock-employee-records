import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { mockEmployeeData } from "data/mockEmployeeData";

const mock = new MockAdapter(axios);

mock.onPost("/api/employeeData").reply((config) => {
  const { employee, company } = JSON.parse(config.data);
  let filteredEmployeeData = [...mockEmployeeData];

  if (employee) {
    filteredEmployeeData = filteredEmployeeData.filter(
      (row) => row.name === employee
    );
  }
  if (company) {
    filteredEmployeeData = filteredEmployeeData.filter(
      (row) => row.company.name === company
    );
  }
  return [200, filteredEmployeeData];
});
