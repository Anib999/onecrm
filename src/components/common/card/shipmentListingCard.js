import React from 'react';
import moment from 'moment';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';

const ShipmentListingCard = (props) => {
  const { data } = props
  return (
    <div className="card-outline">
      <div className="card-outline__header">
        <p><span className="text-uppercase">{data?.productCode}</span> {`${data?.productName ? `- ${data?.productName} ` : ''}`}</p>
        <div>
          <Tag>{data?.status}</Tag>
        </div>
      </div>

      <div className="card-outline__body">
        <div className="card-outline__body__primary_detail">
          <div className="card-outline__body__primary_detail__info">
            <span className="title">Shipping Company:</span>
            <span className="value">{data?.shippingCompany}</span>
          </div>
          <div className="card-outline__body__primary_detail__info">
            <span className="title">Shipping Incharge:</span>
            <span className="value">{data?.shippingHandler ?? 'N/A'} <br />+977-9856513313</span>
          </div>
          <div className="card-outline__body__primary_detail__info">
            <span className="title">Customer:</span>
            <span className="value">{data?.customer}</span>
          </div>
          <div className="card-outline__body__primary_detail__info">
            <span className="title">Receiver:</span>
            <span className="value">{data?.customer} <br />+977-9856513313</span>
          </div>

          <div className="card-outline__body__primary_detail__info">
            <span className="title">Quantity:</span>
            <span className="value">{data?.quantity}</span>
          </div>
          <div className="card-outline__body__primary_detail__info">
            <span className="title">Action On:</span>
            <span className="value">{moment(data?.date).format('L')}</span>
          </div>
          <div className="card-outline__body__primary_detail__info">
            <span className="title">ETA:</span>
            <span className="value">{moment(data?.date).format('L')}</span>
          </div>

          <div className="card-outline__body__primary_detail__info">
            <span className="title">Note:</span>
            <span className="value">{data?.note}</span>
          </div>

        </div>

      </div>
      <div className="manage">
        <Link >Details</Link>
      </div>

    </div>
  )
}

export default ShipmentListingCard
