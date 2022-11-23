import React from 'react';
import PageHeader from '../common/pageHeader';
import { useTranslation } from 'react-i18next';
import StatCard from '../common/card/statCard';
import { dashboardStats } from '../../mock/dashboard';
import { FiPlusCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import AppButton from '../common/button/button';
import { useHistory } from 'react-router-dom';

const DashboardComponent = (props) => {
  const { t } = useTranslation();
  const history = useHistory()

  return (
    <>
      <PageHeader
        title={t('dashboard')}
        primaryButtonTitle={t('create_new')}
        primaryButtonClick={() => { }}
        primaryButtonMore
        primaryButtonMoreClick={() => { }}
      // secondaryButtonTitle="Export CSV"
      />

      <div className="top-buttons-section">
        <AppButton>This Week</AppButton>
        <AppButton>This Month</AppButton>
        <AppButton>Last 3 Months</AppButton>
        <AppButton>All Time</AppButton>
      </div>

      <div className="stats">
        <StatCard
          title="Sample Quote"
          value={dashboardStats?.sampleQuote}

        />
        <StatCard
          title="Sample Order"
          value={dashboardStats?.sampleQuote}
        />
        <StatCard
          title="Product Order"
          value={dashboardStats?.sampleQuote}
        />
        <StatCard
          title="Shipped"
          value={dashboardStats?.sampleQuote}
        />
        <StatCard onClick={() => {
          // console.log('create sample quote pressed')
          history.push('/product/create')
        }}>
          <FiPlusCircle />
          <span className="children__title">Create Sample Quote</span>
        </StatCard>
      </div>

      <div className="body-section">
        <div className="things-you-can-do">
          <h3>Things You Can Do</h3>
          <Link to={{ pathname: "/product/create" }}>Add a Sample Quote</Link>
          <Link to={{ pathname: "/customers/create" }}> Add a Customer</Link>
          <Link to={{ pathname: "/suppliers/create" }}>Add a Supplier</Link>
          <Link>Create an Invoice</Link>
        </div>

      </div>
    </>
  )
}

export default DashboardComponent;