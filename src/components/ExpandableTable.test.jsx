import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { ExpandableTable } from "components/ExpandableTable";
// import * as utils from "../utils/fetchEmployeeData";
import { fetchEmployeeData } from "utils/fetchEmployeeData";

// // Mock the fetchEmployeeData function
jest.mock("utils/fetchEmployeeData", () => ({
  fetchEmployeeData: jest.fn(),
}));

const mockStore = configureStore();
const initialState = {};
let store = mockStore(initialState);

// Mock matchMedia method to provide a fallback implementation
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

// Mock the fetchEmployeeData function
// jest.mock("../utils/fetchEmployeeData");
// const fetchEmployeeData = jest.spyOn(utils, "fetchEmployeeData");

describe("ExpandableTable", () => {
  beforeEach(() => {
    // Set up mock data for the fetchEmployeeData function
    fetchEmployeeData.mockImplementation(() => {
      console.log("Mock fetchEmployeeData called");
      return Promise.resolve([
        {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
          address: { city: "New York" },
          company: { name: "Acme Inc." },
        },
        {
          id: 2,
          name: "Jane Doe",
          email: "jane.doe@example.com",
          address: { city: "Los Angeles" },
          company: { name: "Acme Inc." },
        },
        {
          id: 3,
          name: "Leanne Graham",
          email: "Sincere@april.biz",
          address: { city: "Gwenborough" },
          company: { name: "Romaguera-Crona" },
        },
        {
          id: 4,
          name: "Ervin Howell",
          email: "Shanna@melissa.tv",
          address: { city: "Wisokyburgh" },
          company: { name: "Deckow-Crist" },
        },
        {
          id: 5,
          name: "Clementine Bauch",
          email: "Nathan@yesenia.net",
          address: { city: "McKenziehaven" },
          company: { name: "Romaguera-Jacobson" },
        },
        {
          id: 6,
          name: "Patricia Lebsack",
          email: "Julianne.OConner@kory.org",
          address: { city: "South Elvis" },
          company: { name: "Robel-Corkery" },
        },
      ]);
    });
  });

  afterEach(() => {
    // Clear all mocks after each test
    jest.clearAllMocks();
  });

  test("renders the component and displays the table data", async () => {
    render(
      <Provider store={store}>
        <ExpandableTable
          isFirstLevel={true}
          selectedEmployee="John Doe"
          selectedCompany="Acme Inc."
        />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Name")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Email")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("City")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Company")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("jane.doe@example.com")).toBeInTheDocument();
    });
  });

  test("user can interact with table pagination controls", async () => {
    const { rerender } = render(
      <Provider store={store}>
        <ExpandableTable
          isFirstLevel={true}
          selectedEmployee=""
          selectedCompany=""
        />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("1-5 of 6")).toBeInTheDocument();
    });

    const nextButton = screen.getByRole("button", { name: /next page/i });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText("6-6 of 6")).toBeInTheDocument();
    });

    rerender(
      <Provider store={store}>
        <ExpandableTable
          isFirstLevel={true}
          selectedEmployee="John Doe"
          selectedCompany="Acme Inc."
        />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("1-1 of 1")).toBeInTheDocument();
    });
  });

  test("clicking on a cell opens the Popup component", async () => {
    render(
      <Provider store={store}>
        <ExpandableTable
          isFirstLevel={true}
          selectedEmployee="John Doe"
          selectedCompany="Acme Inc."
        />
      </Provider>
    );

    const emailCell = screen.getByText("john.doe@example.com");
    fireEvent.click(emailCell);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Send Mail")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Download Data")).toBeInTheDocument();
    });
  });
});

// import React from "react";
// import { render, fireEvent, screen } from "@testing-library/react";
// import { ExpandableTable } from "./ExpandableTable";
// import { fetchEmployeeData } from "utils/fetchEmployeeData";

// // Mock the fetchEmployeeData function
// jest.mock("utils/fetchEmployeeData", () => ({
//   fetchEmployeeData: jest.fn(),
// }));

// describe("ExpandableTable", () => {
//   /* Below code was included, as otherwise Testing Library was having issues with Ant Design table */
//   /* Earlier, it was throwing below error : */
//   /* Uncaught TypeError - window.matchmedia is not a function*/
//   /* Mock matchMedia method to provide a fallback implementation */
//   window.matchMedia =
//     window.matchMedia ||
//     function () {
//       return {
//         matches: false,
//         addListener: function () {},
//         removeListener: function () {},
//       };
//     };

