import React from 'react'
import ShipmentComponent from '../../components/shipments';
import { shipments } from '../../mock/shipments';

const ShipmentContainer = () => {
  return (
    <ShipmentComponent
      data={shipments}
    />
  )
}

export default ShipmentContainer
