import { lazy } from 'react';
import pMinDelay from 'p-min-delay';

export const AsyncLogin = lazy(() => pMinDelay(import('../containers/login'), 300));
export const AsyncDashboard = lazy(() => pMinDelay(import('../containers/dashboard'), 300));
export const AsyncSettings = lazy(() => pMinDelay(import('../containers/settings'), 300));

export const AsyncSupplier = lazy(() => pMinDelay(import('../containers/suppliers'), 300));
export const AsyncCreateSupplier = lazy(() => pMinDelay(import('../containers/createSupplier'), 300))

export const AsyncProduct = lazy(() => pMinDelay(import('../containers/products'), 300))
export const AsyncCreateSampleQuote = lazy(() => pMinDelay(import('../containers/createSampleQuote'), 300));
export const AsyncProductDetail = lazy(() => pMinDelay(import('../containers/productDetail'), 300));

export const AsyncCustomer = lazy(() => pMinDelay(import('../containers/customers'), 300));
export const AsyncCreateCustomer = lazy(() => pMinDelay(import('../containers/createCustomer'), 300));

export const AsyncShipment = lazy(() => pMinDelay(import('../containers/shipments'), 300));
export const AsyncCreateShipment = lazy(() => pMinDelay(import('../containers/createShipment'), 300))

export const AsyncUser = lazy(() => pMinDelay(import('../containers/users'), 300));
export const AsyncCreateUser = lazy(() => pMinDelay(import('../containers/createUser'), 300));

export const AsyncPublicLayout = lazy(() => pMinDelay(import('../layout/publicLayout'), 300));
export const AsyncAppLayout = lazy(() => pMinDelay(import('../layout/appLayout'), 300));
export const AsyncPrintLayout = lazy(() => pMinDelay(import('../layout/appLayout/PrintLayout'), 300));

export const AsyncNotFound = lazy(() => pMinDelay(import('../containers/exception/notFoundContainer'), 300))

export const AsyncInvoice = lazy(() => pMinDelay(import('../containers/invoice'), 300));
export const AsyncShippingInvoiceCreate = lazy(() => pMinDelay(import('../containers/invoice/shipping'), 300));
export const AsyncBillingInvoiceCreate = lazy(() => pMinDelay(import('../containers/invoice/billing'), 300));
export const AsyncShippingInvoicePrint1 = lazy(() => pMinDelay(import('../components/invoice/shipping/Print1'), 300));
export const AsyncShippingInvoicePrint2 = lazy(() => pMinDelay(import('../components/invoice/shipping/Print2'), 300));

export const AsyncShippingStatement = lazy(() => pMinDelay(import('../containers/statements/shipping'), 300));

export const AsyncAccount = lazy(() => pMinDelay(import('../containers/account'), 300));
export const AsyncChangePassword = lazy(() => pMinDelay(import('../containers/changePassword'), 300));

export const AsyncCompany = lazy(() => pMinDelay(import('../containers/company'), 300));
export const AsyncCreateCompany = lazy(() => pMinDelay(import('../containers/createCompany'), 300))


export const AsyncDepartment = lazy(() => pMinDelay(import('../containers/department'), 300));
export const AsyncCreateDepartment = lazy(() => pMinDelay(import('../containers/createDepartment'), 300));

// import { lazy } from 'react';

// export const AsyncLogin = lazy(() => import('../containers/login'));
// export const AsyncDashboard = lazy(() => import('../containers/dashboard'));
// export const AsyncSettings = lazy(() => import('../containers/settings'));

// export const AsyncSupplier = lazy(() => import('../containers/suppliers'));
// export const AsyncCreateSupplier = lazy(() => import('../containers/createSupplier'))

// export const AsyncProduct = lazy(() => import('../containers/products'));
// export const AsyncCreateSampleQuote = lazy(() => import('../containers/createSampleQuote'));
// export const AsyncProductDetail = lazy(() => import('../containers/productDetail'));

// export const AsyncCustomer = lazy(() => import('../containers/customers'));
// export const AsyncCreateCustomer = lazy(() => import('../containers/createCustomer'));

// export const AsyncShipment = lazy(() => import('../containers/shipments'));
// export const AsyncCreateShipment = lazy(() => import('../containers/createShipment'))

// export const AsyncUser = lazy(() => import('../containers/users'));
// export const AsyncCreateUser = lazy(() => import('../containers/createUser'));

// export const AsyncPublicLayout = lazy(() => import('../layout/publicLayout'));
// export const AsyncAppLayout = lazy(() => import('../layout/appLayout'));

// export const AsyncNotFound = lazy(() => import('../containers/exception/notFoundContainer'))

// export const AsyncInvoice = lazy(() => import('../containers/invoice'));
// export const AsyncShippingInvoiceCreate = lazy(() => import('../containers/invoice/shipping'));
// export const AsyncBillingInvoiceCreate = lazy(() => import('../containers/invoice/billing'));

// export const AsyncShippingStatement = lazy(() => import('../containers/statements/shipping'));

// export const AsyncAccount = lazy(() => import('../containers/account'));
// export const AsyncChangePassword = lazy(() => import('../containers/changePassword'));

// export const AsyncCompany = lazy(() => import('../containers/company'));
// export const AsyncCreateCompany = lazy(() => import('../containers/createCompany'))


// export const AsyncDepartment = lazy(() => import('../containers/department'));
// export const AsyncCreateDepartment = lazy(() => import('../containers/createDepartment'));