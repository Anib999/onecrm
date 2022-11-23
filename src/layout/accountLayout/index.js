import React, { useState, useEffect } from 'react'
import PageHeader from '../../components/common/pageHeader';
import { Row, Col, Image, Menu } from 'antd';
import { RiLockPasswordLine } from 'react-icons/ri'
import { FaRegUser } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/icons/applogo.svg';

const menus = {
  "overview": "1",
  "change-password": "2",
}

const AccountComponent = (props) => {
  const [activeMenu, setActiveMenu] = useState("1");
  const history = useHistory();
  const pathName = history.location.pathname.split('/')

  useEffect(() => {
    let currentPath = pathName[pathName.length - 1];
    setActiveMenu(menus[currentPath])
  }, [pathName])

  return (
    <>
      <PageHeader
        title="Account"
        hasBreadcrumb
      />
      <div className="account">
        <Row>
          <Col span={6} className="left-section">
            {/* <Image
              width='100%'
              src={logo}
              preview={false}
            /> */}
            <Menu
              defaultSelectedKeys={1}
              defaultOpenKeys="2"
              selectedKeys={[activeMenu]}
              onSelect={({ key }) => {
                setActiveMenu(key)
              }}
            >
              <Menu.Item
                icon={<FaRegUser size={16} />}
                key="1">
                <Link to={'/settings/account/overview'}>
                  Overview
                </Link>
              </Menu.Item>
              <Menu.Item
                icon={<RiLockPasswordLine size={16} />}
                key="2"
              >
                <Link to={'/settings/account/change-password'}>
                  ChangePassword
                </Link>
              </Menu.Item>

            </Menu>
          </Col>
          <Col span={12} className="right-section">
            {props?.children}
          </Col>
        </Row>
      </div>
    </>
  )
}

export default AccountComponent
