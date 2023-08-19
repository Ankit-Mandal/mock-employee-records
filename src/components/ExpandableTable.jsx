import React, { useState, useEffect } from "react";
import { Table as AntDesignTable } from "antd";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TablePagination from "@mui/material/TablePagination";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { fetchEmployeeData } from "utils/fetchEmployeeData";
import { Popup } from "components/Popup";

const popupButtonsConfig = [
  {
    btnID: 1,
    label: "Send Mail",
    sx: {
      color: "#212121",
      border: `1px solid red`,
      backgroundColor: "transparent",
      textTransform: "none",
      fontWeight: 700,
      fontSize: "16px",
      width: "250px",
      height: "38px",
      "&:hover": { backgroundColor: "transparent" },
      "&:focus": { outline: "none" },
    },
  },
  {
    btnID: 2,
    label: "Download Data",
    sx: {
      backgroundColor: "#CA001B",
      color: "#FFFFFF",
      padding: "9px 30px",
      borderRadius: "2px",
      gap: "10px",
      textTransform: "none",
      fontWeight: 700,
      fontSize: "16px",
      width: "250px",
      height: "38px",
      "&:hover": { backgroundColor: "#CA001B", color: "#FFFFFF" },
      "&:focus": { outline: "none" },
    },
  },
];

export const ExpandableTable = ({
  isFirstLevel = false,
  selectedEmployee,
  selectedCompany,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(isFirstLevel ? 5 : 2);
  const [selectedTabValue, setSelectedTabValue] = useState(0);

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupButtons, setPopupButtons] = useState([]);
  const [popupHeader, setPopupHeader] = useState("");

  let tabs = [{ name: "Subordinates" }];
  const handleChange = (event, newValue) => {
    setSelectedTabValue(newValue);
  };

  const handlePopupButtonClick = (record) => {
    setPopupHeader(record.name);
    setPopupButtons(popupButtonsConfig);
    setPopupOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = tableData.slice(
    page * pageSize,
    page * pageSize + pageSize
  );

  const loadExpandIcon = ({ expanded, onExpand, record }) => {
    if (expanded)
      return (
        <ExpandLessIcon
          onClick={(e) => onExpand(record, e)}
          sx={{ cursor: "pointer" }}
        />
      );
    else
      return (
        <ExpandMoreIcon
          onClick={(e) => onExpand(record, e)}
          sx={{ cursor: "pointer" }}
        />
      );
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        console.log(
          "fetchData async method inside useEffect of ExpandableTable called"
        );
        const result = await fetchEmployeeData(
          selectedEmployee,
          selectedCompany
        );
        if (result.length > 0) {
          const rowData = result.map((row) => ({
            // ...row,
            key: row.id,
            name: row.name,
            email: row.email,
            city: row.address.city,
            company: row.company.name,
          }));
          setTableData(rowData);
        }
        setIsLoading(false);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [selectedEmployee, selectedCompany]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const antDesignTableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend", "descend"],
      onCell: (record) => {
        return {
          onClick: () => {
            handlePopupButtonClick(record);
          },
          style: { cursor: "pointer" },
        };
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      onCell: (record) => {
        return {
          onClick: () => {
            handlePopupButtonClick(record);
          },
          style: { cursor: "pointer" },
        };
      },
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      onCell: (record) => {
        return {
          onClick: () => {
            handlePopupButtonClick(record);
          },
          style: { cursor: "pointer" },
        };
      },
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      onCell: (record) => {
        return {
          onClick: () => {
            handlePopupButtonClick(record);
          },
          style: { cursor: "pointer" },
        };
      },
    },
  ];

  const CustomNoDataOverlay = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: "0px",
        width: "100%",
        height: "240px",
        fontFamily: "sans-serif",
        fontWeight: 900,
        fontSize: "26px",
        lineHeight: "32px",
        color: "#888B8D",
        backgroundColor: "#F4F4F4",
      }}
    >
      {"No Employee Data available"}
    </Box>
  );

  const expandedRowRender = () => {
    return <ExpandableTable />;
  };

  return (
    <Box>
      <Box sx={{ marginBottom: "20px" }}>
        {!isFirstLevel ? (
          <Tabs
            data-testid="mainTabs"
            value={selectedTabValue}
            onChange={handleChange}
            TabIndicatorProps={{
              sx: {
                height: "3px",
                borderRadius: "3px",
              },
            }}
            sx={{
              minHeight: "45px",
              "& .Mui-selected": {
                fontWeight: "bold",
              },
            }}
            aria-label="TAP Navigation"
          >
            {tabs.map((tab, index) => (
              <Tab
                key={tab.name}
                label={tab.name}
                data-testid={tab.name}
                sx={{
                  textTransform: "none",
                  borderBottom: 3,
                  borderColor: "divider",
                  minHeight: "45px",
                  color: "#000 !important",
                }}
              />
            ))}
          </Tabs>
        ) : null}
      </Box>
      <AntDesignTable
        loading={isLoading}
        columns={antDesignTableColumns}
        dataSource={paginatedData}
        expandable={{
          expandIcon: loadExpandIcon,
          expandedRowRender: expandedRowRender,
        }}
        pagination={false}
        locale={{ emptyText: CustomNoDataOverlay }}
      />
      <TablePagination
        component="div"
        count={tableData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={isFirstLevel ? [1, 5, 10] : []}
      />
      <Popup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        header={popupHeader}
        buttons={popupButtons}
      />
    </Box>
  );
};
