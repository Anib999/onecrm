import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import AppTable from '../../common/table/table';
import { fetchProductApi } from '../../../services/billShipmentService';
import AppSpinner from "../../common/spinner";
import { useHistory } from 'react-router-dom';
import { FiEye } from "react-icons/fi";
import { Pagination, Empty, Tag, Space } from "antd";
import FilterTable from '../../common/filter/newTableFilter';

const ShipmentTab = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [newData, setNewData] = useState([]);
  const [filData, setFilData] = useState([]);

  const fProd = () => {
    dispatch(fetchProductApi(0, (response) => {
      setNewData(response)
      setLoading(false);
    }, () => { }));
  }

  useEffect(() => {
    if (newData.length === 0) {
      setLoading(true);
      fProd()
    }
  }, [])

  const columns = [
    {
      title: 'Shipment Id',
      dataIndex: 'ShipId',
    },
    {
      title: 'Client Name',
      dataIndex: 'ClientName',
    },
    {
      title: 'Sub Total',
      dataIndex: 'SubTotal',
    },
    // {
    //   title: 'Discount',
    //   dataIndex: 'Discount',
    // },
    // {
    //   title: 'Tax',
    //   dataIndex: 'Tax',
    // },
    {
      title: 'Total Cost',
      dataIndex: 'TotalCost',
    },
    {
      title: 'Ship Status',
      dataIndex: 'ShipStatus',
      render: (data) => {
        return (
          <Tag
            className={data == 2 ? 'active-tag' : ''}
            color={data == 2 ? 'green' : ''}
          // color='pink'
          >
            {data == 2 ? 'Published' : 'Saved'}
          </Tag>
        )
      }
    },
    {
      title: 'Note',
      dataIndex: 'Note',
    },
    {
      title: 'Action',
      dataIndex: '',
      render: (data) => {
        return (
          <Space size="middle" className="table-actn-icon">
            <FiEye onClick={() => history.push({
              pathname: `/invoices/shipping/edit/${data?.ShipId}`
            })} />
          </Space>
        );
      }
    }
  ]

  if (isLoading) {
    return <AppSpinner />;
  }

  const handleSearche = searchText => {
    // let data = newData;
    // const filteredEvents = data.filter(data => {
    //   searchText = searchText.toLowerCase();
    //   let ClientName = data.ClientName != null ? data.ClientName.toLowerCase() : '';
    //   let SubTotal = data.SubTotal != null ? data.SubTotal : '';
    //   let TotalCost = data.TotalCost != null ? data.TotalCost : '';
    //   let Note = data.Note != null ? data.Note.toLowerCase() : '';
    //   return ClientName.includes(searchText) || SubTotal.includes(searchText) || TotalCost.includes(searchText) || Note.includes(searchText);
    // });
    // setFilData(filteredEvents)
  };

  return (
    <>
      {newData.length !== 0 ?
        (
          <>
            {/* <FilterTable
              onInput={e => handleSearche(e.target.value)} className={'pull-right'}
            /> */}
            <AppTable
              columns={columns}
              dataSource={filData.length !== 0 ? filData : newData}
              loading={isLoading}
            />
          </>
        )
        :
        (<Empty></Empty>)
      }
    </>

  )


}

export default ShipmentTab