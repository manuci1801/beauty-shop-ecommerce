import { DownloadOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Table } from "antd";
import axios from "axios";
import React, { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parseHTML from "html-react-parser";
import toastNotify from "../../utils/toastNotify";
import {
  addProduct,
  deleteProduct,
  updateProduct,
} from "../../redux/actions/products";

function Products({ products, brands, categories, subcategories, dispatch }) {
  const [isVisible, setIsVisible] = useState(false);

  const [name, setName] = useState("");
  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [images, setImages] = useState(null);
  const [description, setDescription] = useState("");

  const [isUpdate, setIsUpdate] = useState(false);
  const [productId, setProductId] = useState("");

  const fileRef = useRef();

  const handleAdd = () => {
    if (!name) {
      return toastNotify("warn", "Tên không được để trống");
    }
    if (!brandId) {
      return toastNotify("warn", "Thương hiệu không được để trống");
    }
    if (!categoryId) {
      return toastNotify("warn", "Danh mục không được để trống");
    }
    if (!price) {
      return toastNotify("warn", "Giá không được để trống");
    }
    if (!amount) {
      return toastNotify("warn", "Số lượng không được để trống");
    }
    if (!images) {
      return alert("images field is required");
    }
    if (!description) {
      return alert("description field is required");
    }

    let formData = new FormData();
    formData.append("name", name);
    formData.append("brandId", brandId);
    formData.append("categoryId", categoryId);
    if (subcategoryId) formData.append("subcategoryId", subcategoryId);
    formData.append("price", price);
    formData.append("amount", amount);
    formData.append("description", description);

    for (const file of images) {
      formData.append("image", file);
    }

    axios.post("/api/products", formData).then((res) => {
      setIsVisible(false);
      dispatch(addProduct(res.data));
      resetState();
    });
    // .catch((err) => {
    //   dispatch({
    //     type: GET_ERRORS,
    //     payload: err.response.data,
    //   });
    // });
  };

  const handleUpdate = () => {
    if (!name) {
      return alert("Name field is required");
    }
    if (!brandId) {
      return alert("brand field is required");
    }
    if (!origin) {
      return alert("origin field is required");
    }
    if (!description) {
      return alert("description field is required");
    }
    let formData = new FormData();
    formData.append("name", name);
    formData.append("brandId", brandId);
    formData.append("description", description);

    if (images && images.length > 0)
      for (const file of images) {
        formData.append("image", file);
      }

    axios.put(`/api/products/${productId}`, formData).then((res) => {
      setIsVisible(false);
      dispatch(updateProduct(res.data));
      resetState();
    });
  };

  const handleDelete = (id) => {
    axios.delete(`/api/products/${id}`).then((res) => {
      dispatch(deleteProduct(id));
    });
  };

  const showDataUpdate = (product) => {
    setName(product.name);
    setBrandId(product.brandId._id);
    setImages(null);
    setDescription(product.description);
    setIsVisible(true);
    setProductId(product._id);
    setIsUpdate(true);
  };

  const resetState = () => {
    setName("");
    setBrandId("");
    setImages(null);
    setDescription("");
    setIsUpdate(false);
    fileRef.current.value = null;
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      width: 150,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Nhãn hiệu",
      dataIndex: "brand",
      key: "brand",
      render: (_, record) => (
        <>
          <a>{record.brandId.name}</a>
        </>
      ),
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      render: (_, record) => (
        <>
          <a>{record.categoryId.name}</a>
          <br />
          <a>{record.subcategoryId ? record.subcategoryId.name : null}</a>
        </>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (text) => parseHTML(text),
    },
    { title: "Giá", dataIndex: "price", key: "price" },
    { title: "Số lượng", dataIndex: "amount", key: "amount" },
    {
      title: "Hình ảnh",
      dataIndex: "images",
      key: "images",
      render: (text) => text.map((e) => <img src={`/images/${e}`} alt="img" />),
    },
    {
      title: "Hành động",
      key: "actions",
      fixed: "right",
      width: 200,
      render: (text, record) => (
        <>
          <Button onClick={() => showDataUpdate(record)} type="primary">
            Sửa
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
        <div style={{ display: "flex" }}>
          <Button type="primary" icon={<DownloadOutlined />} size="large">
            Xuất Excel
          </Button>
          <Input style={{ marginLeft: "4px" }} placeholder="Tìm kiếm" />
        </div>
      </div>
      <Modal
        style={{ top: "20px" }}
        title={!isUpdate ? "Add a new product" : "Update product"}
        visible={isVisible}
        footer={null}
        width="70%"
        onCancel={() => {
          setIsVisible(false);
          resetState();
        }}
      >
        <form className="w-full m-auto" style={{ fontSize: "14px" }}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                htmlFor="name"
              >
                Tên sản phẩm
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                htmlFor="brand"
              >
                Thương hiệu
              </label>
              <div class="relative">
                <select
                  class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  onChange={(e) => setBrandId(e.target.value)}
                  value={brandId}
                >
                  <option value="">Chọn thương hiệu</option>
                  {brands && brands.length > 0
                    ? brands.map((brand) => (
                        <option value={brand._id}>{brand.name}</option>
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
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                htmlFor="brand"
              >
                Danh mục
              </label>
              <div class="relative">
                <select
                  class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  onChange={(e) => setCategoryId(e.target.value)}
                  value={categoryId}
                >
                  <option value="">Chọn danh mục</option>
                  {categories && categories.length > 0
                    ? categories.map((category) => (
                        <option value={category._id}>{category.name}</option>
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
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                htmlFor="brand"
              >
                Danh mục phụ
              </label>
              <div class="relative">
                <select
                  class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  onChange={(e) => setSubcategoryId(e.target.value)}
                  value={subcategoryId}
                >
                  <option value="">Chọn danh mục phụ</option>
                  {categoryId && subcategories && subcategories.length > 0
                    ? subcategories
                        .filter((sub) => sub.categoryId._id == categoryId)
                        .map((sub) => (
                          <option value={sub._id}>{sub.name}</option>
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
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                htmlFor="price"
              >
                Giá
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                htmlFor="price"
              >
                Số lượng
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="price"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                htmlFor="image"
              >
                Image
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="image"
                name="image"
                type="file"
                ref={fileRef}
                multiple={true}
                onChange={(e) => setImages(e.target.files)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              {/* <textarea
                className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              /> */}
              <CKEditor
                editor={ClassicEditor}
                data={description}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDescription(data);
                  console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
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

      <Table columns={columns} dataSource={products} scroll={{ x: "150%" }} />
    </>
  );
}

export default Products;
