import React, { useState, useEffect } from 'react'
import DepartmentComponent from '../../components/department';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Tag, Space, Popconfirm, Tooltip } from 'antd';
import { FiEdit, FiTrash } from "react-icons/fi";
import { getAllDepartmentApi } from '../../services/departmentService';
import { createUpdateDepartmentApi } from '../../services/departmentService';
import moment from 'moment';

const DepartmentContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const departmentReducer = useSelector(state => state.department)
  const [departmentIds, setDepartmentIds] = useState(departmentReducer?.allDepartmentIds);


  useEffect(() => {
    setDepartmentIds(departmentReducer?.allDepartmentIds)
  }, [departmentReducer?.allDepartmentIds])

  useEffect(() => {
    setIsLoading(true);
    getAllDepartments();
  }, [])

  const getAllDepartments = () => {
    dispatch(getAllDepartmentApi({ page: 1 },
      () => {
        setIsLoading(false)
      }))
  }

  const columns = [
    // {
    //   title: 'Id',
    //   dataIndex: 'DId'
    // },
    {
      title: 'Department Name',
      // dataIndex: 'CompanyName',
      render: (data) => {
        return (
          <div>
            {data?.DepartmentName}
          </div>
        )
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle" className="table-actn-icon" >
          <FiEdit onClick={() => {
            history.push({
              pathname: `./department/edit/${text.DId}`
            })
          }} />
          <Popconfirm
            title="Are you sure？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => { handleDeleteDepartment(text.DId) }}>
            <FiTrash className="icon-delete" />
          </Popconfirm>
        </Space>
      ),
    },

  ]

  const handleDeleteDepartment = (id) => {
    let deleteObj = {
      ...departmentReducer?.departments[id],
      EnteredBy: 4,
      EnteredDate: moment().format(),
      IsActive: false
    }
    dispatch(createUpdateDepartmentApi({
      data: deleteObj,
      finalCallback: () => { },
      successCallback: () => { getAllDepartments() }
    }))
  }

  let data = [];
  departmentIds?.forEach(item => {
    data.push(departmentReducer?.departments[item])
  })

  return (
    <DepartmentComponent
      columns={columns}
      data={data}
    />
  )
}

export default DepartmentContainer
