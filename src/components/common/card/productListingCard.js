import React from 'react';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment'

//is used in products page for sample quote,sample order,product order,shipment


const ProductListingCard = (props) => {
  const { data, hasProductVariants, hasDetailedVariants } = props;

  return (
    <Link to={`/product/${data?.PId}`}>
      <div className="card-outline">
        <div className="card-outline__header">
          {/* <p>{data?.title}</p> */}
          <p>
            <span className="text-uppercase">{data?.ProcCode}</span> {`${data?.ProductName ? `- ${data?.ProductName} ` : ''}`}
            <span>
              <Tag
                className={data?.ProdIsactive ? 'active-tag' : 'inactive-tag'}
                color={data?.ProdIsactive ? 'green' : 'red'}
                color='pink'
              >
                {data?.ProdIsactive ? 'Active' : 'Inactive'}
              </Tag>
            </span>
          </p>
          <div>
            <Tag>{data?.ProductStatus}</Tag>
          </div>
        </div>
        <div className="card-outline__body">
          <div className="card-outline__body__primary_detail">
            <div className="card-outline__body__primary_detail__info">
              <span className="title">Date:</span>
              <span className="value">{moment(data?.ProdOrderDate).format('L')}</span>
            </div>
            <div className="card-outline__body__primary_detail__info">
              <span className="title">Customer Name:</span>
              <span className="value">{data?.ClientId}</span>
            </div>
            <div className="card-outline__body__primary_detail__info">
              <span className="title">Stock Code:</span>
              <span className="value">{data?.ProStockCode ?? 'N/A'}</span>
            </div>
            <div className="card-outline__body__primary_detail__info">
              <span className="title">Note:</span>
              <span className="value">{data?.ProductNote}</span>
            </div>
          </div>
          {hasProductVariants &&
            <div className="card-outline__body__secondary_detail">
              <span className="title">Product variants</span>
              {props?.productVariant?.map(variant => {
                return (
                  <div className="card-outline__body__secondary_detail__list" >
                    <span className="value">{variant?.name}</span>
                    {hasDetailedVariants ?
                      <div className="card-outline__body__secondary_detail__list__wrapper">
                        <div className="card-outline__body__secondary_detail__list__info">
                          <span className="title">Shipment Date:</span>
                          <span className="value">{variant?.shipment_date}</span>
                        </div>
                        <div className="card-outline__body__secondary_detail__list__info">
                          <span className="title">Quantity:</span>
                          <span className="value">{variant?.quantity}</span>
                        </div>
                        <div className="card-outline__body__secondary_detail__list__info">
                          <span className="title">Selling Price:</span>
                          <span className="value">{variant?.selling_price}</span>
                        </div>
                        <div className="card-outline__body__secondary_detail__list__info">
                          <span className="title">Invoiced:</span>
                          <span className="value">{variant?.invoiced ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="card-outline__body__secondary_detail__list__info">
                          <span className="title">Paid:</span>
                          <span className="value">{variant?.paid ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="card-outline__body__secondary_detail__list__info">
                          <span className="title">Note:</span>
                          <span className="value">{variant?.note}</span>
                        </div>
                      </div>
                      :
                      <>
                        <span className="title">{variant?.quantity} Pieces</span>
                        <div>
                          <Tag>{variant?.status}</Tag>
                        </div>
                      </>
                    }
                  </div>
                )
              })}

            </div>
          }
        </div>
        {/* <div className="manage">
        <Link to={`/products/${data?.PId}`}>Manage</Link>
      </div> */}

      </div >
    </Link>
  )
}

export default ProductListingCard;
