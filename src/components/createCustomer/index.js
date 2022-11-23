import React, { useState, useEffect } from 'react';
import PageHeader from '../common/pageHeader';
import { Form, Input, Select, Col, Row, Tag } from 'antd';
import AppButton from '../common/button/button';
import AppModal from '../common/modal/modal';
import AddressForm from './section/addressForm';
import { FiPlusCircle, FiEdit } from 'react-icons/fi';

const { Option } = Select;
const { TextArea } = Input;

const tailLayout = {
  wrapperCol: { offset: 6, span: 24 },
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 18 },
  },
};

const CreateCustomerComponent = (props) => {
  const { forEdit, handleFinish, previousValues, isLoading, customerId, addAddress, setAddAddress, addressList, createUpdateAddressSuccess, showAddressModal, setAddressModal, billType, billSuccess, allUsers } = props
  const [form] = Form.useForm();
  const [addressValues, setAddressValues] = useState(addressList ?? []);
  const [addressModalPurpose, setAddressPurpose] = useState('create');
  const [selectedAddressIndex, setSelectedAddressIndex] = useState();
  // useEffect(() => {
  //   setAddressValues(previousValues?.AddressList)
  // }, [previousValues?.AddressList])

  useEffect(() => {
    setAddressValues(addressList)
  }, [addressList])

  const onFinish = (values) => {
    let obj = {
      ...values,
      address: addressValues
    }
    handleFinish(obj)
  }  

  let prevVal = {
    ...previousValues,
    cltClientTags: typeof previousValues?.cltClientTags === 'string' ? previousValues?.cltClientTags.split(',') : previousValues?.cltClientTags,
    ContactPersonId: previousValues?.ContactPerson
  }

  // allUsers.map(roles => {
  //   if(roles.uid == prevVal.ContactPersonId){
  //     prevVal["ContactPersonId"] = roles.uid
  //   }else{
  //     prevVal["ContactPersonId"] = 0
  //   }
    // console.log(prevVal);
  // })

  return (
    <>
      <PageHeader title={`${forEdit ? 'Edit' : 'Add'} Customer`} hasBreadcrumb />
      <Col span={16}>

        <Form
          {...formItemLayout}
          labelAlign="left"
          colon={false}
          onFinish={onFinish}
          initialValues={prevVal}
          form={form}
          name="control-hooks"
        >
          <Form.Item
            name="cltClientCode"
            label="Code"
            rules={[{ required: true, message: 'Customer Code is required' }]}
          >
            <Input placeholder="Customer code" />
          </Form.Item>

          <Form.Item
            name="cltClientName"
            label="Customer Name"
            rules={[{ required: true, message: 'Customer Name is required' }]}>
            <Input placeholder="Customer name" />
          </Form.Item>

          <Form.Item
            name="cltClientTags"
            label="Tags"
          // rules={[{ required: true, message: 'Customer Tags is required' }]}
          >
            <Select
              placeholder="Enter/Select tags"
              mode="multiple"
              mode="tags"
              // onChange={onGenderChange}
              allowClear
            >
              <Option value="china">china</Option>
              <Option value="phone cover">phone cover</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="cltClientNotes"
            label="Internal Notes"
          // rules={[{ required: true, message: 'Internal note is required' }]}
          >
            <TextArea placeholder="If any internal note" />
          </Form.Item>

          {/* new added */}
          <Form.Item name="BillTypeId" label="Bill Type" 
          //rules={[{ required: true }]} 
          >
            <Select
              placeholder="Select Bill Type"
              size="large"
              allowClear
            >{billType.map(roles => {
                  return (
                    <Option value={roles?.BId}>{roles?.BIllType}</Option>
                  )
            })}
            </Select>
          </Form.Item>

          <Form.Item name="ContactPersonId" label="Contact Person" 
          //rules={[{ required: true }]} 
          >
            <Select
              placeholder="Select Contact Person"
              size="large"
              allowClear
            >{allUsers.map(roles => {
                  return (
                    <Option value={roles?.uid}>{roles?.name}</Option>
                  )
            })}
            </Select>
          </Form.Item>
          {/* new added */}

          <Form.Item {...tailLayout} >
            <Row>
              <AppButton
                className="btn-primary"
                htmlType="submit"
                loading={isLoading}
                disabled={isLoading}
                onClick={() => setAddAddress(false)}
              >
                {forEdit ? 'Update' : 'Save'}
              </AppButton >
              {!forEdit &&
                <AppButton
                  className="btn-primary btn-primary--outline"
                  htmlType="submit"
                  loading={isLoading}
                  disabled={isLoading}
                  onClick={() => setAddAddress(true)}
                >
                  Save and Add Address
            </AppButton >
              }
            </Row>
          </Form.Item>

        </Form>

        <AppModal
          visible={showAddressModal}
          onCancel={() => setAddressModal(false)}
          onOk={() => setAddressModal(false)}
          title={`${addressModalPurpose === 'create' ? 'Add New' : 'Edit'} Address`}
        >
          <AddressForm
            purpose={addressModalPurpose}
            previousValues={addressModalPurpose === 'create' ? {} : addressValues ? addressValues[selectedAddressIndex] : {}}
            valueCallback={(values) => {
              // console.log('values callback', values)
              setAddressModal(false)
              setAddressValues([values])
            }}
            setAddressModal={setAddressModal}
            customerId={customerId}
            createUpdateAddressSuccess={createUpdateAddressSuccess}

          />
        </AppModal>

      </Col>
      { forEdit &&
        <Col span={24}>
          <div className="address-container">
            <div className="address-container__header">
              <h3>Address</h3>
              <span className="add-address-btn" onClick={() => {
                setAddressPurpose('create')
                setAddressModal(true)
              }
              }> <FiPlusCircle /> Add New  </span>

            </div>
            <Row className="row--address-card">
              {addressValues?.map((address, addressIndex) => {
                return (

                  <div className="card-outline card-outline--address">
                    <div className="card-outline__header">
                      <Row>
                        <p>{address?.AddressName}</p>
                        <Tag>{address?.AddressType}</Tag>
                      </Row>

                      <div>
                        <FiEdit size={20} onClick={() => {
                          setAddressModal(true);
                          setAddressPurpose('edit');
                          setSelectedAddressIndex(addressIndex)
                        }} />
                      </div>
                    </div>
                    <div className="card-outline__subtitle">
                      <h4><strong>Contact Person:</strong> <span>{address?.ContactPerson}</span></h4>
                      <h4><strong>Telephone Number:</strong> <span>{address?.TelephoneNo}</span></h4>
                      <h4><strong>Email Address:</strong> <span>{address?.EmailAddress}</span></h4>
                      <h4><strong>Address 1:</strong> <span>{address?.Address1}</span></h4>
                      <h4><strong>Address 2:</strong> <span>{address?.Address2}</span></h4>

                    </div>
                    <div className="card-outline__body">
                      <div className="card-outline__body__primary_detail">
                        <div className="card-outline__body__primary_detail__info">
                          <span className="title">Postal Code:</span>
                          <span className="value">{address?.PostalCode}</span>
                        </div>
                        <div className="card-outline__body__primary_detail__info">
                          <span className="title">City:</span>
                          <span className="value">{address?.City}</span>
                        </div>
                        <div className="card-outline__body__primary_detail__info">
                          <span className="title">Prefecure:</span>
                          <span className="value">{address?.Prefecture}</span>
                        </div>

                      </div>
                    </div>
                  </div >
                )
              })}
            </Row>



            {addressValues?.length === 0 || addressValues === undefined &&
              <Row className="no-address-card">
                Currently address information is not available.<span onClick={() => setAddressModal(true)}>Add Address Information</span>
              </Row>
            }

          </div>
        </Col>

      }
    </>
  )
}

export default CreateCustomerComponent;