import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
// import { isAuthenticated } from '../auth';
import {  Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {  readUser, updateUserA } from '../user/apiUser';

const UpdateUser = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    discount_coupon:'',

    error: false,
    success: false,
  });


  const { name, email, password, error, success,discount_coupon } = values;

  const init = (userId) => {

    readUser(userId).then((data) => {
        console.log(data)
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name, email: data.email, discount_coupon: data.discount_coupon });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId);
  }, []);

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    updateUserA(match.params.userId, { name, email, password,discount_coupon }).then(
      (data) => {
        if (data.error) {
   
          alert(data.error);
        } else {
         
          setValues({...values,
            name: data.name,
            email: data.email,
            discount_coupon: data.discount_coupon,
            success: true,})
        }
      }
    );
  };

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to='/admin/ManageUser' />;
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
  const profileUpdate = (name, email, password,discount_coupon) => (
    <form className='bg-light p-5 mt-3'>
    <h2 className='mb-4 text-center'>Profile update</h2>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          type='text'
          onChange={handleChange('name')}
          className='form-control'
          value={name}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          type='email'
          onChange={handleChange('email')}
          className='form-control'
          value={email}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          type='password'
          onChange={handleChange('password')}
          className='form-control'
          value={password}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>discount_coupon</label>
        <input
          type='number'
          onChange={handleChange('discount_coupon')}
          className='form-control'
          value={discount_coupon}
        />
      </div>
      

      <button onClick={clickSubmit} className='btn btn-success'>
        Submit
      </button>
    </form>
  );

  return (
    <Layout
      title='Profile'
      description='Update your User Data'
      className='container-fluid'
    >
       <div className='row'>
      <div className='col-md-3'>{adminLinks()}</div>
        <div className='col-md-9'>{profileUpdate(name, email, password, discount_coupon)}
      {redirectUser(success)}</div>

        </div>

    </Layout>
  );
};

export default UpdateUser;
