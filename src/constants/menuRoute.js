import Home from '../assets/icons/home.svg';
import Product from '../assets/icons/product.svg';
import Suppliers from '../assets/icons/suppliers.svg';
import Customer from '../assets/icons/customer.svg';
import Setting from '../assets/icons/settings.svg';
import Invoice from '../assets/icons/invoice.svg';
import Approved from '../assets/icons/approved.svg';
import Users from '../assets/icons/users.svg';
import User from '../assets/icons/user.svg';
// import { FiSettings } from "react-icons/fi";
import Company from '../assets/icons/company.svg';
import Department from '../assets/icons/department.svg';
// for side bar change overflow-x to hidden and overflow-y to auto
const menuRoute = [
  {
    key: 'dashboard',
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'icon icon-home',
    svg: Home
  },
  {
    key: 'products',
    name: 'Products',
    path: '/products',
    icon: 'icon icon-product',
    svg: Product
  },
  {
    key: 'suppliers',
    name: 'Suppliers',
    path: '/suppliers',
    icon: 'icon icon-supplier',
    svg: Suppliers
  },
  {
    key: 'customers',
    name: 'Customers',
    path: '/customers',
    icon: 'icon icon-user',
    svg: Customer
  },
  {
    key: 'shipments',
    name: 'Shipments',
    path: '/shipments',
    icon: 'icon icon-user',
    svg: Approved
  },
  {
    key: 'invoices',
    name: 'Invoice',
    path: '/invoices',
    icon: 'icon icon-user',
    svg: Invoice
  },
  {
    key: 'settings',
    name: 'Settings',
    path: '/settings',
    icon: 'icon icon-setting',
    svg: Setting,
    subMenu: [
      {
        key: 'account',
        name: 'Account',
        path: '/settings/account/overview',
        icon: 'icon icon-user',
        svg: User
      },
      {
        key: 'users',
        name: 'Users',
        path: '/settings/users',
        icon: 'icon icon-user',
        svg: Users
      },
      {
        key: 'company',
        name: 'Company',
        path: '/settings/company',
        icon: 'icon icon-user',
        svg: Company
      },
      {
        key: 'department',
        name: 'Department',
        path: '/settings/department',
        icon: 'icon icon-user',
        svg: Department
      },


    ]
  },
]

export default menuRoute;