import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_SAVE_REQUEST,
    PRODUCT_SAVE_SUCCESS,
    PRODUCT_SAVE_FAIL,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_REVIEW_SAVE_REQUEST,
    PRODUCT_REVIEW_SAVE_FAIL,
    PRODUCT_REVIEW_SAVE_SUCCESS,
  } from '../constants/productConstants';
  // import axios from 'axios';
import config from '../config.js';
  // import axios from 'axios';
  
  const listProducts = (
    category = '',
    searchKeyword = '',
    sortOrder = ''
  ) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const response = await fetch(config.endpoint+ '/api/products?category=' +
          category +
          '&searchKeyword=' +
          searchKeyword +
          '&sortOrder=' +
          sortOrder , { 
        headers:{'Content-type':'application/json'},
      method: 'GET'});
      const data = await response.json();
    
      // const { data } = await axios.get(
      //   config.endpoint+'/api/products?category=' +
      //     category +
      //     '&searchKeyword=' +
      //     searchKeyword +
      //     '&sortOrder=' +
      //     sortOrder
      // );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  };
  
  const saveProduct = (product) => async (dispatch, getState) => {
    // dispatch({ type: PRODUCT_SAVE_REQUEST, payload:{ product, name, image, brand, category, description} });
    try {
      dispatch({ type: PRODUCT_SAVE_REQUEST, payload:{ product} });
      const {
        userSignin: { userInfo },
      } = getState();
      if (!product._id) {
        const response = await fetch(config.endpoint+ "/api/products", { 
          headers:{'Content-type':'multipart/form-data', Authorization: 'Bearer ' + userInfo.token},
        method: 'POST',  body: JSON.stringify({...product })});
        console.log(response, 'i am the response')
        const data = await response.json();
        console.log(data, 'i am data in the product action')
      
        // const { data } = await axios.post(config.endpoint+'/api/products', product, {
        //   headers: {
        //     Authorization: 'Bearer ' + userInfo.token,
        //   },
        // });
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
      } else {
        const response = await fetch(config.endpoint+'/api/products/' + product._id, {
          headers:{'Content-type':'multipart/form-data'},
          method: 'PUT', body: JSON.stringify({ ...product })});
       const data = await response.json();
        // const { data } = await axios.put(
        //   config.endpoint+'/api/products/' + product._id,
        //   product,
        //   {
        //     headers: {
        //       Authorization: 'Bearer ' + userInfo.token,
        //     },
        //   }
        // );
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({ type: PRODUCT_SAVE_FAIL, payload: error });
    }
  };
  
  const detailsProduct = (productId) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
      const response = await fetch(config.endpoint+'/api/products/' + productId, {
        headers:{'Content-type':'application/json'},
        method: 'POST'});
     const data = await response.json();
      // const { data } = await axios.get(config.endpoint+'/api/products/' + productId);
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
    }
  };
  
  const deleteProdcut = (productId) => async (dispatch, getState) => {
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
      // const { data } = await axios.delete(config.endpoint+'/api/products/' + productId, {
      //   headers: {
      //     Authorization: 'Bearer ' + userInfo.token,
      //   },
      // });
      const response = await fetch(config.endpoint+'/api/products/' + productId, {
        headers:{'Content-type':'application/json', Authorization: 'Bearer ' + userInfo.token},
        method: 'DELETE'});
     const data = await response.json();
      dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
    } catch (error) {
      dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
    }
  };
  
  const saveProductReview = (productId, review) => async (dispatch, getState) => {
    try {
      const {
        userSignin: {
          userInfo: { token },
        },
      } = getState();
      dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
      // const { data } = await axios.post(
      //   `${config.endpoint}/api/products/${productId}/reviews`,
      //   review,
      //   {
      //     headers: {
      //       Authorization: 'Bearer ' + token,
      //     },
      //   }
      // );
      const response = await fetch(`${config.endpoint}/api/products/${productId}/reviews`, {
        headers:{'Content-type':'application/json', Authorization: 'Bearer ' + token},
        method: 'POST', body: JSON.stringify({ review})});
     const data = await response.json();
      dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data });
    } catch (error) {
      // report error
      dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: error.message });
    }
  };
  
  export {
    listProducts,
    detailsProduct,
    saveProduct,
    deleteProdcut,
    saveProductReview,
  };
  