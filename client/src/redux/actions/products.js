import axios from "axios";
import toastNotify from "../../utils/toastNotify";
import {
  ADD_BRAND,
  ADD_CART,
  ADD_CATEGORY,
  ADD_PRODUCT,
  ADD_SUBCATEGORY,
  CLEAR_CART,
  DELETE_BRAND,
  DELETE_CATEGORY,
  DELETE_PRODUCT,
  DELETE_SUBCATEGORY,
  GET_BRANDS,
  GET_CART,
  GET_CATEGORIES,
  GET_ERRORS,
  GET_PRODUCTS,
  GET_SUBCATEGORIES,
  UPDATE_BRAND,
  UPDATE_CATEGORY,
  UPDATE_PRODUCT,
  UPDATE_SUBCATEGORY,
  DELETE_FROM_CART,
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
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data.errors,
      // });
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
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data.errors,
      // });
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
  axios
    .get("/api/carts")
    .then((res) => {
      return dispatch({
        type: GET_CART,
        payload: res.data.cart,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_CART,
      })
    );
};

export const addToCart = (data) => (dispatch) => {
  // toastNotify("success", "Thành công");
  // console.log(data);
  return dispatch({
    type: ADD_CART,
    payload: data,
  });
};

export const clearCart = () => (dispatch) => {
  return dispatch({
    type: CLEAR_CART,
  });
};

export const deleteFromCart = (id) => (dispatch) => {
  return dispatch({
    type: DELETE_FROM_CART,
    payload: id,
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
      setTimeout(() => {
        window.location.href = "/cart";
      }, 2000);
    })
    .catch((err) => console.log(err));
};
