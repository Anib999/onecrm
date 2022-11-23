import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { fetchProductApi, fetchProductDetApi } from '../../../services/billShipmentService';
import { getAddressListByCustomerIdApi, getCustomerDetailApi, getCustomerDetailForShipping } from '../../../services/customerService';
import './print.css'



const Print2 = () => {
  const [clientId, setClientId] = useState();
  const [clientCode, setClientcode] = useState();
  const [clientName, setClientName]= useState();
  const [clientAddress, setClientAddress] = useState();
  const [addressOne, setAddressOne] = useState();
  const [addressTwo, setAddressTwo] = useState()
  const [cityName, setCityName] = useState()
  const [clientPhoneNumber, setClientPhoneNumber]= useState();
  const [billDate, setBillDate] = useState([]);
  const [billList, setBillList] = useState([]);
  const [total, setTotal] = useState();
  const [tax, setTax] = useState();
  
  // console.log("this is bills", billList)

  const dispatch = useDispatch();
  const params = useParams();
  const sId= params.id;

// product call
  const productApiCall = () => {
    dispatch(fetchProductApi(sId, (response) => {
      let respon = response[0];
      let cuI = respon?.ClientId;      
      setClientId(cuI);
      clientApiCall(cuI);
      clientAddressCall(cuI, respon.ShippingAddress);
      let bDate = respon.BillDate;
      BillDate(bDate);
      setTax(respon.Tax);
      setTotal(respon.TotalCost);
     dispatch(fetchProductDetApi(sId, (response) => {
      setBillList(response);
    }, ()=> {})) 
    },
    () => {}))
  }

  // client data call or costumer call
  const clientApiCall = (cuI) =>{
    dispatch(getCustomerDetailForShipping(cuI, (response) => {
    
      // console.log("this is datar",response.payload.data)
      setClientcode(response.payload.data.cltClientCode);
      setClientName(response.payload.data.cltClientName);
      // setTax(response.payload.data.Tax);
      
   
    }, ()=> {}))
  }

  // client address call//
  const clientAddressCall = (cuI, ind=0) => {
    dispatch(getAddressListByCustomerIdApi(cuI, (response)=> {
      
      // setClientAddress()
      let respon = response[ind];
      // console.log("this is ccostomet address", respon);
      setClientAddress(respon.AddressName);
      setAddressOne(respon.Address1);
      setAddressTwo(respon.Address2);
      setCityName(respon.City)
      setClientPhoneNumber(respon.TelephoneNo);
      

    }, ()=>{}))
  }

  const BillDate = (bDate) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Thirsday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let arr = bDate.split("T");
    let a = new Date(arr[0]);
  
    let dayName = days[a.getDay()];
    let monthName = months[a.getMonth()];
    let date = a.getDate();
    let year = a.getFullYear();

    setBillDate([dayName, monthName, date, year]);
    
  }

  const CheckLoadWindow = () => {
    window.print();
  }

  useEffect(() => {
    productApiCall();
    setTimeout(CheckLoadWindow, 1500);
  }, []);





  return (
    <div className='print-container'>
      <div className="top">
        <div className="content">
          <h3>Client Address and Company</h3>
          <p>{clientCode}</p>
          <p>{clientName}</p>
          <p>{clientAddress},{cityName}</p>
          <p><span>Address 1:</span>{addressOne} </p>
          <p><span>Address 2:</span>{addressTwo} </p>
          <p><span>tel:</span> {clientPhoneNumber}</p>
          <p><span>fax:</span> {clientPhoneNumber}</p>
        </div>
        <div className="content">
          <h1>Shipment Invoice</h1>
        </div>
        <div className="content">
          <p><span>Date of issues:</span> {billDate[0]}, {billDate[1]} {billDate[2]},{billDate[3]}, </p>
          <div className="table">
            <table>
              <tr>
                <th>Invoice Number</th>
                <th>Representative</th>
              </tr>
              <tr>
                <td>A2151213</td>
                <td>Sigma company</td>
              </tr>
            </table>
          </div>
          
          <p></p>
        </div>
      </div>
      
      <div className="bot">
        <div className="table">
          <tr>
            <th width={"8%"}>SN</th>
            <th width={"12%"}>Product Number</th>
            <th width={"15%"}>Product Name</th>
            <th width={"15%"}>Quantity</th>
            <th width={"10%"}>Unit Price</th>
            <th width={"10%"}>Net Price</th>
            <th width={"30%"}>Remarks</th>
          </tr>
          
          {
            billList.map(e => (
              <tr>
                <td>{e.SDetailsId}</td>
                <td>{e.ProductId}</td>
                <td>{e.ProductName}</td>
                <td>{e.quantity}</td>
                <td>{e.unitPrice}</td>
                <td>{e.netPrice}</td>
                <td>{e.remarks}</td>
                {/* {console.log(e)} */}
              </tr>
              
            ))
          }
          <tr>
            
            <td></td>
            <td></td>
            <th>Total</th>
            <td>Tax included: {tax}</td>
            <td>Costome Tax rate: 10%</td>
            <td>Amount: {total}</td>
            <td></td>
          </tr>
       
          
        </div>
      </div>

    </div>
  )
}

export default Print2

// getCustomerDetailApi
//dispatch(getAddressListByCustomerIdApi(cust,
  // fetchProductApi
  //fetchProductDetApi