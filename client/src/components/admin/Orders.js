import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatDate } from "../../utils/formatDate";
import formatPrice from "../../utils/formatPrice";
import { Button, Input, Table, Tag, Tabs, Checkbox } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import OrderDetail from "./OrderDetail";

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

function Orders({
  orders,
  handleOnAddOrder,
  products,
  updateOrders,
  deleteOrder,
}) {
  const { TabPane } = Tabs;

  const [currentTab, setCurrentTab] = useState("orders-all");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 4 });

  const [paid, setPaid] = useState(false);
  const [unpaid, setUnpaid] = useState(false);
  const [ordersSelected, setOrdersSelected] = useState([]);

  const [orderSelected, setOrderSelected] = useState("");

  function handleChangeTab(key) {
    setCurrentTab(key);
  }

  const handleDeleteOrder = (id) => {
    deleteOrder(id);
    setOrderSelected("");
  };

  const rowSelection = {
    ordersSelected,
    onChange: (selectedRowKeys) => {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      setOrdersSelected(selectedRowKeys);
    },
  };

  useEffect(() => {
    // if (orderIdSelected) {
    //   alert(orderIdSelected);
    // }
  }, [orderSelected]);

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  const handleCancelOrder = (id) => {
    axios
      .get(`/api/orders/${id}/cancel`)
      .then((res) => updateOrders(res.data))
      .catch((err) => console.log(err));
  };

  const columns = [
    {
      title: "STT",
      width: 60,
      dataIndex: "stt",
      key: "stt",
      fixed: "left",
      render: (_, record, index) => (
        <a onClick={() => setOrderSelected(record)}>
          {index + 1 + (pagination.current - 1) * pagination.pageSize}
        </a>
      ),
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
      width: 100,
      fixed: "left",
      render: (text, record) => (
        <a onClick={() => setOrderSelected(record)}>{text}</a>
      ),
    },
    {
      title: "Sản phẩm",
      dataIndex: "products",
      key: "products",
      render: (text, record) =>
        text.map((e, index) => (
          <div>
            <a onClick={() => setOrderSelected(record)}>
              <span style={{ fontSize: "20px", fontWeight: "800" }}>
                {e.amount}
              </span>
              {" x "}
              <span className=" italic">
                {e.productId && e.productId.name ? (
                  e.productId.name
                ) : (
                  <span className="text-red-600">Sản phẩm đã bị xóa</span>
                )}
              </span>
            </a>
          </div>
        )),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    { title: "Ghi chú", dataIndex: "note", key: "note" },
    {
      title: "Hình thức vận chuyển",
      dataIndex: "shipType",
      key: "shipType",
      render: (text) => (
        <div>
          {text === "standard"
            ? "Tiêu chuẩn"
            : text === "fast"
            ? "Giao hàng nhanh"
            : null}
        </div>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (text) => formatPrice(text),
    },
    {
      title: "Tranh toán",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (text) =>
        text ? (
          <Tag color="#87d068">Đã thanh toán</Tag>
        ) : (
          <Tag color="#ff4d4f">Chưa thanh toán</Tag>
        ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text) =>
        text === "pending" ? (
          <Tag color="#f50">Đang xử lý</Tag>
        ) : text === "packed" ? (
          <Tag color="#2db7f5">Đã đóng hộp</Tag>
        ) : text === "delivered" ? (
          <Tag color="#108ee9">Đã chuyển hàng</Tag>
        ) : text === "success" ? (
          <Tag color="#87d068">Đã hoàn thành</Tag>
        ) : (
          <Tag color="#ff4d4f">Đã hủy</Tag>
        ),
    },
    {
      title: "Hành động",
      key: "actions",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <>
          {record.status !== "cancel" ? (
            <Button
              type="primary"
              danger
              onClick={() => handleCancelOrder(record._id)}
            >
              Hủy
            </Button>
          ) : null}
        </>
      ),
    },
  ];

  return (
    <>
      {orderSelected ? (
        <OrderDetail
          products={products}
          orderSelected={orderSelected}
          setOrderSelected={setOrderSelected}
          updateOrders={updateOrders}
          handleDeleteOrder={handleDeleteOrder}
        />
      ) : (
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
            <Button
              type="primary"
              size="large"
              onClick={() => handleOnAddOrder()}
            >
              Thêm
            </Button>
            <div style={{ display: "flex" }}>
              <Button
                onClick={() =>
                  exportToCSV(orders, `orders ${formatDate(new Date())}`)
                }
                type="primary"
                icon={<DownloadOutlined />}
                size="large"
              >
                Xuất Excel
              </Button>
              <Input style={{ marginLeft: "4px" }} placeholder="Tìm kiếm" />
            </div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-semibold mb-2">
              Tình trạng thanh toán
            </div>
            <div className="ml-4">
              <Checkbox onChange={() => setPaid(!paid)} checked={paid}>
                Đã thanh toán
              </Checkbox>
              <Checkbox onChange={() => setUnpaid(!unpaid)} checked={unpaid}>
                Chưa thanh toán
              </Checkbox>
            </div>
          </div>
          <Tabs defaultActiveKey={currentTab} onChange={handleChangeTab}>
            <TabPane tab="Tất cả đơn hàng" key="orders-all">
              <Table
                columns={columns}
                dataSource={
                  paid && unpaid
                    ? orders.filter(
                        (order) =>
                          (paid ? order.isPaid : true) ||
                          (unpaid ? !order.isPaid : true)
                      )
                    : paid
                    ? orders.filter((order) => (paid ? order.isPaid : true))
                    : unpaid
                    ? orders.filter((order) => (unpaid ? !order.isPaid : true))
                    : orders
                }
                rowKey={(record) => record._id}
                pagination={pagination}
                // rowSelection={rowSelection}
                onChange={(_pagination, filters, sorter) =>
                  setPagination(_pagination)
                }
                scroll={{ x: "200%" }}
                onRow={(record) => ({
                  // onClick: () => {
                  //   alert("1");
                  // },
                })}
              />
            </TabPane>
            <TabPane tab="Đang xử lý" key="orders-pending">
              <Table
                columns={columns}
                dataSource={
                  paid && unpaid
                    ? orders.filter(
                        (order) =>
                          (paid ? order.isPaid : true) ||
                          ((unpaid ? !order.isPaid : true) &&
                            order.status === "pending")
                      )
                    : paid
                    ? orders.filter(
                        (order) =>
                          (paid ? order.isPaid : true) &&
                          order.status === "pending"
                      )
                    : unpaid
                    ? orders.filter(
                        (order) =>
                          (unpaid ? !order.isPaid : true) &&
                          order.status === "pending"
                      )
                    : orders.filter((order) => order.status === "pending")
                }
                rowKey={(record) => record._id}
                pagination={pagination}
                // rowSelection={rowSelection}
                onChange={(_pagination, filters, sorter) =>
                  setPagination(_pagination)
                }
                scroll={{ x: "200%" }}
                onRow={(record) => ({
                  onClick: () => {
                    alert("1");
                  },
                })}
              />
            </TabPane>
            <TabPane tab="Đã đóng gói" key="orders-packed">
              <Table
                columns={columns}
                dataSource={orders.filter((order) => order.status === "packed")}
                rowKey={(record) => record._id}
                pagination={pagination}
                // rowSelection={rowSelection}
                onChange={(_pagination, filters, sorter) =>
                  setPagination(_pagination)
                }
                scroll={{ x: "200%" }}
              />
            </TabPane>
            <TabPane tab="Đã giao hàng" key="orders-delivered">
              <Table
                columns={columns}
                dataSource={orders.filter(
                  (order) => order.status === "delivered"
                )}
                rowKey={(record) => record._id}
                pagination={pagination}
                // rowSelection={rowSelection}
                onChange={(_pagination, filters, sorter) =>
                  setPagination(_pagination)
                }
                scroll={{ x: "200%" }}
              />
            </TabPane>
            <TabPane tab="Thành công" key="orders-success">
              <Table
                columns={columns}
                dataSource={orders.filter(
                  (order) => order.status === "success"
                )}
                rowKey={(record) => record._id}
                pagination={pagination}
                // rowSelection={rowSelection}
                onChange={(_pagination, filters, sorter) =>
                  setPagination(_pagination)
                }
                scroll={{ x: "200%" }}
              />
            </TabPane>
            <TabPane tab="Bị hủy" key="orders-cancel">
              <Table
                columns={columns}
                pagination={pagination}
                // rowSelection={rowSelection}
                onChange={(_pagination, filters, sorter) =>
                  setPagination(_pagination)
                }
                scroll={{ x: "200%" }}
                onRow={(record) => ({
                  onClick: () => {
                    alert("1");
                  },
                })}
                dataSource={orders.filter((order) => order.status === "cancel")}
              />
            </TabPane>
          </Tabs>
        </>
      )}
    </>
  );
}

export default Orders;
