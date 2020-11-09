import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useDispatch } from "react-redux";

import { loginAdmin } from "../../redux/actions/auth";

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

        {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AdminAuth;
