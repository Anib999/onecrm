//export const DEV_URL = process.env.REACT_APP_API_DOMAIN;
export const DEV_URL = 'http://lunivacare.ddns.net/LunivaCRMApi/';

export const BASE_URL = `${DEV_URL}Api/`

// export const BASE_URL = 'https://dev.ktmlabs.com/nathm/api/provinces'
// export const BASE_URL = 'https://api.github.com/users/hacktivist123'
export const login = 'login';

export const fetchCustomer = 'GetlistOfClientsByClientId';
export const createCustomer = 'InsertUpdateClientDetails';
export const updateCustomer = 'InsertUpdateAppUsers';
export const createUpdateCustomerAddress = 'InsertUpdateClientAddress';
export const getAddressListByCustomerId = 'GetListOfClientAddressByClientId';

export const fetchSupplier = 'GetlistOfAllSupplierDetails';
export const createSupplier = 'InsertUpdateSuppliers';
export const updateSupplier = 'InsertUpdateSuppliers';

export const fetchProducts = 'GetlistOfAllProducts';
export const createProduct = '';
export const updateProduct = '';
export const createUpdateProduct = 'InsertUpdateProductDetails';
export const getProductDetailByProductId = 'GetlistOfAllProductsByProductId'
export const createUpdateSupplierForQuotation = 'InsertUpdateSupplierForQuotationOfSample';
export const getProductDetail = 'GetDetailsofProductByProductId';
export const getProductDetailByClientId = 'GetDetailsofProductByClientId';
export const getProductDetailByClientIdWithCount = 'GetListOfAllProductDetailsByClientIdWithCount';

export const statusList = 'GetListOfStatus';
export const difficultyList = 'GetListOfDifficultyLevel';
export const addressList = 'GetAddressType';

// export const insertProductForShipment = 'InsertProductForShipment';
export const InsertUpdateProductShipment = 'InsertUpdateProductShipment';
export const InsertUpdateShipmentProdcutDetails = 'InsertUpdateShipmentProdcutDetails';
export const GetShipmentBillByBillId = 'GetShipmentBillByBillId';
export const GetListOfShippingItemsByShipId = 'GetListOfShippingItemsByShipId';