import React, { useEffect, useState } from 'react';
import PageHeader from '../common/pageHeader';
import { Form, Input, Select, Col, DatePicker, Divider } from 'antd';
import AppButton from '../common/button/button';
import AppSwitch from '../common/switch';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 16 }
  },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 24 },
};

const layout = {
  offset: 0, span: 17
}

const CreateSampleQuoteComponent = (props) => {
  const { handleFinish, forEdit, previousValues, difficultyLevel, statusList, customers, productList, allUsers } = props
  const [form] = Form.useForm();
  const [hasVariant, setHasVariant] = useState(false);

  const onFinish = (values) => {
    handleFinish(values)
  }


  let prevVal = {
    ...previousValues,
    ProductTags: typeof previousValues?.ProductTags === 'string' ? previousValues?.ProductTags?.split(',') : previousValues?.ProductTags,
    ProdOrderDate: moment(previousValues?.ProdOrderDate)
  }

  // console.log('prevVal', prevVal)


  useEffect(() => {
    form.setFieldsValue(prevVal);
    // form.setFieldsValue({
    //   IsProductVariant: prevVal?.IsProductVariant
    // })
    // console.log('ppp', prevVal?.IsProductVariant)
    setHasVariant(prevVal?.IsProductVariant)
  }, [previousValues])

  return (
    <div className="create-product-container">
      <PageHeader
        title={`${forEdit ? 'Edit' : 'Create'} Sample Quote`}
        hasBreadcrumb
        description="Products and services that you buy from vendors are used as items on Bills to record those purchases, and the ones that you sell to customers are used as items on Invoices to record those sales."
      />
      <div className="description">
        <span className="">
          Products and services that you buy from vendors are used as items on Bills to record those purchases, and the ones that you sell to customers are used as items on Invoices to record those sales.
      </span>
      </div>

      <Col {...layout} justify="start" >

        <Form
          {...formItemLayout}
          labelAlign="left"
          colon={false}
          onFinish={onFinish}
          form={form}
          name="control-hooks"
          initialValues={prevVal}
        >

          <Form.Item
            name="ProcCode"
            label="Product Code"
            rules={[{ required: true }]}>
            <Input placeholder="Product Code" />
          </Form.Item>

          <Form.Item
            name="ProStockCode"
            label="Product Stock Code"
          // rules={[{ required: true }]}
          >
            <Input placeholder="Product Stock Code" />
          </Form.Item>

          <Form.Item
            name="ProductName"
            label="Product Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="ClientId"
            label="Customer Name"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select Client"
              allowClear
              size="large"
              showSearch
              optionFilterProp="children"
            >
              {customers?.map((cust, custIndex) => {
                return (
                  <Option value={cust?.cltClientId}>{cust?.cltClientName}</Option>
                )
              })}
            </Select>
          </Form.Item>

          <Form.Item
            name="ProductDifficultyLevel"
            label="Product Difficulty Level"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select Difficulty Level"
              allowClear
              size="large"
            >
              {difficultyLevel.map((difficulty, difficultyIndex) => {
                return (
                  <Option value={difficulty?.DId} key={difficulty?.DId.toString()}>{difficulty?.DifficultLevel}</Option>
                )
              })}
            </Select>
            {/* <Slider min={1} max={5} /> */}
            {/* <Input placeholder="Estimated Difficulty level" /> */}
          </Form.Item>

          {/* <Form.Item name="offer_date" label="Offer Date" >
            <DatePicker size="small" />
          </Form.Item> */}
          {!forEdit &&
            <Form.Item
              name="ProductStatus"
              label="Product Status"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select Status"
                allowClear
                size="large"
              >
                {statusList.map((status, statusIndex) => {
                  return (
                    <Option value={status?.SId} key={status?.SId.toString()}>{status?.SampleStatus}</Option>
                  )
                })}
              </Select>
            </Form.Item>
          }

          {/* <Form.Item name="estimated_part_number" label="Estimated Part Number" >
            <Input />
          </Form.Item>
          <Form.Item name="product_part_number" label="Product Part Number" >
            <Input />
          </Form.Item> */}
          {/* <Form.Item name="progress" label="Progress" >
            <Select
              placeholder=""
              allowClear
              size="large"
            >
              <Option value="draft">draft</Option>
              <Option value="pending">pending</Option>
              <Option value="finished">finished</Option>
            </Select>
          </Form.Item> */}

          <Form.Item
            name="ProductRemarks"
            label="Product Remarks"
          // rules={[{ required: true }]}
          >
            <TextArea placeholder="Remarks" />
          </Form.Item>

          <Form.Item
            name="ProductTags"
            label="Tag"
          // rules={[{ required: true }]}
          >
            <Select
              placeholder="Enter/Select tags"
              mode="multiple"
              mode="tags"
              // onChange={onGenderChange}
              allowClear
              size="large"
            >
              <Option value="china">china</Option>
              <Option value="phone cover">phone cover</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="ProductNote"
            label="Product Note"
          // rules={[{ required: true }]}
          >
            <TextArea placeholder="Note" />
          </Form.Item>

          <Form.Item
            name="ProductManager"
            label="Product Manager"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Product Manager"
              allowClear
              size="large"
              showSearch
              optionFilterProp="children"
            >
              {allUsers?.map((cust, custIndex) => {
                return (
                  <Option value={cust?.name}>{cust?.name}</Option>
                )
              })}
            </Select>
            {/* <Input placeholder="Product Manager" /> */}
          </Form.Item>

          <Form.Item
            name="SalesRepresentative"
            label="Sales Representative"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Sales Representative"
              allowClear
              size="large"
              showSearch
              optionFilterProp="children"
            >
              {allUsers?.map((cust, custIndex) => {
                return (
                  <Option value={cust?.name}>{cust?.name}</Option>
                )
              })}
            </Select>
            {/* <Input placeholder="Sales Representative" /> */}
          </Form.Item>

          {/* <Form.Item
            name="IsProductVariant"
            label="Variant"

            initialValue={prevVal?.IsProductVariant}
            valuePropName="checked"
            getValueProps={(val) => setHasVariant(val)}
          >
            <AppSwitch value={hasVariant} />
          </Form.Item>

          {hasVariant &&
            <Form.Item
              name="ProductvariantHeadId"
              label="Product Variant Head"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select Product Variant"
                allowClear
                size="large"
                showSearch
                optionFilterProp="children"
              >
                {productList?.map((prod, prodIndex) => {
                  return (
                    <Option value={prod?.PId}>{prod?.ProductName}</Option>
                  )
                })}
              </Select>
            </Form.Item>
          } */}


          <Form.Item
            name="ProdOrderDate"
            label="Order Date"
            rules={[{ required: true }]}
          >
            <DatePicker size="small" />
          </Form.Item>
          {/* <Divider /> */}

          <Divider />

          <Form.Item
            name="ProdIsactive"
            label="Active"
            initialValue={prevVal?.ProdIsactive == undefined ? true : prevVal?.ProdIsactive}
            valuePropName="checked"
          >
            <AppSwitch />
          </Form.Item>



          <Form.Item {...tailLayout} >
            <AppButton
              className="btn-primary"
              htmlType="submit"
            >
              Save
          </AppButton>
          </Form.Item>

        </Form>
      </Col>
    </div>
  )
}

export default CreateSampleQuoteComponent;