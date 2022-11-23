import React from 'react';
import { Button } from 'antd';

const AppButton = (props) => {
  return (
    <Button className="btn-primary" type="primary" {...props}>
      {props.children}
    </Button>
  )
}

export default AppButton;   