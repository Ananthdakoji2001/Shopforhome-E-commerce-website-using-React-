import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getUser } from './apiAdmin';


const ManageUser = () => {
  const [users, setUsers] = useState([]);

  const { user, token } = isAuthenticated();

  const loadUsers = () => {
    getUser().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
  };


  useEffect(() => {
    loadUsers();
  }, []);


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
 
          <li className='list-group-item' style={{background:'#D1ECF1'}}>
            <Link className='nav-link alert-info' to='/admin/orders'>
              View Orders
            </Link>
          </li>

          <li className='list-group-item' style={{background:'#D1ECF1'}}>
            <Link className='nav-link alert-info' to='/admin/stocks'>
              Product Stock
            </Link>
          </li>
 

          <li className='list-group-item active' style={{background:'#D1ECF1'}}>
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

  return (
    <div>
    <Layout
      title='Manage Discount'
      className='container-fluid'
    >
      <div className='row'>
      <div className='col-md-3'>{adminLinks()}
        <div className='col-md-9'></div>
        </div>
        <div className='col-md-9'>
        <div className='col-12'>
          <ul className='list-group-item'>
            {users.map((p, i) => (
              <li
                key={i}
                className=' bg-light p-1 mt-3 d-flex justify-content-around align-items-center '
              >
                <label>{p.name}</label>
                <Link to={`/updateDiscount/${p._id}`}>
                  Add Discount Coupon %
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
    </Layout>
    </div>
  );
};

export default ManageUser;
