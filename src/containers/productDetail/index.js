import React, { useState, useEffect } from 'react'
import ProductDetailComponent from '../../components/productDetail';
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetailApi } from '../../services/productService';
import AppSpinner from '../../components/common/spinner';

const ProductDetailContainer = (props) => {
  const productReducer = useSelector(state => state.product);
  const productId = props?.match?.params?.id;
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(productReducer?.products[productId] ?? {});

  useEffect(() => {
    setLoading(true);
    getProductDetail();
  }, [])

  useEffect(() => {
    setData(productReducer?.products[productId])
  }, [productReducer?.products[productId]])

  const getProductDetail = () => {
    dispatch(getProductDetailApi(productId,
      () => { setLoading(false) }))
  }

  if (isLoading) {
    return (
      <AppSpinner />
    )
  }

  return (
    <>
      <ProductDetailComponent
        data={data}
        productId={productId}
      />
    </>
  )
}

export default ProductDetailContainer
