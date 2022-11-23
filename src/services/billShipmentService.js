import { InsertUpdateProductShipment, InsertUpdateShipmentProdcutDetails, GetShipmentBillByBillId, GetListOfShippingItemsByShipId } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { message } from 'antd';
import { generateUrlEncodedData } from '../utils/generateFormData';
// import { generateMulEncodedData } from '../utils/generateMulFormData';

export const createProductForShipmentApi = (data, successCallback, finalCallback) => {
    return async dispatch => {
        try {
            const formData1 = generateUrlEncodedData(data);
            const response = await store(InsertUpdateProductShipment, formData1)
            if (response?.status === 200) {
                successCallback(response);
            }
        } catch (error) {
            console.log('error---', error)
        } finally {
            finalCallback()
        }
    }
}

export const createProductAfterShipApi = (data, successCallback, finalCallback) => {
    return async dispatch => {
        try {
            // console.log(data);
            const formData1 = generateUrlEncodedData(data);
            const response = await store(InsertUpdateShipmentProdcutDetails, formData1)
            if (response?.status === 200) {
                successCallback(response);
            }
        } catch (error) {
            console.log('error---', error)
        } finally {
            finalCallback()
        }
    }
}

export const fetchProductApi = (shipId = 0, successCallback, finalCallback) => {
    return async dispatch => {
        try {
            let url = `${GetShipmentBillByBillId}?shipId=${shipId}`
            const response = await fetch(url)
            if (response?.status === 200) {
                successCallback(response?.data?.shipmentBill)
            }
        }
        catch (error) {
            console.log('error---', error)
        }
        finally {
            finalCallback()
        }
    }
}

export const fetchProductDetApi = (shipId, successCallback, finalCallback) => {
    return async dispatch => {
        try {
            let url = `${GetListOfShippingItemsByShipId}?shipmentId=${shipId}`
            const response = await fetch(url)
            if (response?.status === 200) {
                let allRes = response?.data?.shippingitemDetails
                
                allRes.forEach(ele => {
                    ele.netPrice = ele.SellingPrice * ele.ShipQuantity
                    ele.product = ele.ProductName
                    ele.productCode = ''
                    ele.productId = ele.ProductId
                    ele.quantity = ele.ShipQuantity
                    ele.remarks = ele.Remarks
                    ele.unitPrice = ele.SellingPrice
                })
                
                successCallback(allRes)
            }
        }
        catch (error) {
            console.log('error---', error)
        }
        finally {
            finalCallback()
        }
    }
}