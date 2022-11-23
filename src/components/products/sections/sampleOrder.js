import React, { useState, useEffect } from "react";
import ProductListing from "../../common/card/productListingCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllSampleQuoteApi, getAllSampleOrderApi } from "../../../services/productService";
import { Pagination, Empty, Tag, Space } from "antd";
import AppSpinner from "../../common/spinner";
import { CSVLink } from "react-csv";
import AppTable from '../../common/table/table';
import FilterTable from '../../common/filter/newTableFilter';
import { useHistory } from 'react-router-dom';
import { FiEye } from "react-icons/fi";

const SampleOrder = (props) => {
  const history = useHistory();
  const { activeTabKey } = props;
  const dispatch = useDispatch();
  const productReducer = useSelector((state) => state.product);
  const [isLoading, setLoading] = useState(false);
  const [productIds, setProductIds] = useState(
    productReducer?.allSampleOrderId
  );
  const filterReducer = useSelector((state) => state.filter);

  const [minValue, setminValue] = useState(0);
  const [maxValue, setmaxValue] = useState(10);

  const [isCli, setIsCli] = useState(props.cliId);

  const [eData, seteData] = useState([]);

  useEffect(() => {
    // if (productReducer?.allSampleOrderId.length === 0) {
    setLoading(true);
    getSampleOrder();
    // }
  }, []);

  useEffect(() => {
    if (activeTabKey == 2) {
      getSampleOrder(filterReducer?.filters);
    }
  }, [filterReducer?.filters, activeTabKey]);

  useEffect(() => {
    setProductIds(productReducer?.allSampleOrderId);
  }, [productReducer?.allSampleOrderId]);

  const getSampleOrder = (filters) => {
    dispatch(
      getAllSampleOrderApi(
        // filters,
        isCli,
        () => {
          setLoading(false);
        }
      )
    );
  };

  if (isLoading) {
    return <AppSpinner />;
  }

  const handleChange = (value) => {
    setminValue((value - 1) * 10);
    setmaxValue(value * 10);
  };

  const proRed = (value) => {
    let newArr = [];
    for (const key in value) {
      if (Object.hasOwnProperty.call(value, key)) {
        const ele = value[key];
        newArr.push(ele)
      }
    }
    return newArr;
  }

  const columns = [
    {
      title: 'Code',
      dataIndex: 'ProcCode',
    },
    {
      title: 'Product Name',
      dataIndex: 'ProductName',
    },
    {
      title: 'Client Name',
      dataIndex: 'ClientName',
    },
    {
      title: 'Order Date',
      dataIndex: 'ProdOrderDate',
      render: (data) => {
        return data.split('T')[0];
      }
    },
    {
      title: 'Stock Code',
      dataIndex: 'ProStockCode',
    },
    {
      title: 'Is active',
      dataIndex: '',
      render: (data) => {
        return (
          <Tag
                className={data?.ProdIsactive ? 'active-tag' : 'inactive-tag'}
                color={data?.ProdIsactive ? 'green' : 'red'}
                color='pink'
              >
                {data?.ProdIsactive ? 'Active' : 'Inactive'}
              </Tag>
        );
      }
    },
    {
      title: 'Product Note',
      dataIndex: 'ProductNote',
    },
    {
      title: 'Action',
      dataIndex: '',
      render: (data) => {
        return (
          <Space size="middle" className="table-actn-icon">
            <FiEye onClick={() => history.push({
              pathname: `/product/${data?.PId}`
            })} />
          </Space>
        );
      }
    },
  ]

  const handleSearche = searchText => {
    let data = proRed(productReducer?.products);
    const filteredEvents = data.filter(data => {
      searchText = searchText.toLowerCase();
      let ProcCode = data.ProcCode.toLowerCase();
      let ProductName = data.ProductName.toLowerCase();
      let ClientName = data.ClientName != null ? data.ClientName.toLowerCase() : '';
      let ProdOrderDate = data.ProdOrderDate != null ? data.ProdOrderDate.split('T')[0] : '';
      let ProStockCode = data.ProStockCode != null ? data.ProStockCode.toLowerCase() : '';
      let ProdIsactive = data.ProdIsactive != null ? data.ProdIsactive == true ? 'active' : 'inactive' : '';
      let ProductNote = data.ProductNote != null ? data.ProductNote.toLowerCase() : '';
      return ProcCode.includes(searchText) || ProductName.includes(searchText) || ClientName.includes(searchText) || ProdOrderDate.includes(searchText) || ProStockCode.includes(searchText) || ProdIsactive.includes(searchText) || ProductNote.includes(searchText);
    });
    seteData(filteredEvents)
  };
  
  return (
    <div>
      {productIds != "" ? (
      <>
      <CSVLink filename={"sample-order.csv"} className="btn ant-btn btn-primary btn-primary--outline" data={proRed(productReducer?.products)}>Export CSV</CSVLink>
      <FilterTable
        onInput={e => handleSearche(e.target.value)} className={'pull-right'} 
      />
      <AppTable
        columns={columns}
        dataSource={eData != '' ? eData : proRed(productReducer?.products)}
        loading={isLoading}
      />
      </>
      ) : (
        <Empty></Empty>
      )}
      {/* {productIds != "" ? (
        productIds.slice(minValue, maxValue)?.map((item) => {
          let product = productReducer?.products[item];
          return (
            <ProductListing
              data={product}
              title={`${item?.ProcCode} - ${item?.ProductName}`}
              status="Draft"
              type="sampleOrder"
            />
          );
        })
      ) : (
        <Empty></Empty>
      )}
      <Pagination
        defaultCurrent={1}
        total={productIds.length}
        pageSize={10}
        defaultPageSize={10}
        onChange={handleChange}
        responsive
      /> */}
    </div>
  );
};

export default SampleOrder;
