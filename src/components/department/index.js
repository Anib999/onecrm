import React from 'react'
import PageHeader from '../../components/common/pageHeader';
import AppTable from '../../components/common/table/table';
import { useHistory } from 'react-router-dom';

const DepartmentComponent = (props) => {
  const { columns, data } = props;
  const history = useHistory();
  return (
    <>
      <PageHeader
        title="Department"
        hasBreadcrumb
        primaryButtonTitle="Add New Department"
        primaryButtonClick={() => history.push('./department/create')}
      />
      <AppTable
        columns={columns}
        dataSource={data}
      />
    </>
  )
}

export default DepartmentComponent
