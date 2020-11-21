import React, { useState, useEffect } from "react";
import axios from "axios";
import formatPrice from "../../utils/formatPrice";
import { Button, Input, Table, Modal, Radio } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import toastNotify from "../../utils/toastNotify";

function Discounts({ brands, categories, subcategories }) {
  const [discounts, setDiscounts] = useState([]);

  const [isVisible, setIsVisible] = useState(false);

  const [applyFor, setApplyFor] = useState("");
  const [applyId, setApplyId] = useState("");
  const [discount, setDiscount] = useState("");
  const [discountType, setDiscountType] = useState("price");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");

  const [isUpdate, setIsUpdate] = useState(false);

  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  useEffect(() => {
    axios
      .get("/api/discounts")
      .then((res) => {
        setDiscounts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/discounts/${id}`).then((res) => {
      setDiscounts(discounts.filter((e) => e._id != id));
    });
  };

  function resetState() {
    setApplyFor("");
    setApplyId("");
    setDiscount("");
    setDiscountType("price");
    setStartAt("");
    setEndAt("");
  }

  const handleAdd = () => {
    if (!applyFor) return toastNotify("warn", "Chọn loại áp dụng");
    else {
      if (applyFor === "all") {
        if (!discount)
          return toastNotify("warn", "Chi tiết khuyến mãi không được để trống");
        else {
          let data = { applyFor };
          if (discountType === "rate") data.discountRate = discount;
          else if (discountType === "price") data.discountPrice = discount;
          axios.post("/api/discounts", data).then((res) => {
            resetState();
            setIsVisible(false);
            setDiscounts([...discounts, res.data]);
          });
        }
      } else {
        if (!discount)
          return toastNotify("warn", "Chi tiết khuyến mãi không được để trống");
        else {
          if (!applyId)
            return toastNotify("warn", "Chọn loại áp dụng chi tiết");
          else {
            let data = { applyFor, id: applyId };
            if (discountType === "rate") data.discountRate = discount;
            else if (discountType === "price") data.discountPrice = discount;
            axios.post("/api/discounts", data).then((res) => {
              resetState();
              setIsVisible(false);
              setDiscounts([...discounts, res.data]);
            });
          }
        }
      }
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
      title: "Áp dụng",
      dataIndex: "applyFor",
      key: "applyFor",
      render: (_, record) => {
        if (record.applyFor === "all") {
          return <div>Tất cả các mặt hàng</div>;
        }
        if (record.applyFor === "brand" && record.brand) {
          return <div>Thương hiệu</div>;
        }
        if (record.applyFor === "category" && record.category) {
          return <div>Danh mục</div>;
        }
        if (record.applyFor === "subcategory" && record.subcategory) {
          return <div>Danh mục phụ</div>;
        }
      },
    },
    {
      title: "Chi tiết áp dụng",
      dataIndex: "apply",
      key: "apply",
      render: (_, record) => {
        if (record.applyFor === "all") {
          return;
        }
        if (record.applyFor === "brand" && record.brand) {
          return <div>{record.brand.name}</div>;
        }
        if (record.applyFor === "category" && record.category) {
          return <div>{record.category.name}</div>;
        }
        if (record.applyFor === "subcategory" && record.subcategory) {
          return <div>{record.subcategory.name}</div>;
        }
      },
    },
    {
      title: "Chi tiết khuyến mãi",
      dataIndex: "discount",
      key: "discount",
      render: (_, record) =>
        record.discountRate ? (
          <div>-{record.discountRate}%</div>
        ) : record.discountPrice ? (
          <div>-{formatPrice(record.discountPrice)}₫</div>
        ) : null,
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
          <Input style={{ marginLeft: "4px" }} placeholder="Tìm kiếm" />
        </div>
      </div>
      <Modal
        style={{ top: "20px" }}
        title={!isUpdate ? "Thêm khuyến mãi" : "Cập nhật khuyến mãi"}
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
                htmlFor="brand"
              >
                Áp dụng
              </label>
              <div class="relative">
                <select
                  class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  onChange={(e) => {
                    setApplyFor(e.target.value);
                    setApplyId("");
                  }}
                  value={applyFor}
                >
                  <option value="" hidden>
                    Chọn loại áp dụng
                  </option>
                  <option value="all">Áp dụng cho tất cả sản phẩm</option>
                  <option value="brand">Áp dụng cho thương hiệu</option>
                  <option value="category">Áp dụng cho danh mục</option>
                  <option value="subcategory">Áp dụng cho danh mục phụ</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {applyFor === "brand" && brands && brands.length > 0 ? (
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                  htmlFor="brand"
                >
                  Thương hiệu
                </label>
                <div class="relative">
                  <select
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    onChange={(e) => setApplyId(e.target.value)}
                    // value={brandId}
                  >
                    <option value="">Chọn thương hiệu</option>
                    {brands && brands.length > 0
                      ? brands.map((brand) => (
                          <option value={brand._id}>{brand.name}</option>
                        ))
                      : null}
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {applyFor === "category" && categories && categories.length > 0 ? (
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                  htmlFor="brand"
                >
                  Danh mục
                </label>
                <div class="relative">
                  <select
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    onChange={(e) => setApplyId(e.target.value)}
                    // value={categoryId}
                  >
                    <option value="">Chọn danh mục</option>
                    {categories && categories.length > 0
                      ? categories.map((category) => (
                          <option value={category._id}>{category.name}</option>
                        ))
                      : null}
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {applyFor === "subcategory" &&
          subcategories &&
          subcategories.length > 0 ? (
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                htmlFor="brand"
              >
                Danh mục phụ
              </label>
              <div class="relative">
                <select
                  class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  onChange={(e) => setApplyId(e.target.value)}
                  // value={subcategoryId}
                >
                  <option value="">Chọn danh mục phụ</option>
                  {subcategories && subcategories.length > 0
                    ? subcategories.map((sub) => (
                        <option value={sub._id}>{sub.name}</option>
                      ))
                    : null}
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          ) : null}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
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
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                htmlFor="price"
              >
                Khuyến mãi
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
        dataSource={discounts}
        rowKey={(record) => record._id}
        pagination={pagination}
        onChange={(_pagination, filters, sorter) => setPagination(_pagination)}
        scroll={{ x: "100%" }}
      />
    </>
  );
}

export default Discounts;
