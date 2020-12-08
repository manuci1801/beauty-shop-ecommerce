import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Modal } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";

import { loginAdmin } from "../../redux/actions/auth";
import toastNotify from "../../utils/toastNotify";

function AdminAuth() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // change forgot-password state
  const [isVisible, setIsVisible] = useState(false);
  const [emailForgot, setEmailForgot] = useState("");

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const onFinish = (values) => {
    dispatch(loginAdmin(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleForgotPassword = () => {
    if (emailForgot) {
      axios
        .post("/api/users/forgot-password", { email: emailForgot })
        .then((res) => {
          toastNotify(
            "success",
            "Mật khẩu mới đã được gửi tới email của bạn. Vui lòng kiểm tra email."
          );
          setIsVisible(false);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <Modal
        style={{ top: "20px" }}
        title={"Quên mật khẩu"}
        visible={isVisible}
        maskClosable={false}
        footer={null}
        width="25%"
        onCancel={() => {
          setIsVisible(false);
        }}
      >
        <div className="w-full m-auto" style={{ fontSize: "14px" }}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                htmlFor="name"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="name"
                type="text"
                value={emailForgot}
                onChange={(e) => setEmailForgot(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3">
              <button
                className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded"
                type="button"
                onClick={() => handleForgotPassword()}
              >
                OK
              </button>
            </div>
            <div className="md:w-2/3" />
          </div>
        </div>
      </Modal>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "10%",
        }}
      >
        <Form
          style={{ width: "30%" }}
          {...layout}
          name="form-admin-login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Tên đăng nhập"
            name="email"
            rules={[
              {
                required: true,
                message: "Tên đăng nhập là bắt buộc!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Mật khẩu là bắt buộc!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
            <Button
              type="ghost"
              className="ml-8"
              onClick={() => setIsVisible(true)}
            >
              Quên mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default AdminAuth;
