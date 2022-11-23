import React from 'react'
import PageHeader from '../../components/common/pageHeader';
import AppTable from '../common/table/table';
import ShipmentListingCard from '../common/card/shipmentListingCard';
import FilterComponent from '../common/filter/filter';

const ShipmentComponent = (props) => {
  const { data } = props
  return (
    <div>
      <PageHeader
        title="Shipments"
        hasBreadcrumb
        primaryButtonTitle="Add shipment"
        primaryButtonClick={() => { }}
      />
      <FilterComponent
      />
      {data?.map(item => {
        return (
          <ShipmentListingCard
            data={item}
          />
        )
      })}
    </div>
  )
}

export default ShipmentComponent
