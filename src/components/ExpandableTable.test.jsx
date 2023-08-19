import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { ExpandableTable } from "components/ExpandableTable";
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
