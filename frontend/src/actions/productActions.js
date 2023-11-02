import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILS,
  PRODUCT_ADMIN_REQUEST,
  PRODUCT_ADMIN_SUCCESS,
  PRODUCT_ADMIN_FAILS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILS,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAILS,
} from "../constants/productConstant";

export const newProduct = (productData) => async (dispatch) => {
  console.log(productData);
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://localhost:5000/admin/product/new",
      productData,
      config
    );

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAILS,
      payload: error.response && error.response.data.message
         
    });
  }
};
export const listProducts = (keyword='', currentPage=1) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const response = await axios.get(`http://localhost:5000/products?keyword=${keyword}&page=${currentPage}`);
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const adminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_ADMIN_REQUEST });
    const {data} = await axios.get("http://localhost:5000/admin/products");
    dispatch({
      type: PRODUCT_ADMIN_SUCCESS,
      payload: data
    });
    console.log(data);

  } catch (error) {
    dispatch({
      type: PRODUCT_ADMIN_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const response = await axios.get(`http://localhost:5000/product/${id}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: response.data.product });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const response = await axios.delete(`http://localhost:5000/admin/product/${id}`);

    dispatch({ type: DELETE_PRODUCT_SUCCESS,
       payload: response.data.success });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
