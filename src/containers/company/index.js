import React, { useState, useEffect } from 'react'
import CompanyComponent from '../../components/company';
import { Tag, Space, Popconfirm, Tooltip } from 'antd';
import { FiEdit, FiTrash } from "react-icons/fi";
import { useHistory } from 'react-router-dom';
import { getAllCompanyApi } from '../../services/companyService';
import { useDispatch, useSelector } from 'react-redux';


const CompanyScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [companyId, setCompanyId] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const companyReducer = useSelector(state => state.company);

  const columns = [
    // {
    //   title: 'Id',
    //   dataIndex: 'CId'
    // },
    {
      title: 'Company Name',
      // dataIndex: 'CompanyName',
      render: (data) => {
        return (
          <div>
            {data?.CompanyName}<br />
            {data?.ComapanyAddress}<br />
            {data?.CompanyAddress2}
          </div>
        )
      }
    },
    {
      title: 'Contact',
      render: (data) => {
        return (
          <div>
            {data?.CompanyContact}<br />
            {data?.CompanyEmail}
          </div>
        )
      }
    },
    {
      title: 'Reg. No.',
      dataIndex: 'CompanyRegNo'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle" className="table-actn-icon" >
          <FiEdit onClick={() => history.push({
            pathname: `./company/edit/${text.CId}`
          })} />
          {/* <Popconfirm
            title="Are you sure？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => { handleDeleteCompany(text.CId) }}>
            <FiTrash className="icon-delete" />
          </Popconfirm> */}
        </Space>
      ),
    },
  ]

  useEffect(() => {
    setCompanyId(companyReducer?.allCompanyId)
  }, [companyReducer?.allCompanyId])

  useEffect(() => {
    setIsLoading(true);
    getAllCompany()
  }, [])

  const handleDeleteCompany = () => {

  }

  const getAllCompany = () => {
    dispatch(getAllCompanyApi({ page: 1 },
      () => {
        setIsLoading(false)
      }))
  }

  let data = [];
  companyId?.forEach(item => {
    data.push(companyReducer?.company[item])
  })


  return (
    <CompanyComponent
      columns={columns}
      data={data}
      isLoading={isLoading}
    />
  )
}

export default CompanyScreen
