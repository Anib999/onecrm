import React, { useEffect, useState } from 'react'
import PageHeader from '../common/pageHeader';
import { Steps, Col, Row, Tag } from 'antd';
import ProductDetailTabs from './sections/detailTabs';
import moment from 'moment'
import { useHistory } from 'react-router-dom';
import { insertSpace } from '../../utils/helpers';
import { StatusList } from '../../constants/statusList';

import { Form, Input, Select, DatePicker, InputNumber } from 'antd';

const { Step } = Steps;

const { Option } = Select,
  { TextArea } = Input;


const ProductDetailComponent = (props) => {
  const { data, productId } = props;
  const history = useHistory();
  const [timlineBreak, setTimelineBreak] = useState(0)
  const [activity, setActivity] = useState({
    'Supplier Assigned': data?.activityLog?.MultipleSupplierAssigned,
    'Quote Received': data?.activityLog?.QuotationReceived,
    'Sample Ordered': data?.activityLog?.SampleOrdered,
    'Sample Delivered': data?.activityLog?.SampleDelivered,
    'Product Ordered': data?.activityLog?.ProductOrdered,
    'Product Received': data?.activityLog?.ProductReceived,
    'Shipment': data?.activityLog?.Shipment
  });

  useEffect(() => {
    mapActivity(data)
  }, [])
  const details = [
    { title: 'Product Name', value: data?.ProductName },
    { title: 'Product Code', value: data?.ProcCode },
    { title: 'Product Stock Code', value: data?.ProStockCode },
    { title: 'Customer Name', value: data?.ClientName }, //ClientId
    { title: 'Offer Date', value: moment(data?.ProdOrderDate).format('L') },
    { title: 'Estimate Difficulty', value: data?.ProductDifficultyLevel },
    { title: 'Product Variant head', value: data?.ProductvariantHeadId },
    { title: 'Product Manager', value: data?.ProductManager },
    { title: 'Sales Representative', value: data?.SalesRepresentative },
    { title: 'Tag', value: typeof data?.ProductTags === 'string' ? data?.ProductTags?.split(',') : data?.ProductTags },
    { title: 'Sample Delivery Note', value: data?.ProductNote },
    { title: 'Remarks', value: data?.ProductRemarks },
  ]

  // let isEmptyAt = 0;

  // useEffect(() => {
  //   if (data?.activityLog) {
  //     let activity = data?.activityLog
  //     for (let i = 0; i < Object.keys(data?.activityLog).length; i++) {
  //       if (activity[Object.keys(activity)[i]] === null) {
  //         let isEmptyAt = i;
  //         console.log('isEmpty at', isEmptyAt);
  //         break;
  //       }
  //     }
  //   }
  // }, [data?.activityLog])

  // let newAct = {
  //   'Supplier Assigned': data?.activityLog?.MultipleSupplierAssigned,
  //   'Quote Received': data?.activityLog?.QuotationReceived,
  //   'Sample Ordered': data?.activityLog?.SampleOrdered,
  //   'Sample Delivered': data?.activityLog?.SampleDelivered,
  //   'Product Ordered': data?.activityLog?.ProductOrdered,
  //   'Product Received': data?.activityLog?.ProductReceived,
  //   'Shipment': data?.activityLog?.Shipment
  // }

  const mapActivity = (data) => {
    setActivity({
      'Supplier Assigned': data?.activityLog?.MultipleSupplierAssigned,
      'Quote Received': data?.activityLog?.QuotationReceived,
      'Sample Ordered': data?.activityLog?.SampleOrdered,
      'Sample Delivered': data?.activityLog?.SampleDelivered,
      'Product Ordered': data?.activityLog?.ProductOrdered,
      'Product Received': data?.activityLog?.ProductReceived,
      'Shipment': data?.activityLog?.Shipment
    })
  }
  useEffect(() => {
    // let isEmptyAt = 0;
    mapActivity(data)
  }, [data?.activityLog])

  useEffect(() => {
    for (let i = 0; i < Object.keys(activity).length; i++) {
      if (activity[Object.keys(activity)[i]] === null) {
        // let isEmptyAt = i;
        // console.log('isEmpty at', isEmptyAt);
        setTimelineBreak(i - 1)
        break;
      }
    }
  }, [activity])

  return (
    <div>
      <PageHeader
        title={data?.ProductName}
        primaryButtonTitle='Edit Sample Quote'
        primaryButtonClick={() => { history.push(`./edit/${productId}`) }}
        // secondaryButtonTitle="Invoice"
        // secondaryButtonClick={() => history.push(`./invoice/shipping`)}
        hasBreadcrumb
      />

      {/* <div className="header">
        <Steps
          current={timlineBreak}
          // progressDot={true}
          className="stepper"
          labelPlacement="vertical"> */}
      {/* {data?.activityLog && Object.keys(data?.activityLog).map(actKey => {
            return (
              <Step title={actKey} description={newLog[actKey] ? moment(newLog[actKey]).format('MMMM Do YYYY, h:mm:ss a') : 'N/A'} />
            )
          })} */}
      {/* {activity && Object.keys(activity).map(actKey => {
            return (
              <Step title={actKey} description={activity[actKey] ? moment(activity[actKey]).format('MMMM Do YYYY') : 'N/A'} />
            )
          })}
        </Steps>
      </div> */}

      <div className="detail-body">
        <Row>
          <Col span={14} className="container">
            <div className="detail-body--content">
              {details?.map(item => {
                return (
                  <>
                    {item.value !== 0 &&
                      <div className="list-item">
                        <Col span={24}>
                          <Row justify="space-between">
                            <Col span={10}>
                              <span className="list-item--title">{item?.title}</span>
                            </Col>
                            <Col span={14}>
                              {item?.title === 'Tag' ? item?.value?.map(tagItem => (
                                <Tag>{tagItem}</Tag>
                              ))
                                :
                                <span className="list-item--value">{item?.value}</span>

                              }
                            </Col>
                          </Row>
                        </Col>
                      </div>
                    }
                  </>
                )
              })
              }
              <Form.Item
                name="Status"
                label="Status"
              >
                <div className="list-item">
                  <Col span={24}>
                    <Row justify="space-between">
                      <Col span={10}></Col>
                      <Col span={14}>
                        <Select
                          placeholder="Status"
                          allowClear
                        >
                          <Option value="Pending">
                            Pending
                          </Option>
                          <Option value="Pending Sample">
                            Pending Sample
                          </Option>
                          <Option value="Quote Received">
                            Quote Received
                          </Option>

                        </Select>
                      </Col>
                    </Row>
                  </Col>
                </div>
              </Form.Item>
            </div>
          </Col>
          {/* <Col span={10} className="container">
            <div className="detail-body--content right-content">
              <h3>Activity Log</h3>
              <span>List contains actions taken during lifecycle of this</span>
              <div className="activity-list">
                {data?.activityLog && Object.keys(data?.activityLog).map(actKey => {

                  return (
                    <>
                      {data?.activityLog[actKey] &&
                        <div className="list-item">
                          <span className="list-item--title">{insertSpace(actKey)}</span>
                          <span className="list-item--value">{data?.activityLog[actKey] ? moment(data?.activityLog[actKey]).format('MMMM Do YYYY') : 'N/A'}</span>
                        </div>
                      }
                    </>
                  )
                })}
              </div>
            </div>
          </Col> */}
        </Row>
      </div>

      <ProductDetailTabs {...props} />

    </div>
  )
}

export default ProductDetailComponent
