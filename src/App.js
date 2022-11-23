import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PublicRoute from './routes/publicRoute';
import PrivateRoute from './routes/privateRoute';
import { AsyncLogin, AsyncPublicLayout, AsyncDashboard, AsyncAppLayout, AsyncSupplier, AsyncProduct, AsyncCreateSampleQuote, AsyncCreateSupplier, AsyncCustomer, AsyncCreateCustomer, AsyncProductDetail, AsyncShipment, AsyncCreateShipment, AsyncUser, AsyncCreateUser, AsyncNotFound, AsyncInvoice, AsyncShippingInvoiceCreate, AsyncBillingInvoiceCreate, AsyncShippingStatement, AsyncAccount, AsyncChangePassword, AsyncCompany, AsyncCreateCompany, AsyncDepartment, AsyncCreateDepartment, AsyncShippingInvoicePrint, AsyncPrintLayout, AsyncShippingInvoicePrint1, AsyncShippingInvoicePrint2 } from './app/asyncComponent';
import Spinner from './components/common/spinner';

function App() {
  return (
    <Suspense
      fallback={
        <div className="fallback-container">
          <div>
            <Spinner />
          </div>
          <div>Loading..</div>
        </div>
      }
    >
      <Switch>
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
        <PrivateRoute
          exact
          path='/dashboard'
          component={AsyncDashboard}
          layout={AsyncAppLayout}
        />

        <PublicRoute
          exact
          path='/login'
          component={AsyncLogin}
          layout={AsyncPublicLayout}
        />

        <PrivateRoute
          exact
          path='/product/create'
          component={AsyncCreateSampleQuote}
          layout={AsyncAppLayout}
        />
        <PrivateRoute
          exact
          path='/product/edit/:id'
          component={AsyncCreateSampleQuote}
          forEdit
          layout={AsyncAppLayout}
        />

        <PrivateRoute
          exact
          path='/product/:id'
          component={AsyncProductDetail}
          layout={AsyncAppLayout}
        />
        <PrivateRoute
          path='/products/:slug?'
          component={AsyncProduct}
          layout={AsyncAppLayout}
        />




        <PrivateRoute
          exact
          path='/products/:id/invoice/shipping'
          component={AsyncProductDetail}
          layout={AsyncAppLayout}
        />

        <PrivateRoute
          exact
          path='/suppliers'
          component={AsyncSupplier}
          layout={AsyncAppLayout}
        />

        <PrivateRoute
          exact
          path='/suppliers/edit/:slug/:id'
          component={AsyncCreateSupplier}
          forEdit
          layout={AsyncAppLayout}
        />

        <PrivateRoute
          exact
          path='/shipments'
          component={AsyncShipment}
          layout={AsyncAppLayout}
        />

        <PrivateRoute
          exact
          path='/shipments/create'
          component={AsyncCreateShipment}
          layout={AsyncAppLayout}
        />

        <PrivateRoute
          exact
          path='/invoices'
          component={AsyncInvoice}
          layout={AsyncAppLayout}
        />

        <PrivateRoute
          exact
          path='/invoices/shipping/create'
          component={AsyncShippingInvoiceCreate}
          layout={AsyncAppLayout}
        />

        {/* new added here check */}
        <PrivateRoute
          exact
          path='/invoices/shipping/edit/:id'
          component={AsyncShippingInvoiceCreate}
          forEdit
          layout={AsyncAppLayout}
        />

        <PrivateRoute
          exact
          path='/invoices/billing/create'
          component={AsyncBillingInvoiceCreate}
          layout={AsyncAppLayout}
        />

        <PrivateRoute
          exact
          path='/suppliers/create'
          component={AsyncCreateSupplier}
          layout={AsyncAppLayout}
        />

        <PrivateRoute
          exact
          path='/customers'
          component={AsyncCustomer}
          layout={AsyncAppLayout}
        />

        <PrivateRoute
          exact
          path='/customers/create'
          component={AsyncCreateCustomer}
          layout={AsyncAppLayout}
        />

        <PrivateRoute
          exact
          path='/customers/edit/:slug/:id'
          component={AsyncCreateCustomer}
          forEdit
          layout={AsyncAppLayout}
        />

        <PrivateRoute
          exact
          path='/shipping'
          component={AsyncShippingStatement}
          layout={AsyncAppLayout}
        />

        {/* <PrivateRoute
          exact
          path='/settings'
          component={AsyncSettings}
          layout={AsyncAppLayout}
          secondaryNav
        /> */}

        <PrivateRoute
          exact
          path='/settings/users'
          component={AsyncUser}
          layout={AsyncAppLayout}
        />

        <PrivateRoute
          exact
          path='/settings/users/create'
          component={AsyncCreateUser}
          layout={AsyncAppLayout}
        />
        <PrivateRoute
          exact
          path='/settings/users/edit/:id'
          component={AsyncCreateUser}
          layout={AsyncAppLayout}
          forEdit
        />

        <PrivateRoute
          exact
          path="/settings/account/overview"
          component={AsyncAccount}
          layout={AsyncAppLayout}
        />

        <PrivateRoute
          exact
          path="/settings/account/change-password"
          component={AsyncChangePassword}
          layout={AsyncAppLayout}
        />
        <PrivateRoute
          exact
          path="/settings/company"
          component={AsyncCompany}
          layout={AsyncAppLayout}
        />
        <PrivateRoute
          exact
          path="/settings/company/create"
          component={AsyncCreateCompany}
          layout={AsyncAppLayout}
        />
        <PrivateRoute
          exact
          path="/settings/company/edit/:id"
          component={AsyncCreateCompany}
          layout={AsyncAppLayout}
          forEdit
        />

        <PrivateRoute
          exact
          path="/settings/department"
          component={AsyncDepartment}
          layout={AsyncAppLayout}
        />
        <PrivateRoute
          exact
          path="/settings/department/create"
          component={AsyncCreateDepartment}
          layout={AsyncAppLayout}
        />
        <PrivateRoute
          exact
          path="/settings/department/edit/:id"
          component={AsyncCreateDepartment}
          layout={AsyncAppLayout}
          forEdit
        />

<PrivateRoute
          exact
          path="/settings/shipment/print1/:id"
          component={AsyncShippingInvoicePrint1}
          layout={AsyncPrintLayout}
          forEdit
        />
        <PrivateRoute
          exact
          path="/settings/shipment/print2/:id"
          component={AsyncShippingInvoicePrint2}
          layout={AsyncPrintLayout}
          forEdit
        />

        <Route component={AsyncNotFound} />
        {/* <Route
        path="/"
        component={LoginContainer}
      /> */}

      </Switch>
    </Suspense>

  )
}

export default App;
