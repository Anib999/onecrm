import React, { useState, useEffect } from 'react'
import { Input, Row, Col, DatePicker, Select, Tag } from 'antd';
import AppButton from '../button/button';
import { useDispatch } from 'react-redux';
import { filterChange } from '../../../store/slices/filterSlice';

const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;

const FilterComponent = (props) => {
  const { hasAdditionalButton, buttonTitle, additionalButtonClick } = props
  const [keyword, setKeyword] = useState();
  const [productId, setProductId] = useState();
  const [dateRange, setDateRange] = useState();
  const dispatch = useDispatch();

  // const handleKeywordChange = () => {

  // }

  // const handleProductIdchange = () => {

  // }

  // const handleDateRangeChange = () => {

  // }

  useEffect(() => {
    // let filters = {
    //   keyword,
    //   productId,
    //   dateRange
    // }
    // dispatch(filterChange({ filters: filters }))
  }, [keyword, productId, dateRange])

  const handleSearch = () => {
    let filters = {
      keyword,
      productId,
      dateRange
    }
    dispatch(filterChange({ filters: filters }))
  }

  return (
    <div className="filter">

      <div className="active-filters">
        <Tag>0</Tag>
        <span className="">Active filters</span>
      </div>

      <Row gutter={12}>
        <Col span={11}>
          <Input
            placeholder="All Products"
            size="large"
            onChange={(e) => setKeyword(e.target.value)}
          // allowClear
          />
        </Col>
        {/* <Col span={3}>
          <Select size="large" placeholder="All Statuses" >
            <Option value="1">Between</Option>
            <Option value="2">Except</Option>
          </Select>
        </Col> */}
        <Col span={8}>
          <RangePicker
            size="large"
            placeholder={["From", "To"]}
            onChange={(e) => setDateRange(e)}
          />
        </Col>
        {!hasAdditionalButton &&
          <Col span={5}>
            <Search
              placeholder="Enter PID #"
              // allowClear
              enterButton
              onSearch={() => { handleSearch() }}
              size="large"
              onChange={(e) => setProductId(e.target.value)}
            />
          </Col>
        }

        {hasAdditionalButton &&
          <Col span={5}>
            <AppButton onClick={additionalButtonClick}>
              {buttonTitle}
            </AppButton>
          </Col>
        }
      </Row>

    </div>
  )
}

export default FilterComponent
