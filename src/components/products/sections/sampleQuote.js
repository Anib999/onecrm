import React, { useState, useEffect } from "react";
import ProductListing from "../../common/card/productListingCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllSampleQuoteApi } from "../../../services/productService";
import { Pagination, Empty, Tag, Space } from "antd";
import AppSpinner from "../../common/spinner";
import { CSVLink } from "react-csv";
import AppTable from '../../common/table/table';
import FilterTable from '../../common/filter/newTableFilter';
import { useHistory } from 'react-router-dom';
import { FiEye } from "react-icons/fi";

const SampleQuote = (props) => {
  const history = useHistory();
  const { activeTabKey } = props;
  const dispatch = useDispatch();
  const productReducer = useSelector((state) => state.product);
  const [isLoading, setLoading] = useState(false);
  const [productIds, setProductIds] = useState(
    productReducer?.allSampleQuoteId
  );
  const filterReducer = useSelector((state) => state.filter);

  const [minValue, setminValue] = useState(0);
  const [maxValue, setmaxValue] = useState(10);

  const [isCli, setIsCli] = useState(props.cliId);

  const [eData, seteData] = useState([]);

  const [eFilt, seteFilt] = useState({
    filteredInfo: null,
    sortedInfo: null
  });

  useEffect(() => {
    if (activeTabKey == 1 || activeTabKey === undefined) {
      getSampleQuote(filterReducer?.filters);
    }
  }, [filterReducer?.filters, activeTabKey]);

  useEffect(() => {
    // if (productReducer?.allSampleQuoteId.length === 0) {
    if (productReducer?.allSampleQuoteId.length === 0) {
      setLoading(true);
      getSampleQuote();
    }
    // }
  }, []);

  useEffect(() => {
    setProductIds(productReducer?.allSampleQuoteId);
  }, [productReducer?.allSampleQuoteId]);

  const getSampleQuote = (filters) => {
    dispatch(
      getAllSampleQuoteApi(
        // filterReducer?.filters,
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
        if(isCli == undefined){
          newArr.push(ele)
        }else{
          if(ele?.ClientId == isCli){
            newArr.push(ele)
          }
        }
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
      defaultSortOrder: 'descend',
      sorter: (a, b) => new Date(a.ProdOrderDate) - new Date(b.ProdOrderDate),
      render: (data) => {
        return data.toString().split('T')[0];
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
      let ProdOrderDate = data.ProdOrderDate != null ? data.ProdOrderDate.toString().split('T')[0] : '';
      let ProStockCode = data.ProStockCode != null ? data.ProStockCode.toLowerCase() : '';
      let ProdIsactive = data.ProdIsactive != null ? data.ProdIsactive == true ? 'active' : 'inactive' : '';
      let ProductNote = data.ProductNote != null ? data.ProductNote.toLowerCase() : '';
      return ProcCode.includes(searchText) || ProductName.includes(searchText) || ClientName.includes(searchText) || ProdOrderDate.includes(searchText) || ProStockCode.includes(searchText) || ProdIsactive.includes(searchText) || ProductNote.includes(searchText);
    });
    seteData(filteredEvents)
  };
  
  const handleSorter = (pagination, filters, sorter) => {
    // console.log(filters, sorter);
    // seteData({
    //   filteredInfo: filters,
    //   sortedInfo: sorter
    // });
  }

  return (
    <div>
      {productIds != "" ? (
      <>
      {/* <CSVLink filename={"sample-quote.csv"} className="btn ant-btn btn-primary btn-primary--outline" data={proRed(productReducer?.products)}>Export CSV</CSVLink> */}
      <FilterTable
        onInput={e => handleSearche(e.target.value)} className={'pull-right'} 
      />
      <AppTable
        columns={columns}
        dataSource={eData != '' ? eData : proRed(productReducer?.products)}
        loading={isLoading}
        onChange={handleSorter}
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
            />
          );
        })
      ) : (
        <Empty></Empty>
      )} */}
      {/* <Pagination
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

export default SampleQuote;
