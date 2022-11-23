import React from 'react'
import PageHeader from '../../components/common/pageHeader';
import AppTable from '../../components/common/table/table';
import { useHistory } from 'react-router-dom';

const CompanyComponent = (props) => {
  const { company, columns, data } = props;
  const history = useHistory();
  // console.log(data.length);
  return (
    <>
      {data.length < 1 ?
        <PageHeader
          title="Company"
          hasBreadcrumb
          primaryButtonTitle="Add New Company"
          primaryButtonClick={() => { history.push('./company/create') }}
        // secondaryButtonTitle="Add New Department"
        // secondaryButtonClick={() => { }}
        />
        :
        <PageHeader
          title="Company"
          hasBreadcrumb
        />
      }
      <AppTable
        columns={columns}
        dataSource={data}
      />
    </>
  )
}

export default CompanyComponent
