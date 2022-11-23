import { fetchProducts, getProductDetailByClientId } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { generateUrlEncodedData } from '../utils/generateFormData';
import { createUpdateProduct, getProductDetailByProductId, createUpdateSupplierForQuotation, getProductDetail, getProductDetailByClientIdWithCount } from '../constants/url';
import { message } from 'antd'
import { createSampleQuoteSuccess, editSampleQuoteSuccess, fetchSampleQuoteSuccess, fetchProductDetailSuccess, fetchSampleOrderSuccess, fetchProductOrderSuccess, updateProductsCount } from '../store/slices/productSlice';
import moment from 'moment';
import axios from 'axios';
import catchErrors from '../utils/catchErrors';

export const getAllSampleQuoteApi = (filters, finalCallback) => {
  return async dispatch => {
    // console.log(filters);
    // sample-quote
    let url = `${fetchProducts}?filter=&productName=${filters?.keyword ?? ''}&productId=${filters?.productId ?? 0}`
    if(filters != undefined){
      // sample-quote
      url = `${getProductDetailByClientIdWithCount}?clientId=${filters}&productName=${filters?.keyword ?? ''}&filter=`;
    }
    try {
      const response = await fetch(url);
      if (response?.status === 200) {
        // console.log(response?.data?.ProductDetails);
        // CountDetails Table2
        dispatch(fetchSampleQuoteSuccess({ data: response?.data?.ProductDetails, counts: response?.data?.CountDetails[0] }))
      }else{
        dispatch(fetchSampleQuoteSuccess({ data: [], counts: 0 }))
      }
    }
    catch (error) {
      catchErrors(error, url)
    } finally {
      finalCallback();
    }
  }
}

export const getAllSampleOrderApi = (filters, finalCallback) => {
  return async dispatch => {
    // const url = `${fetchProducts}?filter=sample-order`
    let url = `${fetchProducts}?filter=sample-order&productName=${filters?.keyword ?? ''}&productId=${filters?.productId ?? 0}`
    if(filters != undefined){
      url = `${getProductDetailByClientIdWithCount}?clientId=${filters}&productName=${filters?.keyword ?? ''}&filter=sample-order`;
    }
    try {
      const response = await fetch(url);
      // console.log('response', response)
      if (response?.status === 200) {
        dispatch(fetchSampleOrderSuccess({ data: response?.data?.ProductDetails }));
        dispatch(updateProductsCount({ counts: response?.data?.Table2[0] }))
      }else{
        dispatch(fetchSampleOrderSuccess({ data: [] }));
      }
    }
    catch (error) {
      // console.log('errors here', error)
      catchErrors(error, url)
    } finally {
      finalCallback();
    }
  }
}
export const getAllProductOrderApi = (filters, finalCallback) => {
  return async dispatch => {
    let url = `${fetchProducts}?filter=product-order`
    if(filters != undefined){
      url = `${getProductDetailByClientIdWithCount}?clientId=${filters}&productName=${filters?.keyword ?? ''}&filter=product-order`;
    }
    // console.log('url-sample-order', url)
    try {
      const response = await fetch(url);
      if (response?.status === 200) {
        dispatch(fetchProductOrderSuccess({ data: response?.data?.ProductDetails, counts: response?.data?.Table2[0] }));
        dispatch(updateProductsCount({ counts: response?.data?.Table2[0] }))
      }else{
        dispatch(fetchProductOrderSuccess({ data: [] }));
      }
    }
    catch (error) {
      console.log('errors here', error)
      catchErrors(error, url)
    } finally {
      finalCallback();
    }
  }
}



export const createSampleQuoteApi = (data, productId, successCallback, finalCallback) => {
  // for create and update of sample quote
  return async dispatch => {

    try {
      // const response=await 
      let object = {
        ...data,
        ProdOrderDate: moment(data?.ProdOrderDate).format()
      };
      if (productId) {
        object = {
          ...object,
          PId: productId
        }
      }
      const formData = generateUrlEncodedData(object);

      const response = await store(createUpdateProduct, formData)

      if (response?.data?.SuccessMsg) {
        successCallback(response?.data);
        let responseObj = {
          ...data,
          PId: response?.data?.CreatedId
        }
        if (productId) {
          dispatch(editSampleQuoteSuccess({ data: responseObj, productId: productId }))
        } else {
          dispatch(createSampleQuoteSuccess({ data: responseObj }))
        }
        message.success(response?.data?.Message)
      } else {
        message.error(response?.data?.message)
      }

    }
    catch (error) {
      catchErrors(error, createUpdateProduct)
    }
    finally {

    }
  }

}


export const getProductDetailApi = (productId, finalCallback) => {
  //temp data remove after new data
  let tempObj = {};
  let ordObj = {};
  let pordObj = {};

  if(productId?.tempObj != undefined){ 
    ordObj = productId?.tempObj
    productId = productId?.productId
  }else if(productId?.tempsObj != undefined){
    pordObj = productId?.tempsObj
    productId = productId?.productId
  }
  else if(productId?.productId != undefined){
    tempObj = productId?.temObj
    productId = productId?.productId
  }
  //temp data remove after new data

  return async dispatch => {
    let url = `${getProductDetail}?productId=${productId}`
    try {
      const response = await fetch(url);
      if (response?.status === 200) {
        //temp data remove after new data
        response?.data?.SampleQuoteDetails.push(tempObj)
        response?.data?.SampleOrderDetails.push(ordObj)
        response?.data?.ProductOrderDetails.push(pordObj)
        //temp data remove after new data
        dispatch(fetchProductDetailSuccess({
          data: response?.data?.ProductDetails[0],
          tabs: response?.data,
          activityLog: response?.data?.ActivityLog
        }))
        // console.log(response?.data?.SampleQuoteDetails);
      }
    } catch (error) {
      catchErrors(error, url)
    }
    finally {
      finalCallback();
    }
  }
}


export const createUpdateSupplierQuotationApi = (data, quotationId, successCallback, failureCallback, finalCallback) => {
  return async dispatch => {
    try {
      let object = data;
      const formData = generateUrlEncodedData(object);

      const response = await store(createUpdateSupplierForQuotation, formData)
      if (response?.status === 200) {
        successCallback(response)
        message.success(response?.data?.Message)
      } else {
        failureCallback()
        message.error(response?.data?.message)
      }
    }
    catch (error) {
      catchErrors(error, createUpdateSupplierForQuotation)
    }
    finally {
      finalCallback()
    }
  }
}

// export const getProductDetailApi = (productId, finalCallback) => {
//   //for fetching product details tabs
//   return async dispatch => {
//     try {
//       let url = `${getProductDetail}?productId=${productId}`
//       const response = await fetch(url);
//       if (response?.status === 200) {
//         dispatch(fetchProductDetailTabSuccess({ data: response?.data, productId: productId }))
//       }
//     } catch (error) {
//       console.log('error', error)
//     }
//     finally {
//       finalCallback();
//     }

//   }
// }

export const changeProductStatus = (data, finalCallback) => {
  //not in use atm
  return async dispatch => {
    try {
      const formData = generateUrlEncodedData(data);
      const response = await store();
      // console.log('change product status response', response)
    }
    catch (error) {

    }
    finally {
      finalCallback()
    }
  }
}




