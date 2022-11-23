import React from 'react'
import PageHeader from '../../components/common/pageHeader';
import { useHistory } from 'react-router-dom';
import AppTable from '../../components/common/table/table';

const UsersComponent = (props) => {
  const { users, columns } = props;
  const history = useHistory();

  return (
    <>
      <PageHeader
        title="Users"
        hasBreadcrumb
        primaryButtonTitle="Add New user"
        primaryButtonClick={() => { history.push('./users/create') }}
      />
      <AppTable
        columns={columns}
        dataSource={users}
      />
    </>
  )
}

export default UsersComponent
