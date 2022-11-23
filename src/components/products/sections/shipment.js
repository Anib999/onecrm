import React, { useState, useEffect } from "react";
import ProductListing from "../../common/card/productListingCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllSampleQuoteApi } from "../../../services/productService";
import { Pagination, Empty } from "antd";
import AppSpinner from "../../common/spinner";

const productVariant = [
  {
    id: 1,
    name: "PU Round Zip Middle Wallet Red",
    shipment_date: "01-04-2021",
    quantity: 500,
    selling_price: 2480,
    invoiced: true,
    paid: true,
    note: "Sample",
  },
  {
    id: 2,
    name: "PU Round Zip Middle Wallet Black",
    shipment_date: "01-04-2021",
    quantity: 1000,
    selling_price: 2480,
    invoiced: true,
    paid: true,
    note: "Sample",
    status: "approved",
  },
];

const Shipment = (props) => {
  const dispatch = useDispatch();
  const productReducer = useSelector((state) => state.product);
  const [isLoading, setLoading] = useState(false);
  const [productIds, setProductIds] = useState(
    productReducer?.allSampleQuoteId
  );

  const [minValue, setminValue] = useState(0);
  const [maxValue, setmaxValue] = useState(10);

  const [isCli, setIsCli] = useState(props.cliId);

  useEffect(() => {
    // if (productReducer?.allSampleQuoteId.length === 0) {
    setLoading(true);
    getSampleQuote();
    // }
  }, []);

  useEffect(() => {
    setProductIds(productReducer?.allSampleQuoteId);
  }, [productReducer?.allSampleQuoteId]);

  const getSampleQuote = () => {
    dispatch(
      getAllSampleQuoteApi(isCli, () => {
        setLoading(false);
      })
    );
  };

  if (isLoading) {
    return <AppSpinner />;
  }

  const handleChange = (value) => {
    setminValue((value - 1) * 10);
    setmaxValue(value * 10);
  };

  return (
    <div>
      {productIds != "" ? (
        productIds.slice(minValue, maxValue)?.map((item) => {
          let product = productReducer?.products[item];
          return (
            <ProductListing
              data={product}
              title={`${item?.ProcCode} - ${item?.ProductName}`}
              status="Draft"
              type="shipment"
              hasProductVariants
              hasDetailedVariants
              productVariant={productVariant}
            />
          );
        })
      ) : (
        <Empty></Empty>
      )}
      {/* {} */}
      <Pagination
        defaultCurrent={1}
        total={productIds.length}
        pageSize={10}
        defaultPageSize={10}
        onChange={handleChange}
        responsive
      />
    </div>
  );
};

export default Shipment;
