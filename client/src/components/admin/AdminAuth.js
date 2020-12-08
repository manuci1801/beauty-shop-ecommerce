import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";

import { loginAdmin } from "../../redux/actions/auth";
import toastNotify from "../../utils/toastNotify";

function AdminAuth() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    const email = window.prompt("Email tài khoản admin của bạn là:");
    if (email) {
      axios
        .post("/api/users/forgot-password", { email })
        .then((res) => {
          toastNotify(
            "success",
            "Mật khẩu mới đã được gửi tới email của bạn. Vui lòng kiểm tra email."
          );
        })
        .catch((err) => console.log(err));
    }
  };

  return (
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
            Submit
          </Button>
          <Button
            type="ghost"
            className="ml-8"
            onClick={() => handleForgotPassword()}
          >
            Quên mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AdminAuth;
