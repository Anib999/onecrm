import React from 'react';
// import menuRoutes from '../../constants/menuRoute';
import { Layout, Menu } from "antd";
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import settingRoute from '../../constants/settingRoute';

const { Sider } = Layout;


const SettingsNav = (props) => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <Sider
      style={{
        backgroundColor: '#FFFFFF',
      }}
      className="sidebar settings-sidebar">
      <h2>Settings</h2>
      <Menu
        mode="inline"
        theme="light"
        defaultSelectedKeys={[history?.location?.pathname?.split('/')[1]]}
        className="side-menu">
        {settingRoute?.map(item => {
          return (
            <Menu.Item
              key={item.key}
              className="side-menu__item"
            >
              <NavLink to={item.path} className="nav-link">
                <span className={item.icon}></span>
                <span className="">{t(item.key)}</span>
              </NavLink>
            </Menu.Item>
          )
        })
        }
      </Menu>
    </Sider >
  )
}

export default SettingsNav;