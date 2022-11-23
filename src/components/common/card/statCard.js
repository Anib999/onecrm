import React from 'react'

const StatCard = (props) => {
  const { title, value, onClick } = props;

  return (
    <div className="stat-card" onClick={onClick}>
      {props?.children ?
        <div className="children" onClick={props?.onclick}>
          {props?.children}
        </div>
        :
        <>
          <span className="title">{title}</span>
          <span className="value">{value}</span>
        </>
      }
    </div>
  )
}

export default StatCard
