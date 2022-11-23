import React, { useState, useEffect } from 'react';
import CreateSampleQuoteComponent from '../../components/createSampleQuote';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSampleQuoteApi, getProductDetailApi } from '../../services/productService';
import { getAllCustomerApi } from '../../services/customerService';
import { getAllSampleQuoteApi } from '../../services/productService';
import { getUserCustomerApi } from '../../services/userService';

const CreateSampleQuoteContainer = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const productReducer = useSelector(state => state.product);
  const configReducer = useSelector(state => state.config);
  const customerReducer = useSelector(state => state.customer);
  const [isLoading, setLoading] = useState(false);
  const forEdit = props?.forEdit ?? false
  const productId = props?.match?.params?.id;
  const [customers, setCustomers] = useState([]);
  const [previousValues, setPreviousValues] = useState(forEdit ? productReducer?.products[productId] : {})
  const [productList, setProductList] = useState([]);

  const [allUser, setallUser] = useState([]);

  const handleFinish = (values) => {
    // console.log('handle Finish called', values);
    dispatch(createSampleQuoteApi(values, productId,
      (responseData) => {
        // history.goBack();
        history?.push(`/products/${responseData?.CreatedId}`)
      },
      () => { setLoading(false) }));
  }

  useEffect(() => {
    let customers = [];
    customerReducer?.allCustomersId?.forEach(item => {
      customers.push(customerReducer?.customers[item])
    });
    setCustomers(customers)
    if (customers.length === 0) {
      getAllCustomer()
    }
  }, [customerReducer?.allCustomersId]);

  useEffect(() => {
    let products = [];
    productReducer?.allSampleQuoteId?.forEach(item => {
      products.push(productReducer?.products[item])
    });
    setProductList(products)
    if (products.length === 0) {
      getAllProducts()
    }
  }, [productReducer?.allSampleQuoteId])

  useEffect(() => {
    if (forEdit && previousValues === undefined) {
      setLoading(true);
      getProductDetail();
    }
    getAllUsers()
  }, [])

  useEffect(() => {
    setPreviousValues(productReducer?.products[productId])
  }, [productReducer?.products[productId]])

  const getProductDetail = () => {
    dispatch(getProductDetailApi(productId,
      () => {
        //finalCallback
      }))
  }

  const getAllProducts = () => {
    // dispatch(getAllSampleQuoteApi(
    //   () => {
    //     setLoading(false)
    //   }
    // ))
  }

  const getAllCustomer = () => {
    dispatch(getAllCustomerApi({ page: 1 },
      () => {
        //final callback
      }))
  }

  const getAllUsers = () => {
    dispatch(getUserCustomerApi( (res) => {
      var ids = res.reduce((ids, thing) => {
        if (thing.IsActive) {
          ids.push({'uid': thing.UId, 'name': thing.FullName});
        }
        return ids;
      }, []);
      setallUser(ids)
    } ))
  }


  return (
    <CreateSampleQuoteComponent
      handleFinish={handleFinish}
      forEdit={forEdit}
      previousValues={previousValues}
      difficultyLevel={configReducer?.difficultyLevel}
      statusList={configReducer?.statusList}
      isLoading={isLoading}
      customers={customers}
      productList={productList}
      allUsers={allUser}
    />
  )
}

export default CreateSampleQuoteContainer;