import React from 'react'
import { Empty, Button } from 'antd';

const NotFoundComponent = () => {
  return (
    <div className="page-not-found">

      <Empty
        description={
          <span>
            Sorry! The page your are looking for is not available.
            </span>
        } >
        <Button shape='round' href='/' type="primary">Go Home</Button>
      </Empty>
    </div>
  )
}

export default NotFoundComponent