//   beforeEach(() => {
//     // Set up mock data for the fetchEmployeeData function
//     fetchEmployeeData.mockImplementation(() =>
//       Promise.resolve([
//         {
//           id: 1,
//           name: "John Doe",
//           email: "john.doe@example.com",
//           address: { city: "New York" },
//           company: { name: "Acme Inc." },
//         },
//         {
//           id: 2,
//           name: "Jane Doe",
//           email: "jane.doe@example.com",
//           address: { city: "Los Angeles" },
//           company: { name: "Acme Inc." },
//         },
//       ])
//     );
//   });

//   afterEach(() => {
//     // Clear all mocks after each test
//     jest.clearAllMocks();
//   });

//   it("renders the component and displays the table data", async () => {
//     render(<ExpandableTable selectedEmployee="" selectedCompany="" />);

//     // Wait for the table data to be fetched and displayed
//     expect(await screen.findByText("John Doe")).toBeInTheDocument();
//     expect(await screen.findByText("jane.doe@example.com")).toBeInTheDocument();
//   });

//   it("allows the user to interact with the table pagination controls", async () => {
//     render(
//       <ExpandableTable
//         isFirstLevel={true}
//         selectedEmployee=""
//         selectedCompany=""
//       />
//     );

//     // Wait for the table data to be fetched and displayed
//     expect(await screen.findByText("John Doe")).toBeInTheDocument();
//     expect(screen.queryByText("jane.doe@example.com")).not.toBeInTheDocument();

//     // Change the number of rows per page
//     fireEvent.mouseDown(screen.getByLabelText("Rows per page"));
//     fireEvent.click(screen.getByText("5"));

//     // Check that both rows are now displayed
//     expect(screen.getByText("John Doe")).toBeInTheDocument();
//     expect(screen.getByText("jane.doe@example.com")).toBeInTheDocument();
//   });
// });

// import React from "react";
// import { render, fireEvent, screen } from "@testing-library/react";
// import { Provider } from "react-redux";
// import configureStore from "redux-mock-store";
// import { ExpandableTable } from "./ExpandableTable";

// const mockStore = configureStore();
// const initialState = {};
// let store = mockStore(initialState);

// // Mock matchMedia method
// window.matchMedia =
//   window.matchMedia ||
//   function () {
//     return {
//       matches: false,
//       addListener: function () {},
//       removeListener: function () {},
//     };
//   };

// describe("ExpandableTable", () => {
//   test("renders the component and displays the table data", async () => {
//     render(
//       <Provider store={store}>
//         <ExpandableTable />
//       </Provider>
//     );

//     // Check if table headers are rendered
//     expect(screen.getByText("Name")).toBeInTheDocument();
//     expect(screen.getByText("Email")).toBeInTheDocument();
//     expect(screen.getByText("City")).toBeInTheDocument();
//     expect(screen.getByText("Company")).toBeInTheDocument();

//     // Check if table data is rendered
//     const nameCell = await screen.findByText("Leanne Graham");
//     expect(nameCell).toBeInTheDocument();
//   });

//   test("allows the user to interact with the table pagination controls", async () => {
//     render(
//       <Provider store={store}>
//         <ExpandableTable isFirstLevel={true} />
//       </Provider>
//     );

//     // Check if pagination controls are rendered
//     const nextButton = screen.getByRole("button", { name: /next page/i });
//     expect(nextButton).toBeInTheDocument();

//     // Click on next page button
//     fireEvent.click(nextButton);

//     // Check if table data is updated
//     const nameCell = await screen.findByText("Ervin Howell");
//     expect(nameCell).toBeInTheDocument();
//   });

//   test("clicking on a cell opens the GenericPopup component", async () => {
//     render(
//       <Provider store={store}>
//         <ExpandableTable />
//       </Provider>
//     );

//     // Click on a cell
//     const nameCell = await screen.findByText("Leanne Graham");
//     fireEvent.click(nameCell);

//     // Check if GenericPopup is opened
//     const popupHeader = await screen.findByText("Leanne Graham");
//     expect(popupHeader).toBeInTheDocument();
//   });
// });
