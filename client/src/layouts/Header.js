import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { login, logout, setCurrentUser } from "../redux/actions/auth";
import {
  getBrands,
  getCart,
  getCategories,
  getProducts,
  getSubcategories,
} from "../redux/actions/products";
import setAuthToken from "../utils/setAuthToken";
import toastNotify from "../utils/toastNotify";

function Header({ props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [email1, setEmail1] = useState("");
  const [password1, setPassword1] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const [user, isAuthenticated, cart] = useSelector(({ auth, products }) => [
    auth.user,
    auth.isAuthenticated,
    products.cart,
  ]);
  const dispatch = useDispatch();
  const location = useLocation();

  const isAdminRoute = location.pathname.includes("/admin");

  function resetState() {
    setEmail("");
    setPassword("");
    setEmail1("");
    setPassword1("");
    setName("");
    setPhone("");
  }

  const getToken = () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decoded = jwt_decode(token.split(" ")[1]);
      if (decoded.exp < new Date().getTime() / 1000) {
        localStorage.removeItem("jwtToken");
      } else {
        setAuthToken(token);
        dispatch(setCurrentUser(decoded));
      }
    }
  };

  useEffect(() => {
    getToken();
    dispatch(getCategories());
    dispatch(getSubcategories());
    dispatch(getProducts());
    dispatch(getBrands());
    dispatch(getCart());
  }, []);

  function hideModal() {
    let modal = window.document.getElementById("auth-modal");
    let fade = window.document.getElementsByClassName("modal-backdrop");
    if (modal && fade && fade.length > 0) {
      modal.style.display = "none";
      fade[0].style.display = "none";
    }
    resetState();
  }

  function register(data) {
    axios
      .post("/api/auth/register", data)
      .then((res) => {
        hideModal();
        toastNotify("success", "Đăng ký thành công");
        window.location.href = location.pathname;
      })
      .catch((err) => {
        const { errors } = err.response.data;
        if (typeof errors !== "undefined" && errors.length > 0) {
          return toastNotify("warn", errors[0].message);
        } else {
          return toastNotify("warn", "Đã có lỗi xảy ra. Hãy thử lại");
        }
      });
  }

  useEffect(() => {
    if (isAuthenticated) {
      hideModal();
      // window.location.href = location.pathname;
    }
  }, [isAuthenticated, user]);

  const googleLoginSuccess = (res) => {
    const { email, name } = res.profileObj;

    googleLogin({ email, name });
  };

  const googleLoginFailure = (res) => {
    toastNotify("warn", "Đăng nhập thất bại");
  };

  const googleLogin = (data) => {
    axios
      .post("/api/auth/google", data)
      .then((res) => {
        hideModal();
        const { token } = res.data;
        // Set token to localStorage
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user infor
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));
        toastNotify("success", "Đăng nhập thành công");
        window.location.href = location.pathname;
      })
      .catch((err) => {
        return toastNotify("warn", "Đã có lỗi xảy ra. Hãy thử lại");
      });
  };

  function forgotPassword(data) {
    axios
      .post("/api/auth/forgot-password", data)
      .then((res) => {
        hideModal();
        toastNotify("success", "Hãy kiểm tra email của bạn");
      })
      .catch((err) => toastNotify("warn", "Đã có lỗi xảy ra. Hãy thử lại"));
  }

  return (
    <>
      {!isAdminRoute ? (
        <header>
          <nav className="header-top">
            <span className="quick-mobile">
              <i className="fa fa-phone" /> 0986090925
            </span>
            <span className="quick-mail hidden-xs">
              <i className="fa fa-envelope-o" /> hieu.do212@gmail.com
            </span>

            <span className="pull-right">
              {isAuthenticated && user ? (
                <div className="logged" style={{ display: "flex" }}>
                  {/* <i class="fa fa-user-o"></i> */}
                  <img src="/img/feedback_1.jpg" />
                  <div className="dropdown">
                    <button
                      className="btn btn-default dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                    >
                      {user.name}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-right">
                      <li>
                        <Link to="/profile">Quản lý tài khoản</Link>
                      </li>
                      <li>
                        <a
                          id="logout-btn"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(logout());
                          }}
                        >
                          Đăng xuất
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="before-log">
                  <button
                    data-toggle="modal"
                    data-tabs="login"
                    data-target=".user-modal"
                  >
                    Đăng nhập
                  </button>
                  <button
                    data-toggle="modal"
                    data-tabs="signup"
                    data-target=".user-modal"
                  >
                    Đăng ký
                  </button>
                </div>
              )}
            </span>
          </nav>
          <nav className="navbar navbar-default">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#menu-collapse"
            >
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a
              href="#"
              className="search"
              data-toggle="slide-collapse"
              data-target="#search-form"
              style={{
                visibility: "hidden",
              }}
            >
              <i className="fa fa-search" />
              <span className="hidden-xs"> Tìm kiếm</span>
            </a>
            <div className="container">
              <div className="menu row">
                <div className="collapse navbar-collapse" id="menu-collapse">
                  <ul className="nav navbar-nav navbar-left">
                    <li>
                      <Link to="/">Trang chủ</Link>
                    </li>
                    <li>
                      <Link to="/products">Sản phẩm</Link>
                    </li>
                    {/* <li>
                      <Link to="/blog">Dự án</Link>
                    </li> */}
                  </ul>
                  <ul className="nav navbar-nav navbar-right">
                    <li>
                      <Link to="/about">Về Min</Link>
                    </li>
                    <li>
                      <Link to="/blog">Blog</Link>
                    </li>
                    <li>
                      <Link to="/contact">Liên hệ</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="cart-box">
              <Link to="/wishlist">
                <i className="fa fa-heart-o" />
              </Link>
              <Link to="/cart">
                <i className="fa fa-shopping-cart" />
                <small>{cart && cart.length}</small>
              </Link>
            </div>
            <Link className="logo" to="/">
              <img src="/img/logo-min.png" />
            </Link>
            <div id="search-form">
              <form>
                <input type="text" placeholder="Nhập từ khóa cần tìm" />
                <button type="submit">
                  <i className="fa fa-search" />
                </button>
              </form>
            </div>
          </nav>
          <div id="auth-modal" className="modal fade user-modal" tabIndex={1}>
            <div className="modal-dialog modal-sm">
              <div className="modal-content">
                <ul className="nav nav-tabs" role="tablist">
                  <li id="login-indicator" className="active">
                    <a href="#login" role="tab" data-toggle="tab">
                      Đăng nhập
                    </a>
                  </li>
                  <li id="signup-indicator">
                    <a href="#signup" role="tab" data-toggle="tab">
                      Đăng ký
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div
                    role="tabpanel"
                    className="tab-pane active fade in"
                    id="login"
                  >
                    <form>
                      <div className="input-field">
                        <input
                          type="email"
                          name="Email"
                          id="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      {!isForgotPassword ? (
                        <>
                          <div className="input-field">
                            <input
                              type="password"
                              name="Password"
                              id="password"
                              placeholder="Mật khẩu"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                        </>
                      ) : null}
                      {/* <div className="input-field check-field">
                        <input type="checkbox" id="remember" name="remember" />
                        <label htmlFor="remember">Ghi nhớ tài khoản</label>
                        <br />
                      </div> */}
                      <div className="input-field">
                        <button
                          id="login-btn"
                          // data-dismiss="modal"
                          // defaultValue=""
                          onClick={(e) => {
                            e.preventDefault();
                            if (!isForgotPassword)
                              dispatch(login({ email, password }));
                            else forgotPassword({ email });
                          }}
                        >
                          {!isForgotPassword ? "Đăng nhập" : "Xác nhận email"}
                        </button>
                      </div>
                      {!isForgotPassword ? (
                        <>
                          <button
                            data-toggle="modal"
                            // data-target="#reset-password"
                            // data-dismiss="modal"
                            className="btn btn-default"
                            onClick={() => setIsForgotPassword(true)}
                          >
                            <i className="fa fa-question-circle-o" /> Quên mật
                            khẩu?
                          </button>
                          <GoogleLogin
                            clientId="529100369455-hdndf0tm9jdjmso9q4ntt4g9d04pbsl6.apps.googleusercontent.com"
                            buttonText="Đăng nhập bằng Google"
                            onSuccess={googleLoginSuccess}
                            onFailure={googleLoginFailure}
                            cookiePolicy={"single_host_origin"}
                          />
                        </>
                      ) : (
                        <button
                          data-toggle="modal"
                          // data-target="#reset-password"
                          // data-dismiss="modal"
                          className="btn btn-default"
                          onClick={() => setIsForgotPassword(false)}
                        >
                          <i className="fa fa-question-circle-o" /> Bạn đã có
                          mật khẩu? <u>Đăng nhập</u>
                        </button>
                      )}
                    </form>
                  </div>
                  <div role="tabpanel" className="tab-pane fade" id="signup">
                    <form>
                      <div className="input-field">
                        <input
                          type="email"
                          name="Email"
                          id="email"
                          placeholder="Email"
                          value={email1}
                          onChange={(e) => setEmail1(e.target.value)}
                        />
                      </div>
                      <div className="input-field">
                        <input
                          type="password"
                          name="Password"
                          id="password"
                          placeholder="Mật khẩu"
                          value={password1}
                          onChange={(e) => setPassword1(e.target.value)}
                        />
                      </div>
                      <div className="input-field check-field">
                        <input type="checkbox" id="remember" name="remember" />
                        <label htmlFor="remember">Hiển thị mật khẩu</label>
                        <br />
                      </div>
                      <div className="input-field">
                        <input
                          type="text"
                          name="Name"
                          id="name"
                          placeholder="Họ tên"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="input-field">
                        <input
                          type="text"
                          name="Phone"
                          id="phone"
                          placeholder="Số điện thoại"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div className="input-field">
                        <input
                          id="signup-btn"
                          type="submit"
                          defaultValue="Đăng ký"
                          onClick={(e) => {
                            e.preventDefault();
                            register({
                              email: email1,
                              password: password1,
                              name,
                              phone,
                            });
                          }}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a href="#">
            <i className="fa fa-angle-up back-top" />
          </a>
        </header>
      ) : null}
    </>
  );
}

export default Header;
