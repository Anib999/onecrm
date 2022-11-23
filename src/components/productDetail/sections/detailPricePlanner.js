import React, { useState, useEffect } from 'react'
import AppTable from '../../common/table/table';
import { Row, Col, Card, Form, Input, InputNumber, Button, Statistic, Select } from 'antd';
import { Link } from 'react-router-dom';
import _ from 'lodash';


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

const { Option } = Select;


const tableData = [
  { percentage: 20, discount: 0 },
  { percentage: 25, discount: 0 },
  { percentage: 30, discount: 0 },
  { percentage: 35, discount: 0 },
  { percentage: 40, discount: 0 },
  { percentage: 45, discount: 0 },
  { percentage: 50, discount: 0 },
]

const DetailPricePlanner = () => {
  const [form] = Form.useForm();
  const [country, setCountry] = useState();
  const [quantity, setQuantity] = useState(0);
  const [fobPrice, setFobPrice] = useState(4.5);
  const [fxRate, setFxRate] = useState(115);
  const [fobJapan, setFobJapan] = useState(0);
  const [shippingCost, setShippingCost] = useState(50);
  const [customerTax, setCustomerTax] = useState(52);
  const [customTaxRate, setCustomTaxRate] = useState(0.10)
  const [chargeUp, setChargeUp] = useState(0);
  const [moldFee, setMoldFee] = useState(0);
  const [nameTag, setNameTag] = useState(0);
  const [packagingFee, setPackagingFee] = useState(0);
  const [labourCost, setLabourCost] = useState(0);
  const [arrivalCost, setArrivalCost] = useState(0);
  const [japanCost, setJapanCost] = useState();
  const [profitPerItem, setProfitPerItem] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [sellingPriceDiscount, setSellingPriceDiscount] = useState(0);
  const [finalSellingPrice, setFinalSellingPrice] = useState(0);
  const [lotQuantity, setLotQuantity] = useState(0);
  const [finalCost, setFinalCost] = useState(0);
  const [lossAmt, setLossAmt] = useState(0);
  const [lossPercentage, setLossPercentage] = useState(5);
  const [data, setData] = useState(tableData);

  useEffect(() => {
    calculateArrivalCost();
  }, [chargeUp, moldFee, packagingFee, labourCost, fobJapan, shippingCost, customerTax, customTaxRate])

  useEffect(() => {
    // console.log('change in fobPrice,fxRate', fobPrice, fxRate)
    calculateFobJapan();
  }, [fobPrice, fxRate])

  useEffect(() => {
    calculateCustomerTax()
  }, [fobJapan, customTaxRate])

  useEffect(() => {
    calculateTotalProfit();
  }, [profitPerItem, lotQuantity, quantity])

  useEffect(() => {
    calculateLoss()
  }, [arrivalCost, lossPercentage])

  useEffect(() => {
    // calculateFinalCost()
  }, [lossPercentage])

  useEffect(() => {
    // calculateArrivalCost()
  }, [])

  useEffect(() => {
    calculateProfitPerItem()
  }, [finalSellingPrice])


  useEffect(() => {
    calculateProfitPerItem()
  }, [finalCost])

  useEffect(() => {
    // setFinalSellingPrice(sellingPrice)
    handleSellingPriceDiscountChange(sellingPriceDiscount)
  }, [sellingPrice])

  const calculateJapanCost = () => {
    let sum = 0;
    sum = fobJapan + customerTax + shippingCost
    setJapanCost(sum)
    return sum
  }

  const calculateFobJapan = () => {
    let fobJapanSum = Math.round(fobPrice * fxRate);
    form.setFieldsValue({
      fobJapan: fobJapanSum
    })
    setFobJapan(fobJapanSum)
  }

  const calculateCustomerTax = () => {
    let tax = Math.round(fobJapan * customTaxRate);
    // console.log('customerTaxsum', tax);
    form.setFieldsValue({
      customerTax: tax
    })
    setCustomerTax(tax)
  }

  const calculateLoss = () => {
    let loss = Math.round(arrivalCost * (lossPercentage / 100));
    // console.log('calculate loss', loss)
    calculateFinalCost({ loss: loss })
    setLossAmt(loss);
  }

  const calculateFinalCost = ({ loss }) => {
    let finalCostSum = Math.round(arrivalCost + loss);
    // console.log('final cost', finalCostSum)
    setFinalCost(finalCostSum)
  }

  const calculateProfitPerItem = () => {
    // let profitPerItem = sellingPrice - )
    let profilePerItem = Math.round(finalSellingPrice - finalCost);
    setProfitPerItem(profilePerItem);
  }

  const calculateTotalProfit = () => {
    let profitSum = quantity * profitPerItem;
    setTotalProfit(profitSum)
  }

  const calculateArrivalCost = () => {
    // console.log('values', chargeUp, moldFee, packagingFee, labourCost)
    let sum = 0;
    let japanCosting = calculateJapanCost();
    sum = chargeUp + moldFee + packagingFee + labourCost;
    setArrivalCost(sum + japanCosting)
    // return sum
  }

  const columns = [
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      render: (val) => {
        return (
          <span>
            {val}%
          </span>
        )
      }
    },
    {
      title: 'Estimation Price',
      render: (data) => {
        return (
          <>
            {calculatePricing(finalCost, data?.percentage)}
          </>
        )
      }
    },
    {
      title: 'Discount',
      render: (data, index) => {
        return (
          <>
            <InputNumber
              value={data?.discount}
              onChange={(val) => handleTableDiscountChange(val, data?.percentage)} />
          </>
        )
      }
    },
    {
      title: 'Amount',
      render: (data) => {
        let amount = calculatePricing(finalCost, data?.percentage)
        return (
          <span>{calculateAmountAfterDiscount(amount, data?.discount)}</span>
        )
      }
    },
  ]

  const handleTableDiscountChange = (value, percentName) => {
    // let tableD = data;
    // _.find(tableD, { percentage: percentName }).discount = value;
    // console.log('table data fresh', tableD)
    const newList = data.map(d => {
      if (d.percentage === percentName) {
        return { ...d, discount: value };
      }
      return { ...d };
    });
    setData(newList)
  }

  const calculateAmountAfterDiscount = (amt, discount) => {
    let finalAmt = Math.round(amt - ((discount / 100) * amt))
    return finalAmt
  }

  const calculatePricing = (amount, percentage) => {
    let divD = 1 - (percentage / 100);
    let amt = amount / divD;
    return Math.round(amt);
  }

  const handleSellingPriceDiscountChange = (discount) => {
    let finalSP = Math.round((sellingPrice - ((discount / 100) * sellingPrice)))
    setFinalSellingPrice(finalSP)
  }

  return (
    <div className="price-planner">
      <Form
        {...formItemLayout}
        labelAlign="left"
        colon={false}
        // layout="vertical"
        form={form}
        initialValues={{
          fobJapan: fobJapan
        }}
      // onValuesChange={(val) => console.log('cccc', val)}
      >
        <Row gutter={20}>
          <Col span={8}>
            <Card className="supplier-info">
              <span>
                Supplier
        </span>
              <h3>Bidari and Bishnu Co.</h3>
              <Link>Choose a Different Supplier</Link>
            </Card>
          </Col>
          <Col span={16}>
            <Card>
              <Row gutter={120}>

                <Col span={12}>
                  <Form.Item
                    name='country'
                    label="Country"
                  >
                    <Select
                      placeholder="Country"
                      defaultActiveFirstOption
                      // onChange={onGenderChange}
                      allowClear
                      size="large"
                    >
                      <Option value="Hong Kong">Hong Kong</Option>
                      <Option value="Taiwan">Taiwan</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name='fobPrice'
                    label="FOB Price"
                    rules={[{ type: 'number' }]}
                    getValueProps={(val) => { setFobPrice(val) }}
                    initialValue={fobPrice}
                  >
                    <InputNumber size="small" value={fobPrice} />
                  </Form.Item>

                  <Form.Item
                    name='fobJapan'
                    label="FOB in JPY"
                    rules={[{ type: 'number' }]}
                    initialValue={fobJapan}
                  >
                    <InputNumber size="small" disabled />
                  </Form.Item>

                  <Form.Item
                    name='shipping'
                    label="Shipping"
                    rules={[{ type: 'number' }]}
                    getValueProps={(val) => { setShippingCost(val) }}
                    initialValue={shippingCost}
                  >
                    <InputNumber size="small" value={shippingCost} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name='quantity'
                    label="Product Quantity"
                    rules={[{ type: 'number' }]}
                    getValueProps={(val) => { setQuantity(val) }}
                    initialValue={quantity}
                  >
                    <InputNumber size="small" value={quantity} />
                  </Form.Item>

                  <Form.Item
                    name='fxRate'
                    label="FX Rate"
                    rules={[{ type: 'number' }]}
                    getValueProps={(val) => { setFxRate(val) }}
                    initialValue={fxRate}
                  >
                    <InputNumber size="small" value={fxRate} />
                  </Form.Item>

                  <Form.Item
                    name='customTaxRate'
                    label="Custom Tax Rate"
                    rules={[{ type: 'number', min: 0, max: 100 }]}
                    getValueProps={(val) => { setCustomTaxRate(val) }}
                    initialValue={customTaxRate}
                  >
                    <InputNumber size="small" value={customTaxRate} />
                  </Form.Item>

                  <Form.Item
                    name='customerTax'
                    label="Customer Tax"
                    rules={[{ type: 'number' }]}
                    // getValueProps={(val) => { setCustomerTax(val) }}
                    initialValue={customerTax}
                  >
                    <InputNumber size="small" disabled />
                  </Form.Item>

                  <Card className="costing-summary-country-info">
                    <span className="title">Japan</span>
                    <span className="value">{japanCost}</span>
                  </Card>
                </Col>

              </Row>
            </Card>
          </Col>
        </Row>

        <Row gutter={20} className="mt-20">
          <Col span={16}>
            <Card>
              <Row gutter={120}>
                <Col span={12}>
                  <Form.Item
                    name='chargeUp'
                    label="Charge Up"
                    rules={[{ type: 'number', }]}
                    initialValue={chargeUp}
                    getValueProps={(val) => { setChargeUp(val) }}
                  >
                    <InputNumber size="small" value={chargeUp} />
                  </Form.Item>

                  <Form.Item
                    name='moldFee'
                    label="Mold Fee"
                    rules={[{ type: 'number', }]}
                    initialValue={moldFee}
                    getValueProps={(val) => setMoldFee(val)}
                  >
                    <InputNumber size="small" value={moldFee} />
                  </Form.Item>

                  <Form.Item
                    name='nameTag'
                    label="Name Tag"
                    rules={[{ type: 'number', }]}>
                    <Input size="small" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name='packagingFee'
                    label="Packaging Fee"
                    rules={[{ type: 'number' }]}
                    initialValue={packagingFee}
                    getValueProps={(val) => setPackagingFee(val)}
                  >
                    <InputNumber size="small" value={packagingFee} />
                  </Form.Item>

                  <Form.Item
                    name='labourCost'
                    label="Labour Cost"
                    rules={[{ type: 'number', }]}
                    initialValue={labourCost}
                    getValueProps={(val) => setLabourCost(val)}
                  >
                    <InputNumber size="small" value={labourCost} />
                  </Form.Item>
                  <Card className="costing-summary-country-info">
                    <span className="title">Total Arrival Cost</span>
                    <span className="value">{arrivalCost}</span>
                  </Card>
                </Col>

              </Row>
            </Card>
          </Col>
          <Col span={8} className="costing-summary">

            <Card className="costing-summary-final-cost">
              <Row justify="space-around">
                {/* <span>Loss (in percentage)  </span> */}
                <Form.Item
                  name='lossPercentage'
                  label="Loss (in percentage)"
                  rules={[{ type: 'number', min: 0 }]}

                  initialValue={lossPercentage}
                  getValueProps={(val) => setLossPercentage(val)}
                >
                  <InputNumber size="small" value={lossPercentage} />
                </Form.Item>
              </Row>
              <Row justify="center" className="mt-20">
                <Statistic title="Final Cost" value={finalCost} />
              </Row>
            </Card>
          </Col>

        </Row>

        <Card className="mt-20">
          <AppTable
            columns={columns}
            dataSource={data}
            pagination={false}

          />
        </Card>

        <Card className="costing-summary-country-info  mt-20 selling-price-container">
          <div className="inner-container">
            <Col>
              <span className="title">Choosen Selling Price</span>
            </Col>
            <Col>
              <Form.Item
                name='sellingPrice'
                label=""
                rules={[{ type: 'number', }]}

                initialValue={sellingPrice}
                getValueProps={(val) => setSellingPrice(val)}
              >
                <InputNumber
                  value={sellingPrice} />
              </Form.Item>
            </Col>
            <Col>
              <div>
                <Form.Item
                  name='sellingPriceDiscount'
                  label=""
                  rules={[{ type: 'number', min: 0, max: 100 }]}
                  initialValue={sellingPriceDiscount}
                  getValueProps={(val) => setSellingPriceDiscount(val)}
                >
                  <InputNumber
                    onChange={(val) => handleSellingPriceDiscountChange(val)}
                    value={sellingPriceDiscount} />
                </Form.Item>
              </div>
            </Col>
            <Col>
              <span className="value">{finalSellingPrice}</span>
            </Col>
          </div>
        </Card>

        <Card className="bottom-info">
          <Col span={24} >
            <Row>
              <Col span={12}>
                <Statistic title="Profit Per Item" value={profitPerItem} />
              </Col>
              <Col span={12}>
                <Statistic title="Total Profit" value={totalProfit} />
              </Col>
            </Row>
          </Col>
        </Card>

      </Form>
    </div >
  )
}

export default DetailPricePlanner
