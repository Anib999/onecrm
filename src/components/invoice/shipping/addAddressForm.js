import React, { useState, useEffect } from 'react'
import AppModal from '../../common/modal/modal';
import AppTable from '../../common/table/table';
// import { Form, Input, InputNumber, Select, Row, Col } from 'antd';
import AppButton from '../../common/button/button';

const AddAddressForm = (props) => {
    const { visible, hideAddressForm, handleAddressAdd, addressList, retInd } = props;
    const [isLoading, setLoading] = useState(false);
    const [selectInd, setSelectInd] = useState();

    const columns = [
        {
            title: 'Address 1',
            dataIndex: 'Address1',
        },
        {
            title: 'Address 2',
            dataIndex: 'Address2',
        },
        {
            title: 'City',
            dataIndex: 'City',
        },
        {
            title: 'City',
            dataIndex: 'City',
        },
        {
            title: 'Action',
            dataIndex: '',
            render: (text, data, index) => {
                return(
                    <AppButton
                    className="btn-primary btn-primary--outline"
                    onClick={ () => {
                        setSelectInd(index);
                        hideAddressForm(false)
                     }}
                >
                    Add
                </AppButton>
                )
            }
        }
    ]

    useEffect(() => {
        retInd(selectInd)
    }, [selectInd])


    return (
        <AppModal
            visible={visible}
            title="Select Address"
            onCancel={hideAddressForm}
        >
            <AppTable
                columns={columns}
                dataSource={addressList}
                loading={isLoading}
            />
        </AppModal>
    )

}

export default AddAddressForm
