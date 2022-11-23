import React from 'react'
import { Tabs } from 'antd';
import DetailSampleQuote from './detailSampleQuote';
import DetailSampleOrder from './detailSampleOrder';
import DetailProductOrder from './detailProductOrder';
import DetailShipment from './detailShipment';
import DetailPricePlanner from './detailPricePlanner';

const { TabPane } = Tabs;

const ProductDetailTabs = (props) => {
  return (
    <div>

      <Tabs defaultActiveKey="1" >
        <TabPane tab="Sample Quote" key="1">
          <DetailSampleQuote {...props} />
        </TabPane>
        <TabPane tab="Sample Order" key="2">
          <DetailSampleOrder {...props} />
        </TabPane>
        <TabPane tab="Product Order" key="3">
          <DetailProductOrder {...props} />
        </TabPane>
        {/* <TabPane tab="Price Planner" key="4">
          <DetailPricePlanner {...props} />
        </TabPane>
        <TabPane tab="Shipment" key="5">
          <DetailShipment {...props} />
        </TabPane> */}
      </Tabs>
    </div>
  )
}

export default ProductDetailTabs
