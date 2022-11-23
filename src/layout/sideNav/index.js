import React from 'react';
import menuRoutes from '../../constants/menuRoute';
import { Layout, Menu, Dropdown, Button } from "antd";
import { NavLink, Link } from 'react-router-dom';
import AppLogo from '../../assets/icons/applogo.svg';
import { AiFillRightSquare } from 'react-icons/ai'
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppButton from '../../components/common/button/button';

const { Sider } = Layout;
const { SubMenu } = Menu;

const AppSideNav = (props) => {
  const history = useHistory();
  const { t, i18n } = useTranslation();


  const handleLogout = () => {
    localStorage.clear()
    history.push('/login')
  }

  const menu = (
    <Menu>

      <Menu.Item key="1" onClick={() => i18n.language === 'en' ? i18n.changeLanguage('jp') : i18n.changeLanguage('en')}>
        <span>{i18n.language === 'en' ? '日本語' : 'English'}</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <Link onClick={() => handleLogout()}>{t('logout')}</Link>
      </Menu.Item>
    </Menu >
  );

  return (
    <Sider
      style={{
        backgroundColor: '#FFFFFF',
      }}
      className="sidebar">
      <div className="top-container">
        <div className="sidebar__header">
          <div>
            <img src={AppLogo} alt="App logo" />
            <span>One's CRM</span>
          </div>
          {/* <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            <AiFillRightSquare color="#1E56A0" size={25} />
          </a>
        </Dropdown> */}
        </div>

        <Menu
          mode="inline"
          theme="light"
          defaultSelectedKeys={[history?.location?.pathname?.split('/')[1]]}
          className="side-menu">
          {menuRoutes?.map((item, itemIndex) => {
            if (item?.subMenu) {
              return (
                //FOR ITEMS THAT HAVE SUBMENU
                <>
                  {/* {item?.svg ? <img src={item?.svg} alt="icon" className="side-menu__item__icon" /> : ''} */}
                  <SubMenu key={itemIndex?.toString()} className="side-menu__sub-menu" title={item.name} icon={<img src={item?.svg} alt="icon" className="side-menu__item__icon" />}>
                    {item?.subMenu.map((subMenuItem, suMenuIndex) => {
                      return (
                        <Menu.Item key={suMenuIndex?.toString()}>
                          <NavLink to={subMenuItem?.path} className="nav-link">
                            <img src={subMenuItem?.svg} alt="icon" className="side-menu__item__icon" />
                            {subMenuItem?.name}
                          </NavLink>
                        </Menu.Item>
                      )
                    })}
                  </SubMenu>
                </>
              )
            }
            return (
              //FOR ITEMS WITHOUT SUBMENU
              <Menu.Item
                key={item.key}
                className="side-menu__item"
              >
                <NavLink to={item.path} className="nav-link">
                  {/* <span className={item.icon}></span> */}
                  <div className="menu-icon">
                    {item?.svg ? <img src={item?.svg} alt="icon" className="side-menu__item__icon" /
                    > : ''}
                  </div>
                  <div className="menu-name">
                    <span className="">{t(item.key)}</span>
                  </div>
                </NavLink>
              </Menu.Item>
            )
          })
          }
        </Menu>
      </div>
      <div className="footer">
        {/* <Link onClick={() => handleLogout()}>{t('logout')}</Link> */}
        <Button onClick={() => i18n.language === 'en' ? i18n.changeLanguage('jp') : i18n.changeLanguage('en')}>
          <span>{i18n.language === 'en' ? '日本語' : 'English'}</span>
        </Button>
        <Button
          type="dashed"
          danger
          onClick={() => handleLogout()}
        >
          Logout
      </Button>
      </div>

    </Sider >
  )
}

export default AppSideNav;