export const sampleQuote = [
  {
    id: 1,
    created_at: '2020-12-10',
    title: 'YA1614 - PU Round Zip Middle Wallet',
    customer_name: 'Kawasaki Frontale',
    supplier: null,
    note: 'Make red and black samples. It costs $ 20.',
    status: 'draft'
  },
  {
    id: 2,
    title: 'PM1705 - Apple Macbook 16 Inch Cover',
    created_at: '2020-12-10',
    customer_name: 'H & M Co., Ltd.Okachimachi store',
    supplier: 'Asian Suppliers Pvt Ltd',
    note: 'Make red and black samples. It costs $ 20.',
    status: 'cancelled'
  },
  {
    id: 3,
    title: 'YA1614 - PU Round Zip Middle Wallet',
    created_at: '2020-12-10',
    customer_name: 'Kawasaki Frontale',
    supplier: 'Taiwan Co.Ltd',
    note: 'Make red and black samples. It costs $ 20.',
    status: 'draft'
  }
]

export const sampleOrder = [
  {
    id: 1,
    created_at: '2020-12-10',
    title: 'YA1614 - PU Round Zip Middle Wallet',
    customer_name: 'Kawasaki Frontale',
    supplier: 'Taiwan Co LTD',
    note: 'Make red and black samples. It costs $ 20.',
    status: 'approved'
  },
  {
    id: 3,
    title: 'YA1614 - PU Round Zip Middle Wallet',
    created_at: '2020-12-10',
    customer_name: 'Kawasaki Frontale',
    supplier: 'Taiwan Co.Ltd',
    note: 'Make red and black samples. It costs $ 20.',
    status: 'approved'
  },
  {
    id: 2,
    title: 'PM1705 - Apple Macbook 16 Inch Cover',
    created_at: '2020-12-10',
    customer_name: 'H & M Co., Ltd.Okachimachi store',
    supplier: 'Asian Suppliers Pvt Ltd',
    note: 'Make red and black samples. It costs $ 20.',
    status: 'approved'
  },
  {
    id: 4,
    title: 'YA1614 - PU Round Zip Middle Wallet',
    created_at: '2020-12-10',
    customer_name: 'H & M Co., Ltd.Okachimachi store',
    supplier: 'Asian Suppliers Pvt Ltd',
    note: 'Make red and black samples. It costs $ 20.',
    status: 'approved'
  },
]

export const productOrder = [
  {
    id: 1,
    created_at: '2020-12-10',
    title: 'YA1614 - PU Round Zip Middle Wallet',
    customer_name: 'Kawasaki Frontale',
    supplier: 'Taiwan Co LTD',
    note: 'Make red and black samples. It costs $ 20.',
    status: 'approved',
    product_variant: [
      {
        id: 1,
        name: 'PU Round Zip Middle Wallet Red',
        quantity: 500,
        status: 'approved'
      },
      {
        id: 2,
        name: 'PU Round Zip Middle Wallet Black',
        quantity: 1000,
        status: 'approved'
      },
    ]
  },
  {
    id: 3,
    title: 'YA1614 - PU Round Zip Middle Wallet',
    created_at: '2020-12-10',
    customer_name: 'Kawasaki Frontale',
    supplier: 'Taiwan Co.Ltd',
    note: 'Make red and black samples. It costs $ 20.',
    status: 'approved',
    product_variant: [
      {
        id: 1,
        name: 'PU Round Zip Middle Wallet Red',
        quantity: 500,
        status: 'approved'
      },
      {
        id: 2,
        name: 'PU Round Zip Middle Wallet Black',
        quantity: 1000,
        status: 'approved'
      },
    ]
  },
  {
    id: 2,
    title: 'PM1705 - Apple Macbook 16 Inch Cover',
    created_at: '2020-12-10',
    customer_name: 'H & M Co., Ltd.Okachimachi store',
    supplier: 'Asian Suppliers Pvt Ltd',
    note: 'Make red and black samples. It costs $ 20.',
    status: 'approved',
    product_variant: [
      {
        id: 1,
        name: 'PU Round Zip Middle Wallet Red',
        quantity: 500,
        status: 'approved'
      },
      {
        id: 2,
        name: 'PU Round Zip Middle Wallet Black',
        quantity: 1000,
        status: 'approved'
      },
    ]
  },
  {
    id: 4,
    title: 'YA1614 - PU Round Zip Middle Wallet',
    created_at: '2020-12-10',
    customer_name: 'H & M Co., Ltd.Okachimachi store',
    supplier: 'Asian Suppliers Pvt Ltd',
    note: 'Make red and black samples. It costs $ 20.',
    status: 'approved',
    product_variant: [
      {
        id: 1,
        name: 'PU Round Zip Middle Wallet Red',
        quantity: 500,
        status: 'approved'
      },
      {
        id: 2,
        name: 'PU Round Zip Middle Wallet Black',
        quantity: 1000,
        status: 'approved'
      },
    ]
  },
]

