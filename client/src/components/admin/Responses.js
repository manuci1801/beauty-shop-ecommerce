import React, { useState, useEffect } from "react";
import axios from "axios";
import formatPrice from "../../utils/formatPrice";
import { Button, Input, Table, Modal, Radio, DatePicker } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parseHTML from "html-react-parser";
import toastNotify from "../../utils/toastNotify";
import moment from "moment";
import { formatDate } from "../../utils/formatDate";

function Responses() {
  const [comments, setComments] = useState([]);

  const [isVisible, setIsVisible] = useState(false);

  const [isAutoGenerate, setIsAutoGenerate] = useState(true);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [discountType, setDiscountType] = useState("price");
  const [count, setCount] = useState("");
  const [content, setContent] = useState("");
  const [startAt, setStartAt] = useState(moment().format("DD/MM/YYYY"));
  const [endAt, setEndAt] = useState(moment().format("DD/MM/YYYY"));

  // for update
  const [commentId, setCommentId] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  useEffect(() => {
    axios
      .get("/api/comments")
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/comments/${id}`).then((res) => {
      setComments(comments.filter((e) => e._id != id));
    });
  };

  function resetState() {
    setCommentId("");

    setIsUpdate(false);
  }

  const handleAdd = () => {
    if (!isAutoGenerate && !code)
      return toastNotify("warn", "Tên mã giảm giá không được để trống");
    else if (!discount)
      return toastNotify(
        "warn",
        "Giá hay phần trăm giảm giá không được để trống"
      );
    else if (!count) return toastNotify("warn", "Số lượng không được để trống");
    else if (!content) return toastNotify("warn", "Mô tả không được để trống");
    else {
      let data = {
        code,
        discount,
        usableCount: count,
        content,
        isAutoGenerate,
      };
      if (startAt) data.startAt = startAt;
      if (endAt) data.endAt = endAt;
      if (discountType === "rate") data.discountRate = discount;
      else if (discountType === "price") data.discountPrice = discount;

      axios
        .post("/api/coupons", data)
        .then((res) => {
          resetState();
          setIsVisible(false);
          setComments([...comments, res.data]);
        })
        .catch((err) => {
          if (err.response.data.code)
            return toastNotify("error", "Đã tồn tại mã code");
          toastNotify("error", "Đã có lỗi xảy ra");
        });
    }
  };

  const handleResponse = (id) => {
    setCommentId(id);
    setIsUpdate(true);
    setIsVisible(true);
  };
  const handleUpdate = () => {
    if (!content) return toastNotify("warn", "Mô tả không được để trống");
    else {
      let data = {
        commentId,
        content,
      };

      axios
        .post(`/api/comments/reply`, data)
        .then((res) => {
          let idx = comments.findIndex((e) => e._id === commentId);
          if (idx >= 0) {
            resetState();
            setComments([
              ...comments.slice(0, idx),
              res.data[0],
              ...comments.slice(idx + 1, comments.length),
            ]);
            toastNotify("success", "Phản hồi thành công");
            setIsVisible(false);
          }
        })
        .catch((err) => {
          toastNotify("error", "Đã có lỗi xảy ra");
        });
    }
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
      title: "Tên người dùng",
      dataIndex: "user",
      key: "user",
      render: (text) => (text ? text.name : null),
    },
    {
      title: "Email",
      dataIndex: "user",
      key: "user",
      render: (text) => (text ? text.email : null),
    },
    {
      title: "Sản phẩm",
      dataIndex: "productId",
      key: "productId",
      render: (text) => (text ? text.name : null),
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Phản hồi",
      dataIndex: "replies",
      key: "replies",
      render: (text) =>
        text && text.length > 0 ? text[text.length - 1].content : null,
    },
    {
      title: "Hành động",
      key: "actions",
      fixed: "right",
      width: 200,
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => handleResponse(record._id)}>
            Phản hồi
          </Button>
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
        {/* <div style={{ display: "flex" }}>
          <Input style={{ marginLeft: "4px" }} placeholder="Tìm kiếm" />
        </div> */}
      </div>
      <Modal
        style={{ top: "20px" }}
        title="Mã khuyễn mãi"
        visible={isVisible}
        maskClosable={false}
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
                htmlFor="price"
              >
                Bình luận
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="price"
                disabled={true}
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                htmlFor="price"
              >
                Nội dung phản hồi
              </label>
              <textarea
                class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                rows="4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
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
        dataSource={comments}
        rowKey={(record) => record._id}
        pagination={pagination}
        onChange={(_pagination, filters, sorter) => setPagination(_pagination)}
        scroll={{ x: "100%" }}
      />
    </>
  );
}

export default Responses;
