import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { getProduct, getCategories, updateProduct } from './apiAdmin';

const UpdateProduct = ({ match }) => {
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
    error: false,
    createdProduct: '',
    redirectToProfile: false,
    formData: '',
  });
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    price,
    // categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  const init = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        // populate the state
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id, 
          shipping: data.shipping,
          quantity: data.quantity,
          formData: new FormData(),
        });
        // load categories
        initCategories();
      }
    });
  };

  // load categories and set form data
  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    init(match.params.productId);
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });

    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
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
            error: false,
            redirectToProfile: true,
            createdProduct: data.name,
          });
        }
      }
    );
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
  const newPostForm = () => (
    <form className='bg-light p-4 mt-3' onSubmit={clickSubmit}>
          <div className='form-group'>
        <label className='text-muted'>Category</label>
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
        <label className='text-muted'>Name</label>
        <input
          onChange={handleChange('name')}
          type='text'
          className='form-control'
          value={name}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Description</label>
        <textarea
          onChange={handleChange('description')}
          className='form-control'
          value={description}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Price</label>
        <input
          onChange={handleChange('price')}
          type='number'
          className='form-control'
          value={price}
        />
      </div>



      <div className='form-group'>
        <label className='text-muted'>Shipping</label>
        <select onChange={handleChange('shipping')} className='form-control'>
          <option>Please select</option>
          <option value='0'>No</option>
          <option value='1'>Yes</option>
        </select>
      </div>

      <div className='form-group'>
        <label className='text-muted'>Quantity</label>
        <input
          onChange={handleChange('quantity')}
          type='number'
          className='form-control'
          value={quantity}
        />
      </div>

      <label>Upload New Photo</label>
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

      <button className='btn btn-success'>Update Product</button>
    </form>
  );

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={{ display: createdProduct ? '' : 'none' }}
    >
      <h2>{`${createdProduct}`} is updated!</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className='alert alert-success'>
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to='/' />;
      }
    }
  };

  return (
    <Layout
      title='Add a new product'
      description={`G'day ${user.name}, ready to add a new product?`}
    >
      <div className='row'>
      <div className='col-md-3'>{adminLinks()}</div>
        <div className='col-md-9'>{showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
          {redirectUser()}</div>

        </div>

    </Layout>
  );
};

export default UpdateProduct;
