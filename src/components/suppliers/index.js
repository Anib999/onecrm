import React from 'react';
import PageHeader from '../common/pageHeader';
import { useHistory } from 'react-router-dom';
import AppTable from '../common/table/table';
import { useTranslation } from 'react-i18next';
import FilterTable from '../common/filter/newTableFilter';
import { CSVLink } from "react-csv";

const SupplierComponent = ({ columns, data, isLoading, searHandle }) => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <>
      <PageHeader
        title={t('suppliers')}
        primaryButtonTitle={t('create_new_supplier')}
        primaryButtonClick={() => history.push('/suppliers/create')}
        hasBreadcrumb
      />
      <CSVLink filename={"suppliers.csv"} className="btn ant-btn btn-primary btn-primary--outline" data={data}>Export CSV</CSVLink>
      <FilterTable
        onInput={e => searHandle(e.target.value)} className={'pull-right'} 
      />
      <AppTable
        columns={columns}
        dataSource={data}
        loading={isLoading}
      />
    </>
  )
}

export default SupplierComponent;