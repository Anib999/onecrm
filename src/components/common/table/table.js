import React from 'react';
import { Table } from 'antd';

const TableComponent = (props) => {
  return (
    <Table
      className="table--primary"
      {...props}
    />
  )
}

export default TableComponent;