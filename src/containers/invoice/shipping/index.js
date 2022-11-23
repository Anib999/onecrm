import React from 'react'
import ShippingInvoiceComponent from '../../../components/invoice/shipping';

const ShippingInvoiceContainer = (props) => {
  const forEdit = props?.forEdit ?? false;
  const shipId = props?.match?.params?.id

  return (
    <ShippingInvoiceComponent forEdit={forEdit} shipId={shipId} />
  )
}

export default ShippingInvoiceContainer
