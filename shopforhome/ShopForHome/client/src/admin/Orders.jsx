import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin';
import moment from 'moment';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);
  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h3 >Total orders: {orders.length}</h3>
      );
    } else {
      return <h3 >No orders</h3>;
    }
  };

  const adminLinks = () => {
    return (
      <div>
      <div >
        
        <ul className='list-group' >
        <li className='list-group-item text-center' style={{background:'#D1ECF1'}}><h5>Admin Portal
        <br></br>
        </h5></li>
          
        <li className='list-group-item' style={{background:'#D1ECF1'}}>
            <Link className='nav-link alert-info' to='/admin/manageUser'>
              Manage Users
            </Link>
          </li>

          <li className='list-group-item' style={{background:'#D1ECF1'}}>
            <Link className='nav-link alert-info' to='/admin/products'>
              Manage Products
            </Link>
          </li>

          <li className='list-group-item'  style={{background:'#D1ECF1'}}>
            <Link className='nav-link alert-info' to='/create/category'>
              Create category
            </Link>
          </li>

          <li className='list-group-item' style={{background:'#D1ECF1'}}>
            <Link className='nav-link alert-info' to='/create/product'>
              Create product
            </Link>
          </li>

          <li className='list-group-item' style={{background:'#D1ECF1'}}>
            <Link className='nav-link  alert-info' to='/admin/bulkupload'>
              Bulk Upload
            </Link>
          </li>
 
          <li className='list-group-item active' style={{background:'#D1ECF1'}}>
            <Link className='nav-link alert-info' to='/admin/orders'>
              View Orders
            </Link>
          </li>

          <li className='list-group-item' style={{background:'#D1ECF1'}}>
            <Link className='nav-link alert-info' to='/admin/stocks'>
              Product Stock
            </Link>
          </li>
 

          <li className='list-group-item' style={{background:'#D1ECF1'}}>
            <Link className='nav-link alert-info' to='/admin/manageDiscount'>
              Discount Section
            </Link>
          </li>
          <li className='list-group-item' style={{background:'#D1ECF1'}}>
            <Link className='nav-link alert-info' to='/admin/saleReport'>
              Sale Report
            </Link>
          </li>
          
        </ul>
      </div>
      </div>
    );
  };

  const showInput = (key, value) => (
    <div className='input-group mb-2 mr-sm-2'>
      <div className='input-group-prepend'>
        <div className='input-group-text'>{key}</div>
      </div>
      <input type='text' value={value} className='form-control' readOnly />
    </div>
  );

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log('Status update failed');
      } else {
        loadOrders();
      }
    });
   
  };


  return (
    <Layout
      title='Orders'
    
    >
      <div className='row'>
      <div className='col-md-3'>{adminLinks()}</div>
        <div className='col-md-9'>
          {showOrdersLength()}
          {orders.map((o, oIndex) => {
            return (
              <div
                className='col-md-9'
                key={oIndex}
                style={{ borderBottom: '5px solid indigo' }}
              >
                <h3 className='col-md-9'>
                  <span className='font-italic'>Order ID: {o._id}</span>
                </h3>

                <ul className='list-group col-md-9'>
             
                  <li className='list-group-item'>
                    Transaction ID: {o.transaction_id}
                  </li>
                  <li className='list-group-item'>Amount: ₹{o.amount}</li>
                  <li className='list-group-item'>
                    Ordered on: {moment(o.createdAt).fromNow()}
                  </li>
                  <li className='list-group-item'>
                    Delivery address: {o.address}
                  </li>
                </ul>

                {o.products.map((p, pIndex) => (
                  <div
                    className='mb-4'
                    key={pIndex}
                    style={{ padding: '20px', border: '1px solid indigo' }}
                  >
                    {showInput('Product name', p.name)}
                    {showInput('Product price', p.price)}
                    {showInput('Product total', p.count)}
                    {showInput('Product Id', p._id)}
                  </div>
                ))}
              </div>


            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
 