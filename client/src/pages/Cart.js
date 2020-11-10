import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import formatPrice from "../utils/formatPrice";

import { clearCart } from "../redux/actions/products";
import toastNotify from "../utils/toastNotify";

function Cart() {
  const dispatch = useDispatch();

  const [totalPrice, setTotalPrice] = useState(0);

  const [
    isAuthenticated,
    products,
    cart,
  ] = useSelector(({ auth, products }) => [
    auth.isAuthenticated,
    products.products,
    products.cart,
  ]);

  function getProductById(id) {
    return products.find((product) => product._id == id);
  }

  useEffect(() => {
    if (
      typeof cart !== "undefined" &&
      cart.length > 0 &&
      typeof products !== "undefined" &&
      products.length > 0
    ) {
      let total = 0;
      for (let i = 0; i < cart.length; i++) {
        let p = getProductById(cart[i].productId);
        if (typeof p !== "undefined") {
          total +=
            (p.priceDiscount ? p.priceDiscount : p.price) * cart[i].amount;
        }
      }
      setTotalPrice(total);
    }
  }, [cart, products]);

  return (
    <>
      <div className="container-fluid page-heading cart-heading">
        <div className="heading-content">
          <h1>Giỏ hàng</h1>
          <p />
          <ol className="breadcrumb">
            <li>
              <a href="home.html">Trang chủ</a>
            </li>
            <li className="active">Giỏ hàng</li>
          </ol>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="cart-container">
              <table className="cart">
                <thead>
                  <tr>
                    <th className="product-thumbnail">Sản phẩm</th>
                    <th className="product-name">
                      <span className="hidden-mobile">Tên sản phẩm</span>
                    </th>
                    <th className="product-price">
                      <span className="hidden-mobile">Đơn giá</span>
                    </th>
                    <th className="product-quantity">
                      <span className="hidden-mobile">Số lượng</span>
                    </th>
                    <th className="product-subtotal">Thành tiền</th>
                    <th className="product-remove">&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {cart &&
                    products &&
                    cart.map((e) => (
                      <tr key={e._id} className="cart-item">
                        <td className="product-thumbnail">
                          {getProductById(e.productId) ? (
                            <Link
                              to={`/products/${
                                getProductById(e.productId)._id
                              }`}
                            >
                              <img
                                src={`/images/${
                                  getProductById(e.productId).images[0]
                                }`}
                              />
                            </Link>
                          ) : null}
                        </td>
                        <td className="product-name">
                          <Link to={`/products/${e.productId}`}>
                            {getProductById(e.productId)
                              ? getProductById(e.productId).name
                              : null}
                          </Link>
                        </td>
                        <td className="product-price">
                          {getProductById(e.productId)
                            ? getProductById(e.productId).priceDiscount
                              ? formatPrice(
                                  getProductById(e.productId).priceDiscount
                                )
                              : formatPrice(getProductById(e.productId).price)
                            : null}
                        </td>
                        <td className="product-quantity">
                          <div className="quantity">
                            <button
                              className="qty-decrease"
                              onClick={(e) => console.log("1")}
                              type="button"
                            >
                              -
                            </button>
                            <input
                              type="text"
                              defaultValue={e.amount}
                              onChange={(e) => console.log(e.target.value)}
                            />
                            <button
                              className="qty-increase"
                              onclick
                              type="button"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="product-subtotal">
                          {getProductById(e.productId)
                            ? formatPrice(
                                (getProductById(e.productId).priceDiscount
                                  ? getProductById(e.productId).priceDiscount
                                  : getProductById(e.productId).price) *
                                  e.amount
                              )
                            : null}
                        </td>
                        <td className="product-remove">
                          <button>
                            <i className="fa fa-trash-o" />
                          </button>
                        </td>
                      </tr>
                    ))}

                  <>
                    <td colSpan={6} className="actions">
                      <button
                        className="empty-cart link-to hidden-mobile"
                        onClick={() =>
                          dispatch(clearCart("Đã xóa toàn bộ giỏ hàng"))
                        }
                      >
                        Xóa toàn bộ
                      </button>
                      <Link to="/products" className="link-to continue">
                        Tiếp tục mua hàng <i className="fa fa-angle-right" />
                      </Link>
                    </td>
                  </>
                </tbody>
              </table>
            </div>
            <div className="cart-checkout container">
              <div className="col-xs-12 col-sm-6">
                <div className="cart-coupon">
                  <h3>Mã giảm giá</h3>
                  <input
                    type="text"
                    defaultValue
                    placeholder="Nhập mã giảm giá"
                  />
                  <button className="apply-coupon link-to">
                    Áp dụng mã giảm giá
                  </button>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6">
                <div className="cart-total">
                  <h3>Tổng tiền</h3>
                  <table>
                    <tbody>
                      <tr className="cart-subtotal">
                        <th>Tạm tính</th>
                        <td>{formatPrice(totalPrice)}</td>
                      </tr>
                      <tr className="cart-discount">
                        <th>
                          Giảm giá
                          <span className="discount-rate" />
                        </th>
                        <td>0</td>
                      </tr>
                      <tr className="order-total">
                        <th>Tổng tiền</th>
                        <td className="amount">
                          <strong>{formatPrice(totalPrice)}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="checkout-proceed">
                    <div
                      style={{
                        margin: "50px auto",
                        padding: "10px 20px",
                        textAlign: "center",
                        textTransform: "uppercase",
                        fontWeight: 500,
                        textDecoration: "none",
                        display: "inline-block",
                        background: "#336699",
                        color: "#fff",
                        position: "relative",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        console.log(cart);
                        if (typeof cart !== "undefined" && cart.length === 0) {
                          return toastNotify(
                            "warn",
                            "Giỏ hàng của bạn đang trống"
                          );
                        }
                        // if (!isAuthenticated) {
                        //   return toastNotify(
                        //     "warn",
                        //     "Bạn cần đăng nhập để thanh toán"
                        //   );
                        // }

                        window.location.href = "/payment";
                      }}
                      className="link-to checkout-button"
                    >
                      Tiến hành đặt hàng <i className="fa fa-angle-right" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;