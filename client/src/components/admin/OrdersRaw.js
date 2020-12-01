import { DownloadOutlined } from "@ant-design/icons";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Button, Input, Modal, Select, Table } from "antd";
import axios from "axios";
import parseHTML from "html-react-parser";
import React, { useEffect, useRef, useState } from "react";
import {
  addBrand,
  deleteBrand,
  updateBrand,
} from "../../redux/actions/products";
import formatPrice from "../../utils/formatPrice";
import toastNotify from "../../utils/toastNotify";

function OrdersRaw({ products, addOrder }) {
  const { Option } = Select;

  const [productsSelected, setProductsSelected] = useState([]);
  const [_productsSelected, _setProductsSelected] = useState([]);
  const [searchName, setSearchName] = useState("");

  const [shipType, setShipType] = useState("standard");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  function handleAddProductsSelected(value) {
    let product = products.find((product) => product._id === value);
    let _product = productsSelected.find((product) => product._id === value);
    if (product && !_product) {
      _setProductsSelected([
        { productId: product._id, amount: 1 },
        ..._productsSelected,
      ]);

      setProductsSelected([product, ...productsSelected]);

      setSearchName("");
    }
  }

  function handleDeleteProductSelected(id) {
    _setProductsSelected([
      ..._productsSelected.filter((e) => e.productId !== id),
    ]);

    setProductsSelected([...productsSelected.filter((e) => e._id !== id)]);
  }

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val) {
    setSearchName(val);
  }

  function getAmountOfProductSelected(id) {
    let product = _productsSelected.find((e) => e.productId === id);
    // alert(product.amount);
    return product ? product.amount : null;
  }

  function handleUpdateAmountOfProductSelected(id, amount) {
    let idx = _productsSelected.findIndex((e) => e.productId === id);
    // alert(product.amount);
    // console.log(idx);
    _setProductsSelected([
      ..._productsSelected.slice(0, idx),
      { productId: id, amount: +amount },
      ..._productsSelected.slice(idx + 1, _productsSelected.length),
    ]);
  }

  function getTotalPrice() {
    return productsSelected.reduce(
      (acc, product) =>
        acc + product.price * +getAmountOfProductSelected(product._id),
      0
    );
  }

  function addNewOrder() {
    if (!name) return toastNotify("warn", "Họ tên không được để trống");
    if (!phone) return toastNotify("warn", "Điện thoại không được để trống");
    if (!address) return toastNotify("warn", "Địa chỉ không được để trống");
    if (_productsSelected.length === 0) return;
    // if (shipType) return toastNotify("warn", "Hãy chọn hình thức vận chuyển");
    axios
      .post("/api/orders/admin/checkout", {
        products: _productsSelected,
        name,
        phone,
        address,
        note,
        shipType,
        total: getTotalPrice() + (shipType === "fast" ? 40000 : 0),
      })
      .then((res) => {
        toastNotify("success", "Thêm thành công");
        setTimeout(() => addOrder(res.data), 1000);
      });
  }

  return (
    <div className="text-3xl">
      {/* <div>Đơn hàng nháp</div> */}
      <div className="text-4xl font-semibold">Tạo đơn hàng</div>
      {/* <Button type="primary" onClick={() => setOrderSelected("")} size="large">
        Back
      </Button> */}
      <div className="flex">
        <div className="w-2/3 bg-white mr-8 px-10 py-6">
          <div>Chi tiết đơn hàng</div>
          {productsSelected.length > 0 &&
            productsSelected.map((product) => (
              <div className="my-4 flex justify-between">
                <div className="w-1/2 flex justify-between">
                  <img
                    className="h-24 m-0"
                    src={`/images/${product.images[0]}`}
                    alt=""
                  />
                  <div className="my-auto ml-4">{product.name}</div>
                </div>
                <div className="w-1/2 flex text-right my-auto pl-24">
                  <div className="flex-1">{formatPrice(product.price)}₫</div>
                  <div className="flex-1 mx-4"> x </div>
                  <input
                    className="flex-1 mx-4 pl-4 w-4 border border-gray-600"
                    type="number"
                    defaultValue={1}
                    min={1}
                    onChange={(e) => {
                      if (!e.target.value.includes("-"))
                        return toastNotify(
                          "warn",
                          "Bạn chỉ có thể nhập số dương"
                        );
                      handleUpdateAmountOfProductSelected(
                        product._id,
                        e.target.value
                      );
                    }}
                    value={getAmountOfProductSelected(product._id)}
                  />
                  <span className="flex-1">
                    {formatPrice(
                      product.price * getAmountOfProductSelected(product._id)
                    )}
                    ₫
                  </span>
                  <button
                    className="flex-1"
                    onClick={() => handleDeleteProductSelected(product._id)}
                  >
                    <i className="fa fa-trash-o" />
                  </button>
                </div>
              </div>
            ))}
          <Select
            showSearch
            placeholder="Tìm kiếm sản phẩm"
            className="my-4 w-full"
            value={null}
            onChange={(val) => handleAddProductsSelected(val)}
            onSearch={onSearch}
          >
            {products && products.length > 0 ? (
              products
                .filter((e) => !e.isDeleted)
                .filter((product) =>
                  new RegExp(searchName, "gi").test(product.name)
                )
                .map((product) => (
                  <Option value={product._id}>
                    <div>
                      <div className="flex justify-between">
                        <div className="w-1/2 flex justify-between">
                          <img
                            className="h-24 m-0"
                            src={`/images/${product.images[0]}`}
                            alt=""
                          />
                          <div className="my-auto ml-4">
                            {product.name.length > 50
                              ? `${product.name.slice(0, 50)}...`
                              : product.name}
                          </div>
                        </div>
                        <div className="w-1/2 flex justify-end text-right my-auto pl-24">
                          <span className="flex-1">
                            {product.amount} sản phẩm
                          </span>
                          <span className="flex-1">
                            {formatPrice(product.price)}₫
                          </span>
                        </div>
                      </div>
                    </div>
                  </Option>
                ))
            ) : (
              <Option value="">Chưa có sản phẩm nào</Option>
            )}
          </Select>
          <div className="my-4 text-right">
            <div className="flex w-full text-right">
              <div className="w-1/2">
                <div>Tạm tính</div>
                {/* <div>Khuyến mãi</div> */}
                <div>Phương thức vận chuyển</div>
                <div>Tổng cộng</div>
              </div>
              <div className="w-1/2">
                <div>{formatPrice(getTotalPrice())}₫</div>
                {/* <div>KM</div> */}
                <div className="flex ml-10">
                  <Select
                    value={shipType}
                    style={{ width: "60%" }}
                    onChange={(value) => setShipType(value)}
                  >
                    <Option value="standard">Giao hàng tiêu chuẩn</Option>
                    <Option value="fast">Giao hàng nhanh</Option>
                  </Select>
                  <div className="flex-1">
                    {shipType === "fast" ? formatPrice(40000) + "₫" : "0₫"}
                  </div>
                </div>
                <div>
                  {formatPrice(
                    getTotalPrice() + (shipType === "fast" ? 40000 : 0)
                  )}
                  ₫
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-white px-10 py-6">
          <div>Thông tin khách hàng</div>
          <input
            type="text"
            className="form-control my-4"
            id="name"
            placeholder="Họ tên"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="number"
            min="1"
            className="form-control my-4"
            id="phone"
            placeholder="Số điện thoại"
            onChange={(e) => {
              if (e.target.value.includes("-")) {
                setPhone("");
                return toastNotify("warn", "Bạn không thể nhập số âm");
              }

              setPhone(e.target.value);
            }}
            value={phone}
          />

          <input
            type="text"
            className="form-control my-4"
            id="address"
            placeholder="Địa chỉ"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
          <input
            type="text"
            className="form-control my-4"
            id="note"
            placeholder="Ghi chú"
            onChange={(e) => setNote(e.target.value)}
            value={note}
          />
        </div>
      </div>
      <div className="flex my-4">
        <Button
          className="ml-auto"
          type="primary"
          size="large"
          onClick={() => addNewOrder()}
        >
          Lưu
        </Button>
      </div>
    </div>
  );
}

export default OrdersRaw;
