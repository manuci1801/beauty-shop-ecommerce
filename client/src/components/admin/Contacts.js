import React from "react";
import axios from "axios";
import { formatDate } from "../../utils/formatDate";
import { Button, Input, Table } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

function Contacts({ contacts, deleteContact }) {
  const handleDelete = (id) => {
    axios.delete(`/api/contacts/${id}`).then((res) => {
      deleteContact(id);
    });
  };

  const exportToCSV = (csvData, fileName) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  const columns = [
    {
      title: "STT",
      width: 60,
      dataIndex: "stt",
      key: "stt",
      fixed: "left",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    { title: "Nội dung", dataIndex: "content", key: "content" },
    {
      title: "Hành động",
      key: "actions",
      fixed: "right",
      width: 200,
      render: (text, record) => (
        <>
          <Button
            type="primary"
            danger
            onClick={() => handleDelete(record._id)}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "8px",
          borderBottom: "1px solid #999",
        }}
      >
        <div style={{ display: "flex", marginLeft: "auto" }}>
          <Button
            type="primary"
            onClick={() =>
              exportToCSV(contacts, `contacts ${formatDate(new Date())}`)
            }
            icon={<DownloadOutlined />}
            size="large"
          >
            Xuất Excel
          </Button>
        </div>
      </div>

      <Table columns={columns} dataSource={contacts} scroll={{ x: "100%" }} />
    </>
  );
}

export default Contacts;
