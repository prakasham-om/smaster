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
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAILS,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILS,
} from "../constants/productConstant";

export const newProductReducer = (state = { products: {} }, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        products: action.payload,
      };
    case PRODUCT_CREATE_FAILS:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
    case PRODUCT_ADMIN_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
    case PRODUCT_ADMIN_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        resPerPage: action.payload.resPerPage,
        productCount: action.payload.countProduct,
        size: action.payload.size,
      };
    case PRODUCT_LIST_FAILS:
    case PRODUCT_ADMIN_FAILS:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAILS:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productReaducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_PRODUCT_FAILS:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
