
import React, { useState, useEffect } from 'react'
import PageHeader from '../../common/pageHeader';
import { Row, Col, Form, Select, Card, InputNumber, Space, DatePicker, Descriptions, Input, message } from 'antd';
import { FiUserPlus, } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import AddCustomerForm from './addCustomerForm';
import { getAllCustomerApi } from '../../../services/customerService';
import { Link } from 'react-router-dom';
import ProductsTableCalculation from '../productsTable';
import { createProductForShipmentApi, createProductAfterShipApi } from '../../../services/billShipmentService'
import { getAddressListByCustomerIdApi } from '../../../services/customerService';
import { fetchProductApi, fetchProductDetApi } from '../../../services/billShipmentService';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import AddAddressForm from './addAddressForm';
// import AppSpinner from "../../common/spinner";

const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 12 },
    md: { span: 12 },
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 12 },
    md: { span: 12 },
  },
};

const ShippingInvoiceComponent = (props) => {
  const { forEdit, shipId } = props
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const productReducer = useSelector(state => state.product);
  const customerReducer = useSelector(state => state.customer);
  const [customerList, setCustomerList] = useState([]);
  const [showCustomerForm, setCustomerForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [selCustId, setselCustId] = useState(0);
  const [addressList, setAddressList] = useState([]);
  const [dateOfIssue, setdateOfIssue] = useState('');
  const [note, setNote] = useState('');
  const [prodLis, setprodLis] = useState([]);
  const [calList, setCalList] = useState([]);
  const [editProList, setEditProList] = useState([]);
  const [editProDetList, setEditProDetList] = useState([]);
  // const [nowNow, setnowNow] = useState(false);
  const [isPublished, setIsPublished] = useState(false)
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selAddInd, setselAddInd] = useState(0);
  // const [isLoading, setLoading] = useState(false);
  const [isShown, setIsShown] = useState(false);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = `${yyyy}-${mm}-${dd}`;

  useEffect(() => {
    getAllCustomers();
    if (forEdit) {
      getShipmentData(shipId)

    }
  }, [])


  useEffect(() => {
    let customers = [];
    customerReducer?.allCustomersId?.forEach(item => {
      customers.push(customerReducer?.customers[item])
    });
    setCustomerList(customers)
    if (customers.length === 0) {
      getAllCustomers()
    }

    // if(forEdit){
    //   setSelectedCustomer(customerReducer?.customers[shipId])
    // }
    if (dateOfIssue == '') {
      setdateOfIssue(today)
    }
  }, [customerReducer?.allCustomersId]);

  const handleCustomerSelect = (values) => {
    setSelectedCustomer(customerReducer?.customers[values?.customerId])
    setCustomerForm(false)
    if (addressList.length > 1) {
      setShowAddressForm(true)
    } else {
      setselAddInd(0)
    }
  }

  const getAllCustomers = () => {
    dispatch(getAllCustomerApi({ page: 1 },
      () => {
        //final callback
      }))
  }

  const getData = (val) => {
    setselCustId(val);
    let nowVal = val;
    if (forEdit) {

    }
    getCustAdd(nowVal);
  }

  const proLister = (val) => {
    setprodLis(val);
  }

  const noter = (val) => {
    setNote(val)
  }

  const calLis = (val) => {
    setCalList(val)
  }

  useEffect(() => {

  }, [prodLis, note, selAddInd]);


  const handleAllData = (shipStatt = 1) => {
    if (prodLis.length != 0) {
      let cData = 0,
        data = {
          "ShipId": forEdit ? editProList?.ShipId : 0,
          "ClientId": selCustId,
          "Note": note,
          "UserId": 1,
          "ShipmentDate": dateOfIssue,
          "BillDate": dateOfIssue,
          "ShipStatus": shipStatt,
          // forEdit ? 2 : 1
          // addressList[selAddInd]?.AddresTypeId
          "ShippingAddress": selAddInd !== undefined ? selAddInd : 0,
          "BillingAddress": selAddInd !== undefined ? selAddInd : 0,
          "Tags": selectedCustomer?.cltClientTags,
          "SubTotal": calList?.subMat,
          "Discount": calList?.taxExc,
          "ShipmentCost": calList?.shiAmt,
          "Tax": calList?.taxAmt,
          "TotalCost": calList?.totAmt
        }
      // can be published with ship id now
      dispatch(createProductForShipmentApi(data, (response) => {
        cData = response?.data?.CreatedId
        if (cData > 0) {
          createShipmentProducts(cData, shipStatt)
          message.success(response?.data?.Message)
        }
      }, () => { }))
    } else {
      message.error('Select some item')
    }
  }

  const createShipmentProducts = (cData, shipStatt) => {
    let len = prodLis.length;
    let counter = 0;
    let shiIdd = cData;
    prodLis.forEach(ele => {
      //here
      counter++;
      let data = {
        "SDetailsId": forEdit ? (ele.SDetailsId != undefined ? ele.SDetailsId : 0) : 0,
        "ShipmentId": cData,
        "ProductId": ele.productId,
        "ShipQuantity": ele.quantity,
        "SellingPrice": ele.unitPrice,
        "Remarks": ele.remarks
      }
      dispatch(createProductAfterShipApi(data, (response) => {
        cData = response?.data?.CreatedId
        if (cData > 0) {
          message.success(response?.data?.Message)
          if (counter == len) {
            if (shipStatt == 1) {
              history.push({
                // pathname: `/invoices/shipping/edit/${shiIdd}`
                pathname: `/invoices`
              })
            } else {
              window.location.reload(false);
            }
            // setTimeout(() => {
            // }, 1000);
          }
        }
      }, () => { }))
      //here
    });

  }

  const getCustAdd = (cust) => {
    setAddressList({})
    dispatch(getAddressListByCustomerIdApi(cust,
      (response) => {
        setAddressList(response)
      },
      () => { }))
  }

  const getShipmentData = (shiI) => {
    dispatch(fetchProductApi(shiI, (response) => {
      let respon = response[0];
      let cuI = respon?.ClientId;
      setEditProList(respon)
      setselCustId(cuI)
      setdateOfIssue(respon?.ShipmentDate.toString().split('T')[0]);
      // noter(respon?.Note)
      getCustAdd(cuI)
      setIsPublished(respon?.ShipStatus == 2 ? true : false)
      setselAddInd(respon?.ShippingAddress)
      dispatch(fetchProductDetApi(shiI, (res) => {
        setEditProDetList(res)
      }, () => { }));
    }, () => { }));
  }

  useEffect(() => {
    let respon = editProList;
    let cuI = respon?.ClientId;
    setSelectedCustomer(customerReducer?.customers[cuI])
  }, [editProList])

  const getInd = (value) => {
    setselAddInd(value)
  }


  // useEffect(() => {
  //   console.log(isShown)
  // }, [isShown])

  console.log(selectedCustomer);

  // if (isLoading) {
  //   return <AppSpinner />;
  // }

  return (
    <div className='invoice-form shipping-invoice'>
      <PageHeader
        hasBreadcrumb
        title={!isPublished ? `${forEdit ? 'Edit' : 'New'} Shipment Invoice` : `Shipment Published`}
        primaryButtonTitle={!isPublished ? forEdit ? 'Publish' : 'Publish' : ''}
        primaryButtonClick={() => { if (!isPublished) { handleAllData(2); } }}
        secondaryButtonTitle={!isPublished ? forEdit ? 'Save' : 'Save' : ''}
        secondaryButtonClick={() => { if (!isPublished) { handleAllData(1) } }}
      />
      <Card>
        <Row className="top-section">
          <Col span={8}>
            <Row>
              <Card className="client-container" >
                {selectedCustomer
                  ?
                  <>
                    <div className="client-container-info">
                      <h2>{selectedCustomer?.cltClientName}</h2>
                      <span>{selectedCustomer?.cltClientCode}</span>
                      <span>{selectedCustomer?.cltClientTags}</span>
                      {
                        addressList ?
                          <>
                            <span>Address 1: {addressList[selAddInd]?.Address1}</span>
                            <span>Address 2: {addressList[selAddInd]?.Address2}</span>
                            <span>Phone No: {addressList[selAddInd]?.TelephoneNo}</span>
                          </>
                          :
                          ''
                      }
                      {!isPublished ? (<Link onClick={() => setCustomerForm(true)}>Choose a different client</Link>) : ''}
                    </div>
                  </>
                  :
                  <>
                    {!isPublished ? (
                      <Link>
                        <div className="client-container-add" onClick={() => setCustomerForm(true)}>
                          <FiUserPlus size={22} color='#1E56A0' />
                          <h3>Add Client</h3>
                        </div>
                      </Link>
                    ) : ''}
                  </>
                }

              </Card>
            </Row>
          </Col>
          <Col span={8} className="invoice-title-container">
            {/* <h1>Shipment Invoice</h1> */}
          </Col>
          <Col span={8} className="invoice-info">
            <Row justify="end">
              <Form
                {...formItemLayout}
                labelAlign="left"
                colon={false}
                // layout="vertical"
                form={form}
              >
                <Descriptions
                  // title="Billing Info"
                  bordered
                  // layout="horizontal"
                  column={1}
                  size="small"
                >
                  <Descriptions.Item label="Date of issue">
                    {!isPublished ?
                      (
                        <DatePicker
                          format={"YYYY-MM-DD"}
                          onChange={(val, dateString) => {
                            let dateSt = dateString == '' ? today : dateString
                            setdateOfIssue(dateSt);
                          }}
                          value={dateOfIssue !== "" ? moment(dateOfIssue) : moment(today)}
                        />
                      ) : dateOfIssue}

                  </Descriptions.Item>
                  <Descriptions.Item label="Invoice Number">
                    {!isPublished ? (
                      <InputNumber />
                    ) : ''}
                  </Descriptions.Item>
                  {/* <Descriptions.Item label="Representative">
                    <Select
                      placeholder="Client Representative"
                      defaultActiveFirstOption
                      // onChange={onGenderChange}
                      allowClear
                      size="middle"
                    >
                      <Option value="ABC Company">ABC Company</Option>
                      <Option value="XYZ Company">XYZ Company</Option>
                    </Select>
                  </Descriptions.Item> */}
                </Descriptions>
              </Form>
            </Row>
          </Col>
        </Row>

        <Card className="customer-container">
          <Row gutter={50}>
            <Col span={12}>
              {/* <Descriptions
                title="Notes"
                bordered
                // layout="horizontal"
                column={2}
                size="small"
              >
                <Descriptions.Item label="Notes">
                  {!isPublished ? (
                    <>
                    <TextArea
                      onChange={(val) => {
                        setNote(val.target.value)
                      }}
                      value={note}
                      placeholder="Notes" />
                    </>
                  ) : note}
                </Descriptions.Item>
              </Descriptions> */}
              {/* <Descriptions
                title="Customer Address and Company"
                bordered
                // layout="horizontal"
                column={1}
                size="small"
              >
                <Descriptions.Item label="Company Name">
                  ABC Company Ltd.
                </Descriptions.Item>
                <Descriptions.Item label="Code">
                  319-0133
                </Descriptions.Item>
                <Descriptions.Item label="Address">
                  Hong Kong
                </Descriptions.Item>
                <Descriptions.Item label="Contact">
                  029-936-9111
                </Descriptions.Item>
                <Descriptions.Item label="Fax">
                  029-936-9111
                </Descriptions.Item>
              </Descriptions> */}
            </Col>
            <Col span={12}>
              {/* <Descriptions
                title="Bank Information"
                bordered
                // layout="horizontal"
                column={1}
                size="small"
              >
                <Descriptions.Item label="Bank Name">
                  <Input />
                </Descriptions.Item>
                <Descriptions.Item label="Account Number">
                  <InputNumber />
                </Descriptions.Item>
                <Descriptions.Item label="Account Type">
                  <Input />
                </Descriptions.Item>
                <Descriptions.Item label="Account Holder">
                  <Input />
                </Descriptions.Item>
              </Descriptions> */}

            </Col>
          </Row>
        </Card>

        <ProductsTableCalculation
          custId={selCustId}
          prodLis={proLister}
          calLis={calLis}
          productLister={editProList}
          productTableList={editProDetList}
          isPublished={isPublished}
          noter={noter}
        />

      </Card>
      <AddCustomerForm
        visible={showCustomerForm}
        hideCustomerForm={() => setCustomerForm(false)}
        customerList={customerList}
        handleCustomerSelect={handleCustomerSelect}
        getData={getData}
      />

      <AddAddressForm
        visible={showAddressForm}
        hideAddressForm={() => setShowAddressForm(false)}
        handleAddressAdd={[]}
        addressList={addressList}
        retInd={getInd}
      />
    </div>
  )
}

export default ShippingInvoiceComponent