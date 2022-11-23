import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';
import { FaSortDown } from 'react-icons/fa';
import AppModal from '../modal/modal';
import EditMemoForm from '../../productDetail/sections/editMemoForm';

const ProductActionButton = ({ actions, data, menuList, getButtonAction, showEdit, editTableItem, productId, getProductDetail }) => {
  const [showEditMemoForm, setEditMemoForm] = useState(false);

  const menu = (
    <Menu>
      {menuList?.map(menu => {
        return (
          <Menu.Item key="0">
            <Link onClick={() => getButtonAction(menu?.action)}>{menu.name}</Link>
          </Menu.Item>
        )
      })}
      {showEdit &&
        <>
          <Menu.Divider />
          <Menu.Item key="3" onClick={() => {
            setEditMemoForm(true);
            // editTableItem(data);
          }}>Edit Memo</Menu.Item>
        </>
      }
    </Menu>
  );

  return (
    <div className="product-actions">
      {/* <Link onClick={() => getButtonAction(menuList ? menuList[0]?.action : '')}> */}
        {/* {menuList ? menuList[0]?.name : ''} */}
        {/* Edit
      </Link> */}
      {/* {menuList.length > 1 && */}
      {/* <Dropdown overlay={menu} trigger={['click']}>
        <div className="more-btn">
          <FaSortDown />
        </div>
      </Dropdown> */}
      {/* } */}
      <Menu>
      {
        showEdit && <Menu.Item key='3' onClick={()=>{
        setEditMemoForm(true)
      }}>
        Edit memo
      </Menu.Item>
      // this change for memo color
      }

      </Menu>

      {showEdit &&
        <AppModal
          title="Edit Memo"
          onCancel={() => setEditMemoForm(false)}
          visible={showEditMemoForm}>
          <EditMemoForm
            productId={productId}
            supplierDataForEdit={data}
            successCallback={() => {
              setEditMemoForm(false);
              getProductDetail();
            }}
          />
        </AppModal>
      }
    </div>
  )
}

export default ProductActionButton
