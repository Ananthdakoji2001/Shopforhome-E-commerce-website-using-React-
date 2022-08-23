import React, { Component, useState } from 'react';
import { bulkupload } from './apiAdmin';
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API, MICROAPI } from '../config';



class App extends Component {

  state = {
    display1: false,
    selectedFile: null
  };

  onFileChange = event => {
    event.preventDefault();


    this.setState({ selectedFile: event.target.files[0] });

  };


  adminLinks = () => {
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

          <li className='list-group-item active' style={{background:'#D1ECF1'}}>
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

  
  onFileUpload = () => {


    const formData = new FormData();

    formData.append(
      "file",
      this.state.selectedFile,
      this.state.selectedFile.name
    );


    console.log(this.state.selectedFile);

    bulkupload(formData).then((err, data) => {
      if (err) {
        console.log(err)

      }
      else {
        this.setState({ display1: true });

      }
    })

  };


  showSuccess = () => (

    <div
      className='alert alert-info'
      style={{ display: this.state.display1 == false ? 'none' : '' }}
    >
      <h2>Succesfully Update Product List</h2>
    </div>
  );

 

  bulkupload = () => {
    return (
      <div className='bg-light p-5 mt-3'>
        <div>

          <h5>Bulk Upload </h5>
          <div className='form-group'>
            <label className='btn btn-info'>
              <input
                onChange={this.onFileChange}
                type='file'
                name='photo'
              />
            </label>
          </div>
          <button onClick={this.onFileUpload} className='btn btn-success'>Upload</button>
        </div>

      </div>
    )

  }
  fileData = () => {

    if (this.state.selectedFile) {

      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {this.state.selectedFile.name}</p>


          <p>File Type: {this.state.selectedFile.type}</p>


          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>

        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {



    return (
      <Layout 
        title='bulk upload'
        description={`bulk upload`}
      >
 <div className='row'>
      <div className='col-md-3'>{this.adminLinks()}</div>
        <div className='col-md-9'>
            {this.showSuccess()}
            {this.bulkupload()}</div>

        </div>

      </Layout>

    );
  }
}

export default App;
