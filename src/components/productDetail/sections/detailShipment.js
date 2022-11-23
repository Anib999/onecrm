import React from 'react'
import AppTable from '../../common/table/table';
import FilterComponent from '../../common/filter/filter';
import ActionButton from '../../common/button/productActionButton';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
const columns = [
  {
    title: 'Date',
    dataIndex: 'created_at'
  },
  {
    title: 'Supplier',
    dataIndex: 'supplier'
  },
  {
    title: 'Shipping Company',
    dataIndex: 'shipper'
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity'
  },
  {
    title: 'Delivery Location',
    dataIndex: 'location'
  },
  {
    title: 'ETA',
    dataIndex: 'eta'
  },
  {
    title: 'Status',
    dataIndex: 'status'
  },
  {
    title: 'Note',
    dataIndex: 'note'
  },
  {
    title: 'Actions',
    dataIndex: '',
    render: (data) => {
      return (
        <ActionButton
          actions={actions}
          menu={menu}
          data={data}
        />
      )
    }
  }
]

const actions = {
  'pending': {
    displayName: 'Update Status'
  },
  'request': {
    displayName: 'Update'
  },
  'received': {
    displayName: 'Dispatched'
  }
}

const menu = (
  <Menu>
    <Menu.Item key="0">
      <Link>1st menu item</Link>
    </Menu.Item>
    <Menu.Item key="1">
      <Link>2nd menu item</Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
);


const data = [
  {
    id: 1,
    supplier: 'Mainland Co. Ltd.',
    status: 'pending',
    quantity: 5000,
    created_at: '2021-03-01',
    location: 'Kyoto',
    eta: '2021-04-02',
    shipper: 'ABC Shippment company',
    note: 'It takes two weeks to make a sample. It\'s $ 10.',
  },
  {
    id: 2,
    supplier: 'Taiwan Co.LTD',
    status: 'pending',
    quantity: 600,
    created_at: '2021-02-02',
    location: 'Tokyo',
    eta: '2021-04-02',
    shipper: 'ABC Shippment company',
    note: '$10 ( Estimate Time : 5 days )'
  },
  {
    id: 3,
    supplier: 'Kawasaki Frontale',
    status: 'received',
    quantity: 1000,
    created_at: '2021-01-02',
    location: 'Sapporo',
    eta: '2021-04-02',
    shipper: 'ABC Shippment company',
    note: 'Not able to take manufacture this product'
  },

  {
    id: 4,
    supplier: 'H & M Co., Ltd. Okachimachi',
    status: 'pending',
    quantity: 1500,
    location: 'Hiroshima',
    eta: '2021-04-02',
    shipper: 'ABC Shippment company',
    created_at: '2021-03-02',
    note: ''
  },
]

const DetailShipment = () => {
  return (
    <div>
      <FilterComponent />
      <AppTable
        columns={columns}
        dataSource={data}
      />
    </div>
  )
}

export default DetailShipment
