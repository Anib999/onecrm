import React from 'react';
import AppButton from '../common/button/button';
import { Row, Menu, Dropdown } from 'antd';
// import { useHistory } from 'react-router-dom';
import BreadCrumb from '../breadcrumb';
import { FaCaretDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { useSelector } from 'react-redux';

const PageHeaderComponent = ({ title, primaryButtonTitle, primaryButtonClick, hasBreadcrumb, secondaryButtonTitle, secondaryButtonClick, description, primaryButtonMore, primaryButtonComponent, csvLinkTitle, shipmentInvoice, shipmentInvoiceButtonClick, shipmentDetail, shipmentDetailButtonClick }) => {
  // const history = useHistory();
  const productReducer = useSelector((state) => state.product);

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link>Item 1</Link>
        <Link>Item 2</Link>
        <Link>Item 3</Link>
        <Link>Item 4</Link>
      </Menu.Item>

    </Menu >
  );

  //added by suman
  const proRed = (value) => {
    let newArr = [];
    for (const key in value) {
      if (Object.hasOwnProperty.call(value, key)) {
        const ele = value[key];
        newArr.push(ele)
      }
    }
    return newArr;
  }
  let data = proRed(productReducer?.products);
  //

  return (
    <>
      {hasBreadcrumb &&
        <BreadCrumb />
      }
      <div className="page-header">
        <Row justify="space-between align-center">
          <span className="page-header__title">{title}</span>
          <Row>
            {csvLinkTitle && 
              <CSVLink filename={"sample-quote.csv"} className="btn ant-btn btn-primary btn-primary--outline" data={data}>{csvLinkTitle}</CSVLink>
            }

            {secondaryButtonTitle &&
              <AppButton className="btn-primary btn-primary--outline" onClick={() => secondaryButtonClick()}>
                {secondaryButtonTitle}
              </AppButton>
            }
            {primaryButtonComponent ? primaryButtonComponent :
              primaryButtonTitle &&
              <AppButton className="btn-primary" onClick={() => primaryButtonClick()}>
                {primaryButtonTitle}
                {primaryButtonMore &&
                  <Dropdown overlay={menu} trigger={['click']}>
                    <FaCaretDown onClick={() => { }} size={21} />
                  </Dropdown>}
              </AppButton>
            }
            {
              shipmentDetail && 
              <AppButton className="btn-primary btn-primary--outline" onClick={() => shipmentDetailButtonClick()}>
                {shipmentDetail}
              </AppButton>
            }
            {
              shipmentInvoice && 
              <AppButton className="btn-primary btn-primary" onClick={() => shipmentInvoiceButtonClick()}>
                {shipmentInvoice}
              </AppButton>
            }
          </Row>
        </Row>

      </div>

    </>
  )
}

export default PageHeaderComponent;