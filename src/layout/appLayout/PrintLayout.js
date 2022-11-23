import { Layout } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React from 'react'

const PrintLayout = (props) => {
  return (
    <Layout id="app-layout"> 
        <Content>
          {props?.children}
        </Content>
    </Layout>
  )
}

export default PrintLayout