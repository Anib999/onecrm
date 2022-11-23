import { fetch, store } from '../utils/httpUtil';
import { message } from 'antd'
import catchErrors from '../utils/catchErrors';

export const updateSupplierQuotationApi = (data, successCallback, failureCallback, finalCallback) => {
  //for updating assigned supplier in product details/sample quote tab
  let url = `UpdateQuotationDetails?prodId=${data?.productId}&supplierId=${data?.supplierId}&quotationDate=${data?.supDate}&userId=${data?.userId}&supNote=${data?.supNote}&actionRemarks=${data?.actionRemarks}`
  productStatusChangeApi(url, successCallback, failureCallback, finalCallback)
}


export const assignSupplierQuotationApi = (data, quotationId, successCallback, failureCallback, finalCallback) => {
  //for assigning supplier in product detail/sample quote tab
  return async dispatch => {
    let url = `AssignSupplierToSendQuotationForSample?productId=${data?.productId}&supplierId=${data?.supplierId}&remarks=${data?.remarks}&status=${data?.status}&entrydate=${data?.entrydate}&action=${data?.action}&userid=${data?.userId}`
    try {
      const response = await store(url, null);
      if (response?.status === 200) {
        successCallback(response)
        message.success(response?.data?.Message)
      } else {
        failureCallback()
        message.error(response?.data?.message)
      }
    }
    catch (error) {
      catchErrors(error, url)
    }
    finally {
      finalCallback();
    }
  }
}

export const receivedSampleQuoteApi = (data, successCallback, failureCallback, finalCallback) => {
  let url = `UpdateQuotationReplyFromSupplierByQuotationId?prodId=${data?.productId}&supplierId=${data?.supplierId}&quotationDate=${data?.quotationDate}&userId=${data?.userId}&supNote=${data?.supNote}&actionremarks=${data?.actionRemarks}`;
  productStatusChangeApi(url, successCallback, failureCallback, finalCallback)
}

export const requestSampleOrderApi = (data, successCallback, failureCallback, finalCallback) => {
  // for request sample order in productdetails / sample quote tab
  let url = `SampleOrderForSupplier?productId=${data?.productId}&supplierId=${data?.supplierId}&QuotationId=${data?.quotationId}&remarks=${data?.remarks}&entrydate=${data?.entryDate}&userid=${data?.userId}&quantity=${data?.quantity}&price=${data?.price}&duearrivalDate=${data?.dueArrivalDate}`;
  productStatusChangeApi(url, successCallback, failureCallback, finalCallback)
}

export const receivedSampleOrderApi = (data, successCallback, failureCallback, finalCallback) => {
  //for recevied sample order form in product details/sample order tab
  let url = `OrderSampleReceivedFromSupplier?orderId=${data?.orderId}&userid=${data?.userId}&deliveryDate=${data?.deliveryDate}&supplierNote=${data?.supplierNote}`
  productStatusChangeApi(url, successCallback, failureCallback, finalCallback)
}

export const requestProductOrderApi = (data, successCallback, failureCallback, finalCallback) => {
  //for request product order form in productDetails/sample order tab
  let url = `ProductOrderForSupplier?productId=${data?.productId}&supplierId=${data?.supplierId}&note=${data?.note}&entrydate=${data?.entryDate}&userid=${data?.userId}&quantity=${data?.quantity}&price=${data?.price}&duearrivalDate=${data?.dueArrivalDate}`
  productStatusChangeApi(url, successCallback, failureCallback, finalCallback)
}

export const receivedProductOrderApi = (data, successCallback, failureCallback, finalCallback) => {
  //for received product order form in productDetails/product order tab
  let url = `ProductReceivedFromSupplier?orderId=${data?.orderId}&userid=${data?.userId}&deliveryDate=${data?.deliveryDate}&supplierNote=${data?.supplierNote}`;
  productStatusChangeApi(url, successCallback, failureCallback, finalCallback)
}

export const productStatusChangeApi = async (url, successCallback, failureCallback, finalCallback) => {
  try {
    const response = await store(url, null);
    if (response?.status === 200) {
      successCallback(response)
      message.success(response?.data?.Message)
    } else {
      failureCallback()
      message.error(response?.data?.message)
    }
  }
  catch (error) {
    catchErrors(error, url)
  }
  finally {
    finalCallback();
  }
}

