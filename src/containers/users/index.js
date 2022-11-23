import React, { useState, useEffect } from 'react'
import UsersComponent from '../../components/users';
import { useDispatch, useSelector } from 'react-redux';
import { Space, Popconfirm, Tag, Tooltip } from 'antd';
import { useHistory } from 'react-router-dom';
import { FiEdit, FiTrash, FiCheckCircle } from "react-icons/fi";
import { FiSlash } from 'react-icons/fi';
import { getAllUserApi, createUpdateUserApi } from '../../services/userService';
import VerifyAdminModal from '../../components/verifyAdmin';
import { toggleVerifyAdminModal } from '../../store/slices/configSlice';


const UsersContainer = () => {
  const userReducer = useSelector(state => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const [userIds, setUserIds] = useState([])
  const [userToDisable, setUserToDisable] = useState()

  const columns = [
    {
      title: 'Id',
      dataIndex: 'UId'
    },
    {
      title: 'Username',
      dataIndex: 'UserName'
    },
    {
      title: 'Full Name',
      dataIndex: 'FullName'
    },
    {
      title: 'Email',
      dataIndex: 'UserEmail'
    },
    {
      title: 'Department',
      dataIndex: 'Department'
    },
    {
      title: 'Role',
      dataIndex: 'Role',
      render: role => {
        return (
          <>
            <Tag >
              {role}
            </Tag>
          </>
        )
      }
    },
    {

      title: 'Status',
      dataIndex: 'IsActive',
      render: data => {
        return (
          <>
            <Tag
              className={data ? 'active-tag' : 'inactive-tag'}
              color={data ? 'green' : 'red'}
              color='pink'
            >
              {data ? 'Active' : 'Inactive'}
            </Tag>
          </>
        )
      },
    },
    {
      title: 'Actions',
      key: 'action',
      render: (text) => {
        return (
          <Space size="middle" className="table-actn-icon">
            <Tooltip placement="top" title='Edit User'>
              <FiEdit onClick={() => history.push({
                pathname: `./users/edit/${text.UId}`
              })} />
            </Tooltip>
            {/* <Popconfirm
              title="Are you sure？"
              okText="Yes"
              cancelText="No"
              onConfirm={() => { }}>
              <FiTrash className="icon-delete" />
            </Popconfirm> */}
            {text?.IsActive ?
              <Tooltip placement="top" title='Disable User'>
                <FiSlash
                  className="icon-delete"
                  onClick={() => {
                    setUserToDisable(text?.UId)
                    dispatch(toggleVerifyAdminModal())
                  }} />
              </Tooltip>
              :
              <Tooltip placement="top" title='Enable User'>
                <FiCheckCircle
                  className="icon-delete"
                  onClick={() => {
                    setUserToDisable(text?.UId)
                    dispatch(toggleVerifyAdminModal({ forEnableUser: true }))
                    // handleEnableUser(text?.UId)
                  }} />
              </Tooltip>
            }

          </Space >
        )
      },
    }
  ]


  useEffect(() => {
    setIsLoading(true);
    getAllUsers()
  }, [])

  useEffect(() => {
    setUserIds(userReducer?.allUserIds)
  }, [userReducer?.allUserIds])



  const getAllUsers = () => {
    dispatch(getAllUserApi({ page: 1 },
      () => {
        setIsLoading(false)
      }))
  }

  let data = [];
  userIds?.forEach(item => {
    data.push(userReducer?.users[item])
  })

  const handleDisableUserSuccess = () => {
    getAllUsers()
  }



  return (
    <>
      <UsersComponent
        columns={columns}
        users={data} />
      <VerifyAdminModal
        userId={userToDisable}
        handleSuccess={handleDisableUserSuccess}
      />
    </>
  )
}

export default UsersContainer
