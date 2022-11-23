import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import AppTable from '../../common/table/table';
import AppSpinner from "../../common/spinner";
import { useHistory } from 'react-router-dom';
import { Empty } from "antd";

const BillingTab = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoading, setLoading] = useState(false);
    const [newData, setNewData] = useState([]);

    if (isLoading) {
        return <AppSpinner />;
    }

    const columns = [
        {
            title: 'Client Name',
            dataIndex: 'ClientName',
        },
        {
            title: 'Sub Total',
            dataIndex: 'SubTotal',
        }
    ]


    return (
        <>
            {newData.length !== 0 ?
                (<AppTable
                    columns={columns}
                    dataSource={newData}
                    loading={isLoading}
                />)
                :
                (<Empty></Empty>)
            }
        </>

    )

}

export default BillingTab