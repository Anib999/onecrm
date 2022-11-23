import React, { useState, useEffect } from 'react';
import PageHeader from '../common/pageHeader';
import { Tabs, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import SampleQuote from './sections/sampleQuote';
import SampleOrder from './sections/sampleOrder';
import ProductOrder from './sections/productOrder';
import Shipment from './sections/shipment';
import FilterComponent from '../common/filter/filter';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { TabPane } = Tabs;
const tabs = {
  "sample-quote": "1",
  "sample-order": "2",
  "product-order": "3",
  "shipment": "4"
}

const ProductComponent = (props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [activeTabKey, setActiveTabKey] = useState("1")
  const { slug } = useParams();
  const productReducer = useSelector(state => state.product)
  
  const [isClientId, setisClientId] = useState(history.location.search.split('?q=')[1]);
  // const clId = history.location.search.split('?q=')[1];

  useEffect(() => {
    setActiveTabKey(tabs[slug])
  }, [slug])

  const setActiveKey = (key) => {
    let slugKey;
    Object.keys(tabs).forEach(tabKey => {
      if (tabs[tabKey] === key) {
        slugKey = tabKey;
      } else if (key === "1") {
        slugKey = 'sample-quote';
      } else {
        slugKey = '';
      }
    })

    history.replace(slugKey ? isClientId ? `/products/${slugKey}?q=${isClientId}` : `/products/${slugKey}` : `/products`)
    
    // if(isClientId != null ){
    //   history.replace(slugKey ? `/products/${slugKey}?q=${isClientId}` : `/products`);
    // }else{
    //   history.replace(slugKey ? `/products/${slugKey}` : `/products`);
    // }
  }

  return (
    <>
      <PageHeader
        title={t('products')}
        primaryButtonTitle={t('add_sample_quote')}
        primaryButtonClick={() => history.push('/product/create')}
        // secondaryButtonTitle="Export CSV"
        // secondaryButtonClick={() => { }}
        csvLinkTitle = "Export CSV"
        hasBreadcrumb
      />

      {/* <FilterComponent
      /> */}

      {/* <Tabs
        activeKey={activeTabKey}
        onChange={(key) => setActiveKey(key)} >
        <TabPane
          tab={<>
            Sample Quote{' '}
            <Tag>{productReducer?.sampleQuoteCount}</Tag>
          </>}
          key="1"
        > */}
          <SampleQuote
            activeTabKey={activeTabKey}
            cliId={isClientId}
          />
        {/* </TabPane>

        <TabPane
          tab={<>
            Sample Order{' '}
            <Tag>{productReducer?.sampleOrderCount}</Tag>
          </>}
          key="2"
        >
          <SampleOrder
            activeTabKey={activeTabKey}
            cliId={isClientId}
          />
        </TabPane>

        <TabPane
          tab={<>
            Product Order{' '}
            <Tag>{productReducer?.productOrderCount}</Tag>
          </>}
          key="3"
        >
          <ProductOrder
            activeTabKey={activeTabKey}
            cliId={isClientId}
          />
        </TabPane> */}

        {/* <TabPane
          tab={<>
            Shipment{' '}
            <Tag>{productReducer?.shipmentCount}</Tag>
          </>}
          key="4"
        >
          <Shipment
            activeTabKey={activeTabKey}
            cliId={isClientId}
          />
        </TabPane> */}
      {/* </Tabs> */}
    </>
  )
}

export default ProductComponent;