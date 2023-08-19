import axios from "axios";

export const fetchEmployeeData = async (employee, company) => {
  const response = await axios.post("/api/employeeData", { employee, company });

  return response.data;
};

// export const fetchEmployeeData = async (employee, company) => {
//   const result = await axios(`https://jsonplaceholder.typicode.com/users`);
//   return result.data;
// };
