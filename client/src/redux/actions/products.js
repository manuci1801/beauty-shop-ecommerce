import axios from "axios";

import toastNotify from "../../utils/toastNotify";

import {
  GET_PRODUCTS,
  GET_ERRORS,
  SET_LOADING,
  GET_BRANDS,
  GET_NEWS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  ADD_BRAND,
  DELETE_BRAND,
  UPDATE_BRAND,
  ADD_NEW,
  DELETE_NEW,
  UPDATE_NEW,
  GET_CATEGORIES,
  GET_CART,
  ADD_CART,
  CLEAR_CART,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  GET_SUBCATEGORIES,
  ADD_SUBCATEGORY,
  DELETE_SUBCATEGORY,
  UPDATE_SUBCATEGORY,
} from "../types";

export const getProducts = () => (dispatch) => {
  axios
    .get("/api/products")
    .then((res) => {
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors,
      });
    });
};

export const getCategories = () => (dispatch) => {
  axios
    .get("/api/categories")
    .then((res) => {
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors,
      });
    });
};

export const getSubcategories = () => (dispatch) => {
  axios
    .get("/api/subcategories")
    .then((res) => {
      dispatch({
        type: GET_SUBCATEGORIES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors,
      });
    });
};

export const getBrands = () => (dispatch) => {
  axios
    .get("/api/brands")
    .then((res) => {
      dispatch({
        type: GET_BRANDS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addProduct = (data) => (dispatch) => {
  console.log(data);
  dispatch({
    type: ADD_PRODUCT,
    payload: data,
  });
};

export const deleteProduct = (data) => (dispatch) => {
  dispatch({
    type: DELETE_PRODUCT,
    payload: data,
  });
};

export const updateProduct = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_PRODUCT,
    payload: data,
  });
};

export const addBrand = (data) => (dispatch) => {
  console.log(data);
  dispatch({
    type: ADD_BRAND,
    payload: data,
  });
};

export const deleteBrand = (data) => (dispatch) => {
  dispatch({
    type: DELETE_BRAND,
    payload: data,
  });
};

export const updateBrand = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_BRAND,
    payload: data,
  });
};

export const addCategory = (data) => (dispatch) => {
  console.log(data);
  dispatch({
    type: ADD_CATEGORY,
    payload: data,
  });
};

export const deleteCategory = (data) => (dispatch) => {
  dispatch({
    type: DELETE_CATEGORY,
    payload: data,
  });
};

export const updateCategory = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_CATEGORY,
    payload: data,
  });
};

export const addSubcategory = (data) => (dispatch) => {
  console.log(data);
  dispatch({
    type: ADD_SUBCATEGORY,
    payload: data,
  });
};

export const deleteSubcategory = (data) => (dispatch) => {
  dispatch({
    type: DELETE_SUBCATEGORY,
    payload: data,
  });
};

export const updateSubcategory = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_SUBCATEGORY,
    payload: data,
  });
};

export const getCart = () => (dispatch) => {
  dispatch({
    type: GET_CART,
  });
};

export const addToCart = (data) => (dispatch) => {
  toastNotify("success", "Thêm vào giỏ hàng thành công");
  dispatch({
    type: ADD_CART,
    payload: data,
  });
};

export const clearCart = (message) => (dispatch) => {
  toastNotify("success", message);
  dispatch({
    type: CLEAR_CART,
  });
};

export const checkout = (data) => (dispatch) => {
  axios
    .post("/api/orders/checkout", data)
    .then((res) => {
      toastNotify("success", "Đặt hàng thành công");
      dispatch({
        type: CLEAR_CART,
      });
      window.location.href = "/cart";
    })
    .catch((err) => console.log(err));
};
