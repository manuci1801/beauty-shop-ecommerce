import React, { useState, useEffect } from "react";
import axios from "axios";
import formatPrice from "../../utils/formatPrice";
import { Button, Input, Table, Modal, Radio } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import toastNotify from "../../utils/toastNotify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parseHTML from "html-react-parser";

function Coupons() {
  const [coupons, setCoupons] = useState([]);

  const [isVisible, setIsVisible] = useState(false);

  const [name, setName] = useState("");
  const [discount, setDiscount] = useState("");
  const [discountType, setDiscountType] = useState("price");
  const [count, setCount] = useState("");
  const [description, setDescription] = useState("");
  // const [startAt, setStartAt] = useState("");
  // const [endAt, setEndAt] = useState("");

  const [isUpdate, setIsUpdate] = useState(false);

  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  useEffect(() => {
    axios
      .get("/api/coupons")
      .then((res) => {
        setCoupons(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/coupons/${id}`).then((res) => {
      setCoupons(coupons.filter((e) => e._id != id));
    });
  };

  function resetState() {
    setDiscount("");
    setDiscountType("price");
  }

  const handleAdd = () => {
    if (!name)
      return toastNotify("warn", "Tên mã giảm giá không được để trống");
    else if (!discount)
      return toastNotify(
        "warn",
        "Giá hay phần trăm giảm giá không được để trống"
      );
    else if (!count) return toastNotify("warn", "Số lượng không được để trống");
    else if (!description)
      return toastNotify("warn", "Mô tả không được để trống");
    else {
      let data = { name, discount, usableCount: count, description };
      if (discountType === "rate") data.discountRate = discount;
      else if (discountType === "price") data.discountPrice = discount;

      axios
        .post("/api/coupons", data)
        .then((res) => {
          resetState();
          setIsVisible(false);
          setCoupons([...coupons, res.data]);
        })
        .catch((err) => toastNotify("error", "Đã có lỗi xảy ra"));
    }
  };

  const handleUpdate = () => {};

  const columns = [
    {
      title: "STT",
      width: 60,
      dataIndex: "stt",
      key: "stt",
      fixed: "left",
      render: (_, __, index) =>
        index + 1 + (pagination.current - 1) * pagination.pageSize,
    },
    {
      title: "Tên mã giảm giá",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Giá hay phần trăm giảm giá",
      dataIndex: "discount",
      key: "discount",
      render: (_, record) =>
        record.discountRate ? (
          <div>-{record.discountRate}%</div>
        ) : record.discountPrice ? (
          <div>-{formatPrice(record.discountPrice)}₫</div>
        ) : null,
    },
    {
      title: "Số lượng dùng được",
      dataIndex: "usableCount",
      key: "usableCount",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (text) => parseHTML(text),
    },
    // { title: "Bắt đầu", dataIndex: "startAt", key: "startAt" },
    // { title: "Bắt đầu", dataIndex: "endAt", key: "endAt" },
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
        <Button type="primary" size="large" onClick={() => setIsVisible(true)}>
          Thêm
        </Button>
        <div style={{ display: "flex" }}>
          <Button type="primary" icon={<DownloadOutlined />} size="large">
            Xuất Excel
          </Button>
          <Input style={{ marginLeft: "4px" }} placeholder="Tìm kiếm" />
        </div>
      </div>
      <Modal
        style={{ top: "20px" }}
        title="C"
        visible={isVisible}
        footer={null}
        width="70%"
        onCancel={() => {
          setIsVisible(false);
          // resetState();
        }}
      >
        <form className="w-full m-auto" style={{ fontSize: "14px" }}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                htmlFor="price"
              >
                Tên mã giảm giá
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="price"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-1/3 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                htmlFor="price"
              >
                Hình thức khuyễn mãi
              </label>
              <Radio.Group
                onChange={(e) => setDiscountType(e.target.value)}
                value={discountType}
              >
                <Radio value="price">Giá (₫)</Radio>
                <Radio value="rate">Phần trăm (%)</Radio>
              </Radio.Group>
            </div>
            <div className="w-2/3 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                htmlFor="price"
              >
                Giá hay phần trăm giảm giá
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="price"
                type="number"
                min="1"
                value={discount}
                onChange={(e) => {
                  if (!e.target.value.includes("-"))
                    setDiscount(e.target.value);
                  else toastNotify("warn", "Bạn chỉ có thể nhập số dương");
                }}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                htmlFor="price"
              >
                Số lượng
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="price"
                type="number"
                min="1"
                value={count}
                onChange={(e) => {
                  if (!e.target.value.includes("-")) setCount(e.target.value);
                  else toastNotify("warn", "Bạn chỉ có thể nhập số dương");
                }}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                htmlFor="price"
              >
                Mô tả
              </label>
              <CKEditor
                editor={ClassicEditor}
                data={description}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDescription(data);
                  console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
              />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3">
              <button
                className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded"
                type="button"
                onClick={() => {
                  if (!isUpdate) handleAdd();
                  // else handleUpdate();
                }}
              >
                OK
              </button>
            </div>
            <div className="md:w-2/3" />
          </div>
        </form>
      </Modal>

      <Table
        columns={columns}
        dataSource={coupons}
        rowKey={(record) => record._id}
        pagination={pagination}
        onChange={(_pagination, filters, sorter) => setPagination(_pagination)}
        scroll={{ x: "100%" }}
      />
    </>
  );
}

export default Coupons;
