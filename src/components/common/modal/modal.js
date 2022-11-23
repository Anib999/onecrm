import React from 'react';
import { Modal } from 'antd';

const AppModal = (props) => {
  return (
    <Modal
      title={props?.title}
      centered
      visible={props?.visible}
      onOk={() => props?.onOk()}
      onCancel={() => props?.onCancel()}
      // afterClose={() => props?.onCancel()}
      footer={null}
      destroyOnClose={true}
    >
      {props?.children}
    </Modal>
  )
}

export default AppModal;