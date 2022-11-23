import React from 'react';
import { Layout } from 'antd';
import AppHeader from '../header';
import AppSideNav from '../sideNav';
// import SettingNav from '../sideNav/settingsNav';
import ErrorBoundary from '../../utils/errorBoundary';

const { Content } = Layout;

const AppLayout = (props) => {
  return (
    <Layout id="app-layout">
      <AppHeader />
      <ErrorBoundary key="sidenav">
        <AppSideNav />
      </ErrorBoundary>
      <Layout className="main-app-layout">
        {props?.secondaryNav &&
          props?.secondaryNavigation
        }
        <Content>
          {props?.children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout;