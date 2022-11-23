// import React from 'react'
// import { Form, Input, InputNumber, Col, Row, DatePicker } from 'antd';
// import AppButton from '../../common/button/button';

// const { TextArea } = Input;


// const formItemLayout = {
//   labelCol: {
//     span: 6
//   },
//   wrapperCol: {
//     span: 18
//   },
// };



// const ReceivedSampleOrderForm = (props) => {
//   const { onCancel, handleFinish } = props
//   const [form] = Form.useForm();

//   const onFinish = (values) => {
//     handleFinish(values)
//   }


//   return (
//     <div className="request-sample-order-form">
//       <span>Record a information you've received from suppliers,such as estimate date,cost sample date.</span>
//       <div className="form">
//         <Form
//           labelAlign="left"
//           colon={false}
//           form={form}
//           onFinish={onFinish}
//           {...formItemLayout}
//         >
//           <Form.Item
//             name="ReceivedDate"
//             label="Date"
//             rules={[{ required: true, message: 'Date is required' }]}>
//             <DatePicker />
//           </Form.Item>

//           <Form.Item
//             name="Quantity"
//             label="Product Quantity"
//             rules={[{ required: true, message: 'Quantity is required' }]}>
//             <InputNumber placeholder="Product quantity" />
//           </Form.Item>

//           <Form.Item
//             name="EstimatedPrice"
//             label="Estimated Price"
//             rules={[{ required: true, message: 'Estimated Price is required' }]}>
//             <InputNumber placeholder="Price" />
//           </Form.Item>

//           <Form.Item
//             name="note"
//             label="Memo / Notes"
//             rules={[{ required: true, message: 'Note is required' }]}>
//             <TextArea placeholder="Notes" />
//           </Form.Item>

//           <div className="modal-form-btn" >
//             <AppButton
//               className="btn-primary btn-primary--outline"
//               onClick={onCancel}
//             >
//               Cancel
//           </AppButton>
//             <AppButton
//               htmlType="submit"
//             >
//               Submit
//           </AppButton>
//           </div>
//         </Form>
//       </div>
//     </div>
//   )
// }

// export default ReceivedSampleOrderForm
