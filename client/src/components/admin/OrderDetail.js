import { Button, Select, Radio, Steps } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { formatDate } from "../../utils/formatDate";
import formatPrice from "../../utils/formatPrice";
import toastNotify from "../../utils/toastNotify";

const { Step } = Steps;

function OrderDetail({
  products,
  addOrder,
  orderSelected,
  setOrderSelected,
  updateOrders,
}) {
  const { Option } = Select;

  const [currentOrder, setCurrentOrder] = useState({});

  const [productsSelected, setProductsSelected] = useState([]);
  const [_productsSelected, _setProductsSelected] = useState([]);
  const [searchName, setSearchName] = useState("");

  const [isPaid, setIsPaid] = React.useState(false);
  const [status, setStatus] = React.useState("pending");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const [histories, setHistories] = useState([]);

  function getProductById(id) {
    return products.find((e) => e._id === id);
  }

  useEffect(() => {
    if (orderSelected) {
      setCurrentOrder(orderSelected);
      _setProductsSelected([
        ...orderSelected.products.map((e) => ({
          productId: e.productId._id,
          amount: e.amount,
        })),
      ]);
      setProductsSelected([
        ...orderSelected.products.map((e) => getProductById(e.productId._id)),
      ]);

      setIsPaid(orderSelected.isPaid);
      setStatus(orderSelected.status);
      setName(orderSelected.name);
      setPhone(orderSelected.phone);
      setAddress(orderSelected.address);
      setNote(orderSelected.note);
    }
  }, [orderSelected]);

  useEffect(() => {
    if (orderSelected)
      axios
        .get(`/api/orders/${orderSelected._id}/histories`)
        .then((res) => setHistories(res.data))
        .catch((err) => console.log(err));
  }, [orderSelected]);

  async function handleAddProductsSelected(value) {
    let product = products.find((product) => product._id === value);
    let _product = productsSelected.find((product) => product._id === value);
    if (product && !_product) {
      await _setProductsSelected([
        { productId: product._id, amount: 1 },
        ..._productsSelected,
      ]);

      await setProductsSelected([product, ...productsSelected]);

      setSearchName("");
    }
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

  function updateOrderDetail(id) {
    if (!name) return toastNotify("warn", "Họ tên không được để trống");
    if (!phone) return toastNotify("warn", "Điện thoại không được để trống");
    if (!address) return toastNotify("warn", "Địa chỉ không được để trống");
    if (_productsSelected.length === 0) return;
    // if (shipType) return toastNotify("warn", "Hãy chọn hình thức vận chuyển");
    axios
      .put(`/api/orders/${orderSelected._id}`, {
        products: _productsSelected,
        name,
        phone,
        address,
        note,
        isPaid,
        status,
        total: getTotalPrice(),
      })
      .then((res) => {
        setHistories([res.data.history, ...histories]);
        updateOrders(res.data.order);
        toastNotify("success", "Cập nhật thành công");
      });
  }

  return (
    <div className="text-3xl">
      <Button type="primary" onClick={() => setOrderSelected("")} size="large">
        Back
      </Button>
      <div className="flex mt-4">
        <div className="w-2/3 bg-white mr-8 px-10 py-6">
          <div>Chi tiết đơn hàng</div>
          {productsSelected.length > 0 &&
            productsSelected.map((product) => (
              <div className="my-4 flex justify-between">
                <div className="w-1/2 flex justify-start">
                  <img
                    className="h-24"
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
                    disabled={!Boolean(currentOrder.isCreatedByAdmin)}
                  />
                  <span className="flex-1">
                    {formatPrice(
                      product.price * getAmountOfProductSelected(product._id)
                    )}
                    ₫
                  </span>
                </div>
              </div>
            ))}

          {currentOrder.isCreatedByAdmin && (
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
                  // .filter((product) =>
                  //   new RegExp(searchName, "gi").test(product.name)
                  // )
                  .map((product) => (
                    <div value={product._id}>
                      <div className="flex justify-between">
                        <div className="w-1/2 flex justify-start">
                          <img
                            className="h-24"
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
                  ))
              ) : (
                <Option value="">Chưa có sản phẩm nào</Option>
              )}
            </Select>
          )}
          <div className="mt-6 mb-4">Tình trạng thanh toán</div>
          <Radio.Group onChange={() => setIsPaid(!isPaid)} value={isPaid}>
            <Radio value={true}>Đã thanh toán</Radio>
            <Radio value={false}>Chưa thanh toán</Radio>
          </Radio.Group>
          <div className="mt-6 mb-4">Tình trạng đơn hàng</div>
          <Radio.Group
            onChange={(e) => setStatus(e.target.value)}
            value={status}
          >
            <Radio value="pending">Đang xử lý</Radio>
            <Radio value="packed">Đã đóng gói</Radio>
            <Radio value="delivered">Đã chuyển hàng</Radio>
            <Radio value="success">Đã hoàn thành</Radio>
            <Radio value="cancel">Đã hủy</Radio>
          </Radio.Group>
          <div className="my-4 text-right">
            <div className="flex w-full text-right">
              <div className="w-1/2">
                <div>Tạm tính</div>
                {/* <div>Khuyến mãi</div> */}
                <div className="my-2">Phương thức vận chuyển</div>
                <div>Tổng cộng</div>
              </div>
              <div className="w-1/2">
                <div>{formatPrice(getTotalPrice())}₫</div>
                {/* <div>KM</div> */}
                <div>Ship</div>
                <div>{formatPrice(getTotalPrice())}₫</div>
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
          onClick={() => updateOrderDetail()}
        >
          Lưu
        </Button>
      </div>
      <div className="bg-white px-10 py-6 mb-8">
        {histories && (
          <Steps progressDot current={histories.length} direction="vertical">
            {histories.map((e) => (
              <Step
                title={e.name}
                subTitle={formatDate(e.createdAt)}
                description={e.description}
              />
            ))}
          </Steps>
        )}
      </div>
    </div>
  );
}

export default OrderDetail;
