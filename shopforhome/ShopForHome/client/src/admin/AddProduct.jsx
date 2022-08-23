import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

import { createProduct, getCategories } from './apiAdmin';

const AddProduct = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: '',
  });

  const { user, token } = isAuthenticated();

  const {
    name,
    description,
    price,
    categories,
    // category,
    // shipping,
    quantity,
    photo,
    loading,
    error,
    createdProduct,
    // redirectToProfile,
    formData,
  } = values;

  // load categories and set form data
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          photo: '',
          price: '',
          quantity: '',
          loading: false,
          createdProduct: data.name,
        });
      }
    });
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

          <li className='list-group-item ' style={{background:'#D1ECF1'}}>
            <Link className='nav-link alert-info' to='/admin/products'>
              Manage Products
            </Link>
          </li>

          <li className='list-group-item'  style={{background:'#D1ECF1'}}>
            <Link className='nav-link alert-info' to='/create/category'>
              Create category
            </Link>
          </li>

          <li className='list-group-item active' style={{background:'#D1ECF1'}}>
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

  
  const newPostForm = () => (

    <form className='bg-light p-4 mt-3' onSubmit={clickSubmit}>
    <div className='form-group'>
        <label >Category</label>
        <select onChange={handleChange('category')} className='form-control'>
          <option>Please select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className='form-group'>
        <label >Name</label>
        <input
          onChange={handleChange('name')}
          type='text'
          className='form-control'
          value={name}
        />
      </div>
      
      <div className='form-group'>
        <label>Description</label>
        <textarea
          onChange={handleChange('description')}
          className='form-control'
          value={description}
        />
      </div>

      <div className='form-group'>
        <label>Price</label>
        <input
          onChange={handleChange('price')}
          type='number'
          className='form-control'
          value={price}
        />
      </div>

      <div className='form-group'>
        <label >Shipping</label>
        <select onChange={handleChange('shipping')} className='form-control'>
          <option>Please select</option>
          <option value='1'>Yes</option>
          <option value='0'>No</option>
        </select>
      </div>

      <div className='form-group'>
        <label >Quantity</label>
        <input
          onChange={handleChange('quantity')}
          type='number'
          className='form-control'
          value={quantity}
        />
      </div>

      <label>Upload Photo</label>
      <div className='form-group'>
        <label className='btn btn-info'>
          <input
            onChange={handleChange('photo')}
            type='file'
            name='photo'
            accept='image/*'
          />
        </label>
      </div>

      <button className='btn btn-success'>Create Product</button>
    </form>
  );

  const showError = () => (
    <div
      className='alert alert-secondary text-center'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div 
      className='alert alert-secondary text-center'
      style={{ display: createdProduct ? '' : 'none' }}
    >
      <h3>{`${createdProduct}`} created</h3>
    </div>
  );
    
  const showLoading = () =>
    loading && (
      <div className='alert alert-success'>
        <h2>Loading...</h2>
      </div>
    );

  return (
    <Layout
      title='Add a new product' 
      description={`Hey ${user.name}, ready to add a new product?`}
    >

       <div className='row'>
      <div className='col-md-3'>{adminLinks()}</div>
        <div className='col-md-9'>{showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}</div>

        </div>
    </Layout>
  );
};

export default AddProduct;
