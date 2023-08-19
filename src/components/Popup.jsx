import React, { useState, useEffect } from "react";
import { Table as AntDesignTable } from "antd";
import { Modal, IconButton, Box, Stack, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TablePagination from "@mui/material/TablePagination";

import { fetchEmployeeData } from "utils/fetchEmployeeData";

export const Popup = ({ open, onClose, header, buttons }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const handleSendMail = () => {
    console.log("Mail Sent");
  };

  const handleDownloadTableData = () => {
    console.log("Data downloaded");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = data.slice(page * pageSize, page * pageSize + pageSize);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchEmployeeData();
        const rowData = result.map((row) => ({ ...row, key: row.id }));
        setData(rowData);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend", "descend"],
    },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="employee-modal"
      aria-describedby="employee-data"
    >
      <Box
        sx={{
          width: "90%",
          margin: "auto",
          marginTop: "5%",
          padding: "10px",
          backgroundColor: "#FFFFFF",
          boxShadow: 3,
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Box
            sx={{
              fontFamily: "sans-serif",
              fontWeight: "700",
              fontSize: "32px",
              color: "#CA001B",
            }}
          >
            {header}
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <AntDesignTable
          columns={columns}
          dataSource={paginatedData}
          pagination={false}
        />
        <TablePagination
          component="div"
          count={data.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={pageSize}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[1, 5, 10]}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "20px",
          }}
        >
          <Stack direction="row" spacing={2} mt={2}>
            {buttons.map((button) => (
              <Button
                key={button.btnID}
                onClick={() => {
                  if (button.label === "Send Mail") {
                    handleSendMail();
                  }
                  if (button.label === "Download Data") {
                    handleDownloadTableData();
                  }
                }}
                sx={{
                  ...button.sx,
                  backgroundColor:
                    button.label === "Download Data" ? "#CA001B" : "#FFFFFF",
                  color:
                    button.label === "Download Data" ? "#FFFFFF" : "#CA001B",
                }}
              >
                {button.label}
              </Button>
            ))}
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};
