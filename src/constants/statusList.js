const StatusList = [
  {
    "SId": 1,
    "SampleStatus": "Pending"
  },
  {
    "SId": 2,
    "SampleStatus": "Quote Received"
  },
  {
    "SId": 3,
    "SampleStatus": "ordered"
  },
  {
    "SId": 4,
    "SampleStatus": "Sample Received"
  }
]

export const sampleQuoteStatus = {
  'Pending': [
    { name: 'Received Quote', action: 'receivedQuoteForm' },
    { name: 'Request Product Order', action: 'requestProductOrderForm' },
    { name: 'Delete', action: 'deletePrompt' },
  ],
  'Cancel': [
    { name: 'Delete', action: 'deletePrompt' }
  ],
  'ordered': [
    { name: 'Request Sample Order', action: 'requestSampleOrderForm' },
    { name: 'Request Product Order', action: 'requestProductOrderForm' }
  ],
  // temp
  'Quote Received': [
    { name: 'Request Sample Order', action: 'requestSampleOrderForm' },
    { name: 'Request Product Order', action: 'requestProductOrderForm' }
  ],
}

export const sampleOrderStatus = {
  'Pending': [
    { name: 'Received Sample Order', action: 'receivedSampleOrderForm' },
    { name: 'Delete', action: 'deletePrompt' }
  ],
  'Cancel': [
    { name: 'Delete', action: 'deletePrompt' }
  ],
  'Received': [
    { name: 'Request Product Order', action: 'requestProductOrderForm' }
  ],
  //temp
  'Pending Sample': [
    { name: 'Received Sample Order', action: 'receivedSampleOrderForm' },
    { name: 'Delete', action: 'deletePrompt' }
  ],
  'Sample Received': [
    { name: 'Request Product Order', action: 'requestProductOrderForm' }
  ],
}

export const productOrderStatus = {
  'Pending': [
    { name: 'Received Product', action: 'receivedProductForm' },
    // { name: 'Edit Memo', action: 'edit' }
  ],
  'Received': [
    { name: 'Add To Shipped', action: 'addToShippedForm' }
  ],
  //temp
  'Pending Order': [
    { name: 'Received Product', action: 'receivedProductForm' },
    // { name: 'Edit Memo', action: 'edit' }
  ],
  'Order Received': [
    { name: 'Add To Shipped', action: 'addToShippedForm' }
  ],
}



export default StatusList;