export const shipment = [
  {
    id: 1,
    created_at: '2020-12-10',
    title: 'YA1614 - PU Round Zip Middle Wallet',
    customer_name: 'Kawasaki Frontale',
    supplier: 'Taiwan Co LTD',
    shipment_address: '1-10-5 Shinjuku, Shinjuku-ku, Tokyo 111-0111',
    note: 'Make red and black samples. It costs $ 20.',
    status: 'approved',
    product_variant: [
      {
        id: 1,
        name: 'PU Round Zip Middle Wallet Red',
        shipment_date: '01-04-2021',
        quantity: 500,
        selling_price: 2480,
        invoiced: true,
        paid: true,
        note: 'Sample'
      },
      {
        id: 2,
        name: 'PU Round Zip Middle Wallet Black',
        shipment_date: '01-04-2021',
        quantity: 1000,
        selling_price: 2480,
        invoiced: true,
        paid: true,
        note: 'Sample',
        status: 'approved'
      },
    ]
  },
  {
    id: 3,
    title: 'YA1614 - PU Round Zip Middle Wallet',
    created_at: '2020-12-10',
    customer_name: 'Kawasaki Frontale',
    supplier: 'Taiwan Co.Ltd',
    note: 'Make red and black samples. It costs $ 20.',
    status: 'approved',
    product_variant: [
      {
        id: 1,
        name: 'PU Round Zip Middle Wallet Red',
        shipment_date: '01-04-2021',
        quantity: 500,
        selling_price: 2480,
        invoiced: true,
        paid: true,
        note: 'Sample'
      },
      {
        id: 2,
        name: 'PU Round Zip Middle Wallet Black',
        shipment_date: '01-04-2021',
        quantity: 1000,
        selling_price: 2480,
        invoiced: true,
        paid: true,
        note: 'Sample',
        status: 'approved'
      },
    ]
  },
  {
    id: 2,
    title: 'PM1705 - Apple Macbook 16 Inch Cover',
    created_at: '2020-12-10',
    customer_name: 'H & M Co., Ltd.Okachimachi store',
    supplier: 'Asian Suppliers Pvt Ltd',
    note: 'Make red and black samples. It costs $ 20.',
    status: 'approved',
    product_variant: [
      {
        id: 1,
        name: 'PU Round Zip Middle Wallet Red',
        shipment_date: '01-04-2021',
        quantity: 500,
        selling_price: 2480,
        invoiced: true,
        paid: true,
        note: 'Sample'
      },
      {
        id: 2,
        name: 'PU Round Zip Middle Wallet Black',
        shipment_date: '01-04-2021',
        quantity: 1000,
        selling_price: 2480,
        invoiced: true,
        paid: true,
        note: 'Sample',
        status: 'approved'
      },
    ]
  },
  {
    id: 4,
    title: 'YA1614 - PU Round Zip Middle Wallet',
    created_at: '2020-12-10',
    customer_name: 'H & M Co., Ltd.Okachimachi store',
    supplier: 'Asian Suppliers Pvt Ltd',
    note: 'Make red and black samples. It costs $ 20.',
    status: 'approved',
    product_variant: [
      {
        id: 1,
        name: 'PU Round Zip Middle Wallet Red',
        shipment_date: '01-04-2021',
        quantity: 500,
        selling_price: 2480,
        invoiced: true,
        paid: true,
        note: 'Sample'
      },
      {
        id: 2,
        name: 'PU Round Zip Middle Wallet Black',
        shipment_date: '01-04-2021',
        quantity: 1000,
        selling_price: 2480,
        invoiced: true,
        paid: true,
        note: 'Sample',
        status: 'approved'
      },
    ]
  },
]