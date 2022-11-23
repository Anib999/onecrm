import React, { useState, useEffect } from 'react';
import Supplier from '../../components/suppliers'
import { FiEdit, FiTrash } from "react-icons/fi";
import { Tag, Space, Popconfirm, Row } from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSupplierApi, getAllSupplierApi } from '../../services/supplierService';

const SupplierContainer = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const supplierReducer = useSelector(state => state.supplier);
  const [supplierId, setSupplierId] = useState(supplierReducer?.allSuppliersId);
  const [isLoading, setIsLoading] = useState(false);

  const [eData, seteData] = useState([]);

  const columns = [

    {
      title: 'Code',
      dataIndex: 'supSupplierCode',
    },
    {
      title: 'Company Name',
      dataIndex: 'supSupplierName',
    },
    {
      title: 'Contact Person',
      dataIndex: '',
      render: (data) => {
        return (
          <>
            <Row>
              <span>
                {data?.ContactPerson}
              </span>
            </Row>
            <Row>
              <span>
                {data?.ContactPersonEmail}
              </span>
            </Row>
            <Row>
              <span>
                {data?.ContactNumber}
              </span>
            </Row >
          </>
        )
      }
    },
    {
      title: 'Tag',
      dataIndex: 'supSupplierTags',
      render: tag => {
        let tags = typeof tag === 'string' ? tag.split(',') : tag
        return (
          <>
            {tags?.map(tag => {
              return (
                <Tag key={tag}>
                  {tag}
                </Tag>
              );
            })}
          </>
        )
      },
    },
    {
      title: 'Note',
      dataIndex: 'supSupplierNotes',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        return (
          <Space size="middle" className="table-actn-icon">
            <FiEdit onClick={() => history.push({
              pathname: `/suppliers/edit/${text.supSupplierName}/${text.supSupplierId}`
              // ,
            })} />
            <Popconfirm
              title="Are you sure？"
              okText="Yes"
              cancelText="No"
              onConfirm={() => { handleDeleteSupplier(text.supSupplierId) }}>
              <FiTrash className="icon-delete" />
            </Popconfirm>
          </Space >
        )
      },
    },
  ];


  useEffect(() => {
    // if (supplierReducer?.allSuppliersId.length === 0) {
    setIsLoading(true)
    getAllSupplier();
    // }
  }, [])

  const getAllSupplier = () => {
    dispatch(getAllSupplierApi({ page: 1 },
      () => { setIsLoading(false) }))
  }

  const handleDeleteSupplier = (id) => {
    let deleteObj = {
      ...supplierReducer?.suppliers[id],
      supSupplierEnabled: false,
    }
    console.log('handleDeleteSupplier', deleteObj);
    dispatch(deleteSupplierApi(deleteObj,
      () => { }));
  }

  useEffect(() => {
    setSupplierId(supplierReducer?.allSuppliersId)
  }, [supplierReducer?.allSuppliersId])

  let data = [];
  supplierId.forEach(item => {
    data.push(supplierReducer?.suppliers[item])
  })

  const handleSearche = searchText => {
    const filteredEvents = data.filter(({ supSupplierCode, supSupplierName, ContactPerson, ContactPersonEmail, ContactNumber, supSupplierTags, supSupplierNotes }) => {
      searchText = searchText.toLowerCase();
      supSupplierCode = supSupplierCode.toLowerCase();
      supSupplierName = supSupplierName.toLowerCase();
      ContactPerson = ContactPerson != null ? ContactPerson.toLowerCase() : '';
      ContactPersonEmail = ContactPersonEmail != null ? ContactPersonEmail.toLowerCase() : '';
      ContactNumber = ContactNumber != null ? ContactNumber.toLowerCase() : '';
      supSupplierTags = supSupplierTags != null ? supSupplierTags.toLowerCase() : '';
      supSupplierNotes = supSupplierNotes != null ? supSupplierNotes.toLowerCase() : '';
      return supSupplierCode.includes(searchText) || supSupplierName.includes(searchText) || ContactPerson.includes(searchText) || ContactPersonEmail.includes(searchText) || ContactNumber.includes(searchText) || supSupplierTags.includes(searchText) || supSupplierNotes.includes(searchText);
    });
    seteData(filteredEvents)
  };

  return (
    <Supplier
      columns={columns}
      data={eData != '' ? eData : data}
      isLoading={isLoading}
      searHandle = {handleSearche}
    />
  )
}

export default SupplierContainer;