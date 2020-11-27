import React, { useState } from "react";
import axios from "axios";
import { Form, Input, InputNumber, Button, Modal, Table } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

import toastNotify from "../../utils/toastNotify";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not validate email!",
    number: "${label} is not a validate number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

function Users({ users, addUser, deleteUser }) {
  const [isVisible, setIsVisible] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("ROLE_USER");

  const [userId, setUserId] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const handleAdd = () => {
    if (!name) {
      return alert("Name field is required");
    }
    if (!email) {
      return alert("Email field is required");
    }
    if (!password) {
      return alert("password field is required");
    }
    if (!password2) {
      return alert("password confirm field is required");
    }
    // if (!address) {
    //   return alert("address field is required");
    // }
    if (password !== password2) {
      return alert("password confirm field is required");
    }

    axios
      .post("/api/users", {
        name,
        email,
        password,
        role,
        phone,
        address,
      })
      .then((res) => {
        toastNotify("success", "Create user success");
        setIsVisible(false);
        addUser(res.data);
        resetState();
      })
      .catch((err) => {
        const { errors } = err.response.data;
        if (typeof errors !== "undefined" && errors.length > 0) {
          return toastNotify("warn", errors[0].message);
        } else {
          return toastNotify("warn", "ERROR!");
        }
      });
  };

  const handleUpdate = () => {
    // if (!name) {
    //   return alert("Name field is required");
    // }
    // if (!description) {
    //   return alert("description field is required");
    // }
    // let formData = new FormData();
    // formData.append("name", name);
    // formData.append("description", description);
    // if (image) formData.append("image", image);
    // axios.put(`/api/brands/${brandId}`, formData).then((res) => {
    //   setIsVisible(false);
    //   dispatch(updateBrand(res.data));
    //   resetState();
    // });
  };

  const handleDelete = (id) => {
    axios
      .delete(`/api/users/${id}`)
      .then((res) => {
        deleteUser(id);
      })
      .catch((err) => {
        const { errors } = err.response.data;
        if (typeof errors !== "undefined" && errors.length > 0) {
          alert(errors[0].message);
        }
      });
  };

  const showDataUpdate = (u) => {
    setName(u.name);
    setEmail(u.email);
    setAddress(u.address);
    setRole(u.role);
    setUserId(u._id);
    setPhone(u.phone);
    setIsUpdate(true);
    setIsVisible(true);
  };

  const resetState = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPassword2("");
    setAddress("");
    setPhone("");
    setRole("user");
    setIsUpdate(false);
  };

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
      title: "Email",
      width: 150,
      dataIndex: "email",
      key: "email",
      fixed: "left",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    { title: "Ngày sinh", dataIndex: "birthday", key: "birthday" },
    { title: "Giới tính", dataIndex: "gender", key: "gender" },
    // {
    //   title: "Hành động",
    //   key: "actions",
    //   fixed: "right",
    //   width: 200,
    //   render: (text, record) => (
    //     <>
    //       {/* <Button onClick={() => showDataUpdate(record)} type="primary">
    //         Sửa
    //       </Button> */}
    //       <Button
    //         type="primary"
    //         danger
    //         onClick={() => handleDelete(record._id)}
    //       >
    //         Xóa
    //       </Button>
    //     </>
    //   ),
    // },
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
        title={!isUpdate ? "Thêm mới người dùng" : "Cập nhật người dùng"}
        visible={isVisible}
        maskClosable={false}
        footer={null}
        width="70%"
        onCancel={() => {
          setIsVisible(false);
          resetState();
        }}
      >
        <form className="w-full m-auto" style={{ fontSize: "14px" }}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          {!isUpdate ? (
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                  htmlFor="password1"
                >
                  Password
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="password1"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                  htmlFor="password2"
                >
                  Password Confirm
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="password2"
                  type="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </div>
            </div>
          ) : null}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                htmlFor="role"
              >
                Role
              </label>
              <div class="relative">
                <select
                  class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="role"
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                >
                  <option value="ROLE_USER">User</option>
                  <option value="ROLE_ADMIN">Admin</option>
                  {/* <option value="super-admin">Super Admin</option> */}
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

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="phone"
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
                  else handleUpdate();
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
        dataSource={users}
        rowKey={(record) => record._id}
        pagination={pagination}
        onChange={(_pagination, filters, sorter) => setPagination(_pagination)}
        scroll={{ x: "100%" }}
      />
    </>
  );
}

export default Users;
