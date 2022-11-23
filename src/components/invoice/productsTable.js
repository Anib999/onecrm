
import React, { useState, useEffect } from 'react'
import PageHeader from '../common/pageHeader';
import { Row, Col, Form, Select, Card, InputNumber, Space, DatePicker, Descriptions, Input } from 'antd';
import AppButton from '../common/button/button';
import AppTable from '../common/table/table';
import { FiUserPlus, FiPlus, FiTrash } from 'react-icons/fi';
import ProductForm from './shipping/productForm';
import { getAllSampleQuoteApi } from '../../services/productService';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCustomerApi } from '../../services/customerService';
import { Link } from 'react-router-dom';

const { TextArea } = Input;

const ProductsTableCalculation = (props) => {
  const { custId, prodLis, calLis, productLister, productTableList, isPublished, noter } = props;
  const [form] = Form.useForm();
  const [showProductForm, setShowProductForm] = useState(false);
  const [addedProducts, setAddedProducts] = useState([])
  const [totalAmt, setTotalAmt] = useState(0);
  const [subTotalAmt, setSubTotalAmt] = useState(0);
  const [customTaxRate, setCustomTaxRate] = useState(0);
  const dispatch = useDispatch();
  const productReducer = useSelector(state => state.product);
  const customerReducer = useSelector(state => state.customer);
  const [productList, setProductList] = useState([]);
  const [prevVal, setprevVal] = useState(0);
  const [runOnce, setrunOnce] = useState(false);
  const [customTaxExclude, setCustomTaxExclude] = useState(0);
  const [prodList, setprodList] = useState([]);
  const [allCal, setAllCal] = useState({
    subMat: 0,
    taxExc: 0,
    taxAmt: 0,
    totAmt: 0,
    shiAmt: 0
  });
  const [shipmentAmt, setShipmentAmt] = useState(0);
  const [note, setNote] = useState('');

  const columns = [
    {
      title: 'S/N',
      dataIndex: 'index',
      render: (text, record, index) => `${index + 1}`
    },
    {
      title: 'Product Code',
      dataIndex: 'productCode'
    },
    {
      title: 'Product Name',
      dataIndex: 'product'
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity'
    },
    {
      title: 'Unit Price',
      dataIndex: 'unitPrice'
    },
    {
      title: 'Net Price',
      dataIndex: 'netPrice'
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <>
          {!isPublished ? (
            <Space size="middle" className="table-actn-icon" >
              <FiTrash className="icon-delete" onClick={() => removeProduct(index)} />
            </Space>
          ) : ''}
        </>
      ),
    },

  ];

  useEffect(() => {
    let products = [];
    productReducer?.allSampleQuoteId?.forEach(item => {
      products.push(productReducer?.products[item])
    });
    setProductList(products)
    if (products.length === 0) {
      getAllProducts()
    }
  }, [productReducer?.allSampleQuoteId]);


  useEffect(() => {
    getAllProducts();
  }, [])

  useEffect(() => {
    setAddedProducts(productTableList);
    returnProduct(productTableList)
    let proL = productLister
    setSubTotalAmt(proL?.SubTotal)
    setCustomTaxExclude(proL?.Discount)
    setCustomTaxRate(proL?.Tax)
    setTotalAmt(proL?.TotalCost)
    setShipmentAmt(Number(proL?.ShipmentCost))
    setNote(proL?.Note)
    noter(proL?.Note)
  }, [productTableList])



  const getAllProducts = () => {
    if (prevVal != 0 && !runOnce) {

      setrunOnce(true)
      dispatch(getAllSampleQuoteApi(
        prevVal,
        () => {
          // setLoading(false)
          setrunOnce(false)
        }
      ))
    }

  }

  if (prevVal !== custId) {
    setprevVal(custId)
    // console.log(custId);
    setAddedProducts([])
    // getAllProducts()
  }

  useEffect(() => {
    //call function when something change in state
    getAllProducts();
  }, [prevVal])


  const removeProduct = (index) => {
    // addedProducts.filter((item, itemIndex) => {console.log(itemIndex, index);})
    let products = addedProducts.filter((item, itemIndex) => itemIndex !== index);
    setAddedProducts(products)
    returnProduct(products)
  }

  const handleProductAdd = (values) => {
    let obj = {
      ...values,
      product: productReducer?.products[values?.productId]?.ProductName,
      netPrice: values?.quantity * values?.unitPrice,
      productCode: productReducer?.products[values?.productId]?.ProcCode
    }
    setAddedProducts([...addedProducts, obj])
    setShowProductForm(false);
    returnProduct([...addedProducts, obj])
  }

  useEffect(() => {
    calculateTotal();
    calculateSubTotal();
  }, [addedProducts, customTaxRate, customTaxExclude, shipmentAmt]) //customTaxExclude

  const returnProduct = (value) => {
    // console.log(value);
    prodLis(value)
  }

  const calculateSubTotal = () => {
    let subTotal = 0;
    addedProducts.map(item => {
      subTotal += item?.netPrice
    })
    setSubTotalAmt(subTotal)
  }

  const calculateTotal = () => {
    let total = 0;
    addedProducts.map(item => {
      total += item?.netPrice
    })
    let shipAmt = Number.isNaN(shipmentAmt) ? 0 : Number(shipmentAmt)
    let custTax = Number.isNaN((customTaxRate / 100) * total) ? 0 : ((customTaxRate / 100) * total)
    let discountAm = customTaxExclude == undefined ? 0 : customTaxExclude;
    let finalAmt = total + custTax + shipAmt - discountAm
    setTotalAmt(finalAmt)
  }

  useEffect(() => {
    setAllCal((prevState) => ({
      ...prevState,
      subMat: subTotalAmt,
      taxExc: customTaxExclude,
      taxAmt: customTaxRate,
      totAmt: totalAmt,
      shiAmt: Number(shipmentAmt)
    }))
  }, [addedProducts, subTotalAmt, customTaxExclude, customTaxRate, totalAmt, shipmentAmt])

  useEffect(() => {
    calLis(allCal)
  }, [allCal]);

  // const calculateTaxExclude = () => {

  // }


  return (
    <Row>
      <Col span={24}>
        <AppTable
          columns={columns}
          dataSource={addedProducts}
          pagination={false}
          footer={() =>
            !isPublished ?
              (<Row justify='center'>
                <AppButton
                  className="btn-primary--outline"
                  icon={<FiPlus />}
                  onClick={() => setShowProductForm(true)}
                >Add Product</AppButton>
              </Row>)
              :
              ''
          }
        />
        <Card className="bottom-calculation-container">
          <Row>

            <Col span={12}>
              <Descriptions
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
                        let allVal = val.target.value
                        setNote(allVal)
                        noter(allVal)
                      }}
                      value={note}
                      placeholder="Notes" />
                    </>
                  ) : note}
                </Descriptions.Item>
              </Descriptions>
              <p><small>Note:- After publishing cannot update customer and product fields</small></p>
            </Col>

            <Col span={8} offset={4}>

              <Descriptions
                // title="User Info"
                bordered
                layout="horizontal"
                column={1}
                size="small"
              >
                <Descriptions.Item label="SubTotal">
                  {subTotalAmt}
                </Descriptions.Item>
                <Descriptions.Item label="Discount">
                  {/* Tax excluded */}
                  {!isPublished ? (
                    <InputNumber
                      onInput={(val) => {
                        setCustomTaxExclude(val != null || val != 0 ? val : 0)
                      }}
                      value={customTaxExclude}
                      max={subTotalAmt}
                      min="0"
                    />
                  ) : customTaxExclude}
                </Descriptions.Item>
                <Descriptions.Item label="Custom tax rate">
                  {!isPublished ? (
                    <InputNumber
                      onInput={(val) => {
                        setCustomTaxRate(val != null || val != 0 ? val : 0)
                      }}
                      value={customTaxRate}
                    />
                  ) : customTaxRate}
                </Descriptions.Item>
                <Descriptions.Item label="Shipment Cost">
                  {!isPublished ? (
                    <InputNumber
                      onInput={(val) => {
                        setShipmentAmt(val != null || val != 0 ? val : 0)
                      }}
                      value={shipmentAmt}
                    />
                  ) : shipmentAmt}
                </Descriptions.Item>
                <Descriptions.Item label="Total">{totalAmt}</Descriptions.Item>
              </Descriptions>
            </Col>

          </Row>
        </Card>
      </Col>
      <ProductForm
        visible={showProductForm}
        hideProductForm={() => setShowProductForm(false)}
        handleProductAdd={handleProductAdd}
        productList={productList}
      />
    </Row>
  )
}

export default ProductsTableCalculation
