
import React from 'react'
import PageHeader from '../../common/pageHeader';
import { Row, Col, Form, Select, Card, InputNumber, Input, DatePicker, Descriptions } from 'antd';
import ProductsCalulationTable from '../productsTable';
import AppButton from '../../common/button/button';

const { Option } = Select;

const BillingInvoiceComponent = () => {
  const [form] = Form.useForm();

  return (
    <div className='invoice-form billing-invoice'>
      <PageHeader
        hasBreadcrumb
        title="New Billing Invoice"
        primaryButtonTitle="Save"
        primaryButtonClick={() => { }}
        secondaryButtonTitle="Print"
        secondaryButtonClick={() => { }}
      />
      <Card>
        <Row>
          <Col span={8}>
            <Row>
              <div className="billing-info">
                <Descriptions
                  // title="Info"
                  bordered
                  layout="horizontal"
                  column={1}
                  size="small"
                >
                  <Descriptions.Item label="Issue Date">
                    <DatePicker />
                  </Descriptions.Item>
                  <Descriptions.Item label="Total Billed Amount">
                    <InputNumber />
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </Row>
          </Col>
          <Col span={8} className="invoice-title-container">
            {/* <h1>Billing Invoice</h1> */}
          </Col>
          <Col span={8} className="invoice-info">
            <Row justify="end">
              <Descriptions
                // title="Info"
                bordered
                layout="horizontal"
                column={1}
                size="small"
              >
                <Descriptions.Item label="Invoice Number">
                  <InputNumber size="small" />
                </Descriptions.Item>
                <Descriptions.Item label="Representative">
                  <Input size="small" />
                </Descriptions.Item>
              </Descriptions>
            </Row>
          </Col>
        </Row>

        <div className="customer-container">

          <div className="customer-container-info">
            <Row gutter={50}>
              <Col span={12}>
                <Descriptions
                  // title="Billing Info"
                  bordered
                  // layout="horizontal"
                  column={1}
                  size="small"
                >
                  <Descriptions.Item label="Delivery Date">
                    <DatePicker />
                  </Descriptions.Item>
                  <Descriptions.Item label="Customer Company">
                    <Input />
                  </Descriptions.Item>
                  <Descriptions.Item label="Delivery Location">
                    <Input />
                  </Descriptions.Item>
                </Descriptions>
              </Col>
              <Col span={12}>
                <Descriptions
                  // title="Billing Info"
                  bordered
                  // layout="horizontal"
                  column={1}
                  size="small"
                >
                  <Descriptions.Item label="Payment Terms"><InputNumber /></Descriptions.Item>
                  <Descriptions.Item label="Contact"><InputNumber /></Descriptions.Item>
                  <Descriptions.Item label="Fax"><InputNumber /></Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </div>
          <Col span={12}>
          </Col>
        </div>

        <Row>
          <Col span={24}>
            <ProductsCalulationTable
            custId={[]}
            prodLis={[]}
            calLis={[]}
            productLister={[]}
            productTableList={[]}
            isPublished={[]}
            noter={[]}
            />

            <Card className="bank-info">
              <Col span={12}>
                <Descriptions
                  title="Bank Information"
                  bordered
                  layout="horizontal"
                  column={1}
                  size="small"
                >
                  <Descriptions.Item label="Bank Name">
                    <InputNumber />
                  </Descriptions.Item>
                  <Descriptions.Item label="Account Type">
                    <Select
                      placeholder="Account type"
                      defaultActiveFirstOption
                      // onChange={onGenderChange}
                      allowClear
                    >
                      <Option value="Hong Kong">Hong Kong</Option>
                      <Option value="Taiwan">Taiwan</Option>
                    </Select>
                  </Descriptions.Item>
                  <Descriptions.Item label="Account Holder"> <Input /></Descriptions.Item>
                </Descriptions>
              </Col>
            </Card>
          </Col>
        </Row>
      </Card>

    </div>
  )
}

export default BillingInvoiceComponent
