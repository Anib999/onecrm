import React, { useEffect, useState } from 'react';
import Customer from '../../components/customers'
import { Form, Tag, Space, Popconfirm, Tooltip, Switch, Input, Popover } from 'antd';
import { FiEdit, FiTrash, FiCheckCircle, FiSlash, FiPackage } from "react-icons/fi";
import { useHistory } from 'react-router-dom';
import { getAllCustomerApi } from '../../services/customerService';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCustomerApi } from '../../services/customerService';
import { toggleVerifyAdminModal } from '../../store/slices/configSlice';
import VerifyAdminModal from '../../components/verifyAdmin';

const CustomerContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const customerReducer = useSelector(state => state.customer);
  const [customers, setCustomers] = useState(customerReducer?.customers);
  const [customersId, setCustomersId] = useState(customerReducer?.allCustomersId);
  const [isLoading, setIsLoading] = useState(false);
  // const [issRT, setisSRT] = useState('');
  //new added for checking role
  const profileReducer = useSelector(state => state.profile);
  const isAdmin = profileReducer?.userData?.Role === 1
  //new added for checking role

  //new data
  const [eData, seteData] = useState([]);

  const content = (
    <div>
      <p>View Products</p>
    </div>
  );

  const handleVerifyClick = (forEnable, recod={}) => {
    // message.info('Only admin can change password')
    // setHasAdminAccess(true)
    // setShowAdminModal(true)
    dispatch(toggleVerifyAdminModal({ forEnableUser: forEnable, oData: recod, fromHere: true }))
  }

  const columns = [

    {
      title: 'Code',
      dataIndex: 'cltClientCode',
      // filterDropdown: ({
      //   setSelectedKeys,
      // selectedKeys,
      // confirm,
      // clearFilters
      // }) => (
      //   <Input
      //     placeholder={`Search `}
      //     onChange={e =>
      //       setSelectedKeys(e.target.value ? [e.target.value] : [])
      //     }
      //     onPressEnter={() => handleSearch(selectedKeys, confirm)}
      //     style={{ width: 188, marginBottom: 8, display: "block" }}
      //   />
      // ),    
      // onFilter: (value, record) =>
      // record['cltClientCode']
      //   .toString()
      //   .toLowerCase()
      //   .includes(value.toLowerCase()),
    },
    {
      title: 'Company Name',
      dataIndex: 'cltClientName',
      render: (text, record) => {
        return <span className="cltName" onClick={() => history.push({
          pathname: `/products`,
          search: `?q=${record.cltClientId}`
        })}>{text}</span>
      }
    },
    {
      title: 'Tag',
      dataIndex: 'cltClientTags',
      render: tag => {
        let tags = typeof tag === 'string' ? tag.split(',') : tag
        return (
          <>
            {Array.isArray(tags) &&
              tags?.map(tagItem => {
                return (
                  <Tag key={tagItem}>
                    {tagItem}
                  </Tag>
                );
              })
            }
          </>
        )
      }
    },
    {
      title: 'Note',
      dataIndex: 'cltClientNotes',
      render: (data) => {
        return (
          <Tooltip placement="top" title={data}>
            <span className="note">{data}</span>
          </Tooltip>
        )
      }
    },
    {
      title: 'Bill Type',
      dataIndex: 'BillType',
    },
    {
      title: 'Added Date',
      dataIndex: 'cltAddedDate',
      defaultSortOrder: 'descend',
      sorter: (a, b) => new Date(a.cltAddedDate) - new Date(b.cltAddedDate),
      render: (data) => {
        // console.log(data);
        return data.toString().split('T')[0];
      }
    },
    {
      title: 'Contact Person',
      dataIndex: 'ContactPerson',
    },
    {
      title: 'Active',
      dataIndex: 'cltIsEnabled',
      render: (enabledClt, record, index) => {
        return (
          <>
            <Tag
              className={enabledClt ? 'active-tag' : 'inactive-tag'}
              color={enabledClt ? 'green' : 'red'}
              color='pink'
            >
              {enabledClt ? 'Active' : 'Inactive'}
            </Tag>
          </>
        )
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle" className="table-actn-icon" >
          <Popover content={content}>
            <FiPackage 
            onClick={() => history.push({
              pathname: `/products`,
              search: `?q=${text.cltClientId}`
            })} />
          </Popover>

          <FiEdit onClick={() => history.push({
            pathname: `/customers/edit/${text.cltClientName}/${text.cltClientId}`
          })} />
          {/* <Popconfirm
            title="Are you sure？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => { handleDeleteCustomer(text.cltClientId) }}>
            <FiTrash className="icon-delete" />
          </Popconfirm> */}

          {record?.cltIsEnabled ?
            <Popconfirm
              title="Are you sure you want to disable customer？"
              okText="Yes"
              cancelText="No"
              onConfirm={
                      (data) => handleVerifyClick(!record?.cltIsEnabled, record)
                    }
              >
              <FiSlash className="icon-delete" />
            </Popconfirm>
              :
              <Popconfirm
              title="Are you sure you want to enable customer？"
              okText="Yes"
              cancelText="No"
              onConfirm={
                      (data) => handleVerifyClick(!record?.cltIsEnabled, record)
                    }
              >
              <FiCheckCircle className="icon-delete" />
            </Popconfirm>
            }
        </Space>
      ),
    },
  ];

  // const handleSearch = (selectedKeys, confirm) => {
  //   confirm();
  //   setisSRT(selectedKeys[0]);
  // }

  useEffect(() => {
    // if (customerReducer?.allCustomersId.length === 0) {
    setIsLoading(true);
    getAllCustomer()

    //TODO handle this 
    // }
  }, [])

  useEffect(() => {
    setCustomers(customerReducer?.customers);
    setCustomersId(customerReducer?.allCustomersId)
  }, [customerReducer?.allCustomersId])


  const handleDeleteCustomer = (id) => {
    // console.log('all data', data)
    let deleteObj = {
      ...customers[id],
      cltIsEnabled: false,
    }
    dispatch(deleteCustomerApi(deleteObj,
      () => { }));
  }

  const handleEnableDisableUserSuccess = () => {
    getAllCustomer()
  }

  const getAllCustomer = () => {
    dispatch(getAllCustomerApi({ page: 1 },
      () => {
        setIsLoading(false)
      }))
  }

  let data = [];
  customersId?.forEach(item => {
    data.push(customers[item])
  })

  const handleSearche = searchText => {
    const filteredEvents = data.filter(({ cltClientCode, cltClientName, cltClientTags, cltClientNotes, BillType, ContactPerson }) => {
      searchText = searchText.toLowerCase();
      
      cltClientCode = cltClientCode.toLowerCase();
      cltClientName = cltClientName.toLowerCase();
      cltClientTags = cltClientTags != null ? cltClientTags.toLowerCase() : '';
      cltClientNotes = cltClientNotes != null ? cltClientNotes.toLowerCase() : '';
      BillType = BillType != null ? BillType.toLowerCase() : '';
      ContactPerson = ContactPerson != null ? ContactPerson.toLowerCase() : '';
      return cltClientCode.includes(searchText) || cltClientName.includes(searchText) || cltClientTags.includes(searchText) || cltClientNotes.includes(searchText) || BillType.includes(searchText) || ContactPerson.includes(searchText);
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
    <>
    <Customer
      columns={columns}
      customers={customers}
      data={eData != '' ? eData : data}
      isLoading={isLoading}
      searHandle = {handleSearche}
      onChange={handleSorter}
    />
    <VerifyAdminModal
        userId={0}
        handleSuccess={handleEnableDisableUserSuccess}
      />
    </>
  )
}

export default CustomerContainer;