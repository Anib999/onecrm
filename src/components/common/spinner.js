import React from 'react';
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';

const Spinner = ({ size, customStyle }) => {
  let defaultStyle = { fontSize: '2rem', color: '#163172' };
  let spinnerStyle = customStyle ? { ...defaultStyle, ...customStyle } : defaultStyle;

  const antIcon = <LoadingOutlined style={spinnerStyle} spin />

  return (
    <div className="spinner-container">
      <Spin indicator={antIcon} size={size} />
    </div>
  );
};

export default Spinner;