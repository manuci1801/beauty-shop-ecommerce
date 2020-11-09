import React from "react";
import axios from "axios";
import { formatDate } from "../../utils/formatDate";
import { Button, Input, Table } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

function Contacts({ contacts, deleteContact }) {
  const handleDelete = (id) => {
    axios.delete(`/api/contacts/${id}`).then((res) => {
      deleteContact(id);
    });
  };

  const columns = [
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
          <Button type="primary" icon={<DownloadOutlined />} size="large">
            Xuất Excel
          </Button>
          <Input style={{ marginLeft: "4px" }} placeholder="Tìm kiếm" />
        </div>
      </div>

      <Table columns={columns} dataSource={contacts} scroll={{ x: "100%" }} />
    </>
  );
}

export default Contacts;
