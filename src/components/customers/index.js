import React from 'react';
import PageHeader from '../common/pageHeader';
import { useHistory } from 'react-router-dom';
import AppTable from '../common/table/table';
import { useTranslation } from 'react-i18next';
import FilterTable from '../common/filter/newTableFilter';

const CustomerComponent = ({ columns, data, isLoading, searHandle }) => {
  const history = useHistory();
  const { t } = useTranslation();
  
  return (
    <>
      <PageHeader
        title={t('customers')}
        primaryButtonTitle={t('add_new_customer')}
        primaryButtonClick={() => history.push('/customers/create')}
        hasBreadcrumb
      />
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

export default CustomerComponent;