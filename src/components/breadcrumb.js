import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Breadcrumb } from 'antd';
import { useHistory } from 'react-router-dom';
import { FiChevronRight } from "react-icons/fi";
import { useTranslation } from 'react-i18next';

const BreadCrumb = ({ match }) => {
  const history = useHistory();
  let [crumb, setCrumb] = useState([]);
  const [t] = useTranslation();

  useEffect(() => {
    let arr = []

    let path = history.location.pathname.split('/');
    path.forEach((item, itemIndex) => {
      if (item !== "") {
        if (item === 'product') {
          arr.push({ label: 'products', link: '/products' });
          return
        }
        if ((item === 'account') || (item === 'settings') || (path.length === itemIndex + 1) || (item === 'edit')) {
          //THESE ARE THE ONES THAT DONT HAVE THEIR INDIVIDUAL PAGE
          arr.push({ label: item, link: '#' })
          return;
        }
        arr.push({ label: item, link: `/${item}` })
      }
    })
    setCrumb(arr);
  }, [history])

  const renderBreadCrumb = crumb.map((bread, index) => {
    return (
      <Breadcrumb.Item className="breadcrumb" key={bread.label}>
        <Link to={bread.link} >{t(bread.label)}</Link>
      </Breadcrumb.Item>
    )
  })


  return (
    <>
      <Breadcrumb separator={<FiChevronRight />}>
        <Breadcrumb.Item><Link to="/">{t('home')}</Link></Breadcrumb.Item>
        {renderBreadCrumb}
      </Breadcrumb>
    </>
  )
}

export default withRouter(BreadCrumb)