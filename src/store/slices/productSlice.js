import { createSlice } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';

const initialState = {
  products: {},
  allSampleQuoteId: [],
  allSampleOrderId: [],
  allProductOrderId: [],
  allShipmentId: [],
  sampleQuoteCount: 0,
  sampleOrderCount: 0,
  productOrderCount: 0,
  shipmentCount: 0

}

const productEntity = new schema.Entity('product', {}, {
  idAttribute: 'PId'
})
const productListSchema = new schema.Array(productEntity);

const product = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchSampleQuoteSuccess: (state, action) => {
      const { data } = action.payload;
      let normalizedProductData = normalize(data, productListSchema);
      state.allSampleQuoteId = normalizedProductData.result;
      state.products = {
        ...state.products,
        ...normalizedProductData.entities.product
      };
    },

    fetchSampleOrderSuccess: (state, action) => {
      const { data } = action.payload;
      let normalizedProductData = normalize(data, productListSchema);
      state.allSampleOrderId = normalizedProductData.result;
      state.products = {
        ...state.products,
        ...normalizedProductData.entities.product
      };
    },

    fetchProductOrderSuccess: (state, action) => {
      const { data } = action.payload;
      let normalizedProductData = normalize(data, productListSchema);
      state.allProductOrderId = normalizedProductData.result;
      state.products = {
        ...state.products,
        ...normalizedProductData.entities.product
      };
    },
    fetchShipmentSuccess: (state, action) => {
      const { data } = action.payload;
      let normalizedProductData = normalize(data, productListSchema);
      state.allSampleQuotallSampleOrderIdeId = normalizedProductData.result;
      state.products = [...state.products, ...normalizedProductData.entities.product];
    },

    createSampleQuoteSuccess: (state, action) => {
      const { data } = action.payload;
      let newId = data?.PId
      state.products[newId] = data;
      state.allSampleQuoteId = [newId, ...state.allSampleQuoteId]
    },

    editSampleQuoteSuccess: (state, action) => {
      const { data, productId } = action.payload
      state.products[productId] = data
    },

    fetchProductDetailSuccess: (state, action) => {
      const { data, tabs, activityLog } = action.payload;
      state.products[data?.PId] = {
        ...state.products[data?.PId],
        ...data,
        tabs: tabs,
        activityLog: activityLog[0]
      }
    },
    // addSupplierQuotationSuccess: (state, action) => {
    //   const { data, productId } = action.payload
    //   state.products[productId] = {
    //     ...state.products[productId]
    //   }
    // },
    updateProductsCount: (state, action) => {
      const { counts } = action.payload
      state.sampleQuoteCount = counts?.SampleQuoteCount;
      state.sampleOrderCount = counts?.SampleOrderCount;
      state.productOrderCount = counts?.ProductOrderCount;
      state.shipmentCount = counts?.ShipmentCount;
    }


  }
})

export const {
  fetchSampleQuoteSuccess,
  fetchSampleOrderSuccess,
  createSampleQuoteSuccess,
  editSampleQuoteSuccess,
  fetchProductDetailSuccess,
  fetchProductOrderSuccess,
  fetchShipmentSuccess,
  updateProductsCount
} = product.actions;

export default product.reducer;