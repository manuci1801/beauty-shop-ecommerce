import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Button } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import AdminAuth from "../components/admin/AdminAuth";
import Brands from "../components/admin/Brands";
import Categories from "../components/admin/Categories";
import Contacts from "../components/admin/Contacts";
import Dashboard from "../components/admin/Dashboard";
import Products from "../components/admin/Products";
import Users from "../components/admin/Users";
import { logout } from "../redux/actions/auth";
import Orders from "../components/admin/Orders";
import Discounts from "../components/admin/Discounts";
import Coupons from "../components/admin/Coupons";
import Blogs from "../components/admin/Blogs";

function Admin() {
  const { SubMenu } = Menu;
  const [currentTab, setCurrentTab] = useState("statistical");

  const handleClick = (e) => {
    console.log("click ", e);
    setCurrentTab(e.key);
  };

  const dispatch = useDispatch();
  const [route, setRoute] = useState("users");
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [contacts, setContacts] = useState([]);

  const [
    isAuthenticated,
    user,
    products,
    brands,
    categories,
    subcategories,
  ] = useSelector(({ auth, products }) => [
    auth.isAuthenticated,
    auth.user,
    products.products,
    products.brands,
    products.categories,
    products.subcategories,
  ]);

  const getData = () => {
    axios
      .get("/api/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("/api/orders/all")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("/api/contacts")
      .then((res) => {
        setContacts(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    document.title = "Admin";
  }, []);

  useEffect(() => {
    if (isAuthenticated && user.role === "ROLE_ADMIN") {
      getData();
    }
  }, [isAuthenticated]);

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact._id != id));
  };

  const addUser = (user) => {
    setUsers([user, ...users]);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u._id != id));
  };

  const bodyContainer =
    currentTab === "statistical" ? (
      <Dashboard
        products={products}
        brands={brands}
        users={users}
        contacts={contacts}
      />
    ) : currentTab === "users" ? (
      <Users
        users={users.filter((u) => u._id != user.id)}
        addUser={addUser}
        deleteUser={deleteUser}
      />
    ) : currentTab === "products" ? (
      <Products
        products={products}
        brands={brands}
        categories={categories}
        subcategories={subcategories}
        dispatch={dispatch}
      />
    ) : currentTab === "brands" ? (
      <Brands brands={brands} dispatch={dispatch} />
    ) : currentTab === "categories" ? (
      <Categories
        categories={categories}
        subcategories={subcategories}
        dispatch={dispatch}
      />
    ) : currentTab === "contacts" ? (
      <Contacts contacts={contacts} deleteContact={deleteContact} />
    ) : currentTab === "orders" ? (
      <Orders orders={orders} />
    ) : currentTab === "discounts" ? (
      <Discounts
        brands={brands}
        categories={categories}
        subcategories={subcategories}
      />
    ) : currentTab === "coupons" ? (
      <Coupons />
    ) : currentTab === "blogs" ? (
      <Blogs />
    ) : null;

  return (
    <>
      {isAuthenticated && user.role === "ROLE_ADMIN" ? (
        <div style={{ display: "flex" }}>
          <Menu
            theme="dark"
            onClick={handleClick}
            style={{ width: 256 }}
            defaultOpenKeys={["dashboard"]}
            selectedKeys={[currentTab]}
            mode="inline"
            style={{ minHeight: "100vh", width: "250px", position: "relative" }}
          >
            <h2
              style={{
                textAlign: "center",
                borderBottom: "1px solid #fff",
                color: "#fff",
                padding: "12px 0",
                fontSize: "20px",
              }}
            >
              Hi, ADMIN!
            </h2>
            <SubMenu key="dashboard" icon={<MailOutlined />} title="Dashboard">
              <Menu.Item key="statistical">Thống kê</Menu.Item>
            </SubMenu>
            <SubMenu
              key="users-management"
              icon={<AppstoreOutlined />}
              title="Quản lý người dùng"
            >
              <Menu.Item key="users">Người dùng</Menu.Item>
              <Menu.Item key="contacts">Liên hệ</Menu.Item>
            </SubMenu>
            <SubMenu
              key="products-management"
              icon={<SettingOutlined />}
              title="Quản lý sản phẩm"
            >
              <Menu.Item key="products">Sản phẩm</Menu.Item>
              <Menu.Item key="brands">Thương hiệu</Menu.Item>
              <Menu.Item key="categories">Danh mục</Menu.Item>
            </SubMenu>
            <SubMenu
              key="orders-management"
              icon={<SettingOutlined />}
              title="Quản lý đơn hàng"
            >
              <Menu.Item key="orders">Đơn hàng</Menu.Item>
            </SubMenu>
            <SubMenu
              key="promotion-management"
              icon={<SettingOutlined />}
              title="Quản lý khuyến mãi"
            >
              <Menu.Item key="discounts">Khuyến mãi</Menu.Item>
              <Menu.Item key="coupons">Mã giảm giá</Menu.Item>
            </SubMenu>
            <SubMenu
              key="blogs-management"
              icon={<SettingOutlined />}
              title="Quản lý blog"
            >
              <Menu.Item key="blogs">Blog</Menu.Item>
            </SubMenu>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "12px 0",
              }}
            >
              <Button type="primary" danger onClick={() => dispatch(logout())}>
                Đăng xuất
              </Button>
            </div>
          </Menu>
          <div className="admin-tab" style={{ flex: 1 }}>
            {bodyContainer}
          </div>
        </div>
      ) : (
        <AdminAuth />
      )}
    </>
  );
}

export default Admin;
