import React, { } from 'react'
import PageHeader from '../common/pageHeader';
import { useHistory } from 'react-router-dom';
import { Dropdown, Menu, Tabs } from 'antd';
import { FaCaretDown } from 'react-icons/fa';
import AppButton from '../common/button/button'
import ShipmentTab from './shipping/shipmentTab';
import BillingTab from './billing/billingTab';

const { TabPane } = Tabs;

// const TestComponent = () => {
//   return (
//     <>Compsonent</>
//   )
// }

const InvoiceComponent = () => {
  const history = useHistory();

  const handleMenuClick = (e) => {
    if (e.key == 1) {
      history.push('invoices/shipping/create')
      return
    }
    history.push('invoices/billing/create')
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" >
        Shipping
      </Menu.Item>
      <Menu.Item key="2" >
        Billing
      </Menu.Item>
    </Menu>
  );


  return (
    <div>
      <PageHeader
        title="Invoices"
        primaryButtonComponent={
          <Dropdown overlay={menu} trigger={['click']}>
            <AppButton className="btn-primary">
              Create <FaCaretDown />
            </AppButton>
          </Dropdown>
        }
        hasBreadcrumb

      />


      <Tabs defaultActiveKey="1" >
        <TabPane tab="Shipping" key="1">
          <ShipmentTab />
        </TabPane>
        <TabPane tab="Billing" key="2">
          <BillingTab />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default InvoiceComponent
