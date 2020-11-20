import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import formatPrice from "../../utils/formatPrice";
import { Button, Input, Table, Modal, Select, Tabs } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import toastNotify from "../../utils/toastNotify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parseHTML from "html-react-parser";
// import * as ckfinder from "@ckeditor/ckeditor5-ckfinder/src/ckfinder";

function Blogs() {
  const { Option } = Select;
  const { TabPane } = Tabs;

  const [currentTab, setCurrentTab] = useState("blogs");

  const [blogs, setBlogs] = useState([]);
  const [blogCategories, setBlogCategories] = useState([]);
  const [blogTags, setBlogTags] = useState([]);

  const [isVisible, setIsVisible] = useState(false);

  const [title, setTitle] = useState("");
  const [categoryIdSelected, setCategoryIdSelected] = useState("");
  const [tagsSelected, setTagsSelected] = useState([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  // const [startAt, setStartAt] = useState("");
  // const [endAt, setEndAt] = useState("");
  const fileRef = useRef();

  const [isUpdate, setIsUpdate] = useState(false);

  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  function callback(key) {
    setCurrentTab(key);
  }

  useEffect(() => {
    axios
      .get("/api/blogs")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get("/api/blogs/categories")
      .then((res) => {
        setBlogCategories(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get("/api/blogs/tags")
      .then((res) => {
        setBlogTags(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/blogs/${id}`).then((res) => {
      setBlogs(blogs.filter((e) => e._id != id));
    });
  };

  function resetState() {
    setTitle("");
    setCategoryIdSelected("");
    setTagsSelected([]);
    setContent("");
    setImage(null);
    fileRef.current.value = null;
  }

  const handleAdd = () => {
    console.log(title);
    console.log(categoryIdSelected);
    console.log(tagsSelected);
    if (!title) return toastNotify("warn", "Tiêu đề không được để trống");
    else if (!categoryIdSelected)
      return toastNotify("warn", "Danh mục không được để trống");
    else if (!image) return toastNotify("warn", "Ảnh bìa không được để trống");
    else if (!content)
      return toastNotify("warn", "Nội dung không được để trống");
    else {
      let formData = new FormData();

      formData.append("title", title);
      formData.append("category", categoryIdSelected);
      formData.append("cover", image);
      formData.append("content", content);

      if (tagsSelected.length > 0)
        formData.append("tags", JSON.stringify(tagsSelected));

      axios
        .post("/api/blogs", formData)
        .then((res) => {
          resetState();
          setIsVisible(false);
          setBlogs([res.data, ...blogs]);
        })
        .catch((err) => toastNotify("error", "Đã có lỗi xảy ra"));
    }
  };

  const handleUpdate = () => {};

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
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
      render: (text) => text.name,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      render: (text) => text.name,
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (text) => text.join(", "),
    },

    {
      title: "Ảnh bìa",
      dataIndex: "cover",
      key: "cover",
      render: (text) => <img src={`/images/${text}`} alt="image" />,
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      render: (text) => <div class="max-3-line">{parseHTML(text)}</div>,
    },
    // { title: "Bắt đầu", dataIndex: "startAt", key: "startAt" },
    // { title: "Bắt đầu", dataIndex: "endAt", key: "endAt" },
    {
      title: "Hành động",
      key: "actions",
      fixed: "right",
      width: 200,
      render: (text, record) => (
        <>
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
      <Tabs defaultActiveKey={currentTab} onChange={callback}>
        <TabPane tab="Blog" key="blogs">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: "8px",
              borderBottom: "1px solid #999",
            }}
          >
            <Button
              type="primary"
              size="large"
              onClick={() => setIsVisible(true)}
            >
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
            // title={!isUpdate ? "Add a new product" : "Update product"}
            visible={isVisible}
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
                    Tiêu đề
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="price"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                    htmlFor="brand"
                  >
                    Danh mục
                  </label>
                  <div class="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      onChange={(e) => setCategoryIdSelected(e.target.value)}
                      value={categoryIdSelected}
                    >
                      <option value="">Chọn danh mục</option>
                      {blogCategories && blogCategories.length > 0
                        ? blogCategories.map((category) => (
                            <option value={category._id}>
                              {category.name}
                            </option>
                          ))
                        : null}
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
                <div className="w-full">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                    htmlFor="price"
                  >
                    Tags
                  </label>
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Chọn tag cho blog"
                    onChange={(value) => setTagsSelected(value)}
                    value={tagsSelected}
                  >
                    {blogTags &&
                      blogTags.length > 0 &&
                      blogTags.map((tag) => (
                        <Option key={tag._id} value={tag.tag}>
                          {tag.tag}
                        </Option>
                      ))}
                  </Select>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                    htmlFor="image"
                  >
                    Ảnh bìa
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="image"
                    name="image"
                    type="file"
                    ref={fileRef}
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                    htmlFor="price"
                  >
                    Nội dung
                  </label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setContent(data);
                      console.log({ event, editor, data });
                    }}
                    // config={{
                    //   ckfinder: {
                    //     upl: "/api/blogs/uploads",
                    //   },
                    // }}
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
                      // else handleUpdate();
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
            dataSource={blogs}
            rowKey={(record) => record._id}
            pagination={pagination}
            onChange={(_pagination, filters, sorter) =>
              setPagination(_pagination)
            }
            scroll={{ x: "125%" }}
          />
        </TabPane>
        <TabPane tab="Danh mục" key="blog-categories"></TabPane>
        <TabPane tab="Tags" key="blog-tags"></TabPane>
      </Tabs>
    </>
  );
}

export default Blogs;
