import React from 'react'
import { Card, Row, Col, Descriptions, Input } from 'antd';
import AppTable from '../../common/table/table';

const { TextArea } = Input;

const columns = [
  {
    title: 'ProductName',
    dataIndex: ''
  },
  {
    title: 'Color',
    dataIndex: '',
  },
  {
    title: 'Quantity',
    dataIndex: ''
  },
  {
    title: 'Remarks',
    dataIndex: ''
  }
]

const data = [

]

const ShippingComponent = () => {
  return (
    <div className="shipping-statement">
      <Row>
        <Col span={18}>
          <Card>
            <div className="title">
              <h2>Shipping Statement</h2>
            </div>
            <Card className="customer-info">
              <h2>Abc Company Ltd.</h2>
              <span>Person Incharge: John Doe</span>
              <Descriptions
                // title="Billing Address"
                column={1}
              >
                <Descriptions.Item label="Billing Date">2021-02-02</Descriptions.Item>
                <Descriptions.Item label="Shipping Date">2021-03-05</Descriptions.Item>
              </Descriptions>
            </Card>

            <Row gutter={20}>
              <Col span={12}>
                <Card>
                  <Descriptions
                    title="Billing Address"
                    column={1}
                  >
                    <Descriptions.Item label="Address Name">Old Road street</Descriptions.Item>
                    <Descriptions.Item label="Contact Person">John Doe</Descriptions.Item>
                    <Descriptions.Item label="Prefecture">Prefecture 1</Descriptions.Item>
                    <Descriptions.Item label="City">Tokyo Central</Descriptions.Item>
                    <Descriptions.Item label="Address 1">
                      No. 18, Wantang Road, Xihu District
                  </Descriptions.Item>
                    <Descriptions.Item label="Address 2">
                      No. 18, Wantang Road, Xihu District
                  </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Descriptions
                    title="Shipping Address"
                    column={1}
                  >
                    <Descriptions.Item label="Address Name">Old Road street</Descriptions.Item>
                    <Descriptions.Item label="Contact Person">John Doe</Descriptions.Item>
                    <Descriptions.Item label="Prefecture">Prefecture 1</Descriptions.Item>
                    <Descriptions.Item label="City">Tokyo Central</Descriptions.Item>
                    <Descriptions.Item label="Address 1">
                      No. 18, Wantang Road, Xihu District
                  </Descriptions.Item>
                    <Descriptions.Item label="Address 2">
                      No. 18, Wantang Road, Xihu District
                  </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <AppTable
                  columns={columns}
                  dataSource={data}
                  footer={() =>
                    <div className="footer">
                      <span>Total Quantity</span>
                    </div>
                  }
                />
              </Col>
            </Row>
            <Row>
              <Card className="mt-20">
                <Descriptions
                  // title="Shipping Address"
                  column={1}
                >
                  <Descriptions.Item label="Comments"><TextArea /></Descriptions.Item>
                </Descriptions>
              </Card>
            </Row>
          </Card>
        </Col>

      </Row>
    </div>
  )
}

export default ShippingComponent
