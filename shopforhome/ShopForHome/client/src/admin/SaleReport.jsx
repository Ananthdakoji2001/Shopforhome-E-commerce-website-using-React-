import React from 'react'
import { listData } from './apiAdmin';
import { useState } from 'react';
import Table from 'react-bootstrap/esm/Table';
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
// import Table from 'react-bootstrap/Table'

export default function SaleReport() {
	const [data, setData] = useState([]);

	const [values, setValues] = useState({
		fromDate: '',
		toDate: '',
		error: '',
		loading: false,
	});
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
	
			  <li className='list-group-item active'  style={{background:'#D1ECF1'}}>
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

	const { fromDate, toDate, loading, error, } = values;

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault(); // so that browser does not reload
		setValues({ ...values, error: false, loading: true });
		console.log(fromDate)

		listData({ values }).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setData(data);
			}
		});
	}


	return (
		<Layout
			title='Product Sale Report'
			description='All products Stocks'
			className='container-fluid'
		>
			<div className='row' >
				<div className='col-md-3'>{adminLinks()}</div>
				<div className='col-md-9'>
				<div style={{marginTop:"30px"}}>
				<form>
					<label >
						From:
						<input type="date" name='fromDate' onChange={handleChange('fromDate')} value={fromDate} />
					</label>
					<label>
						To:
						<input type="date" name='toDate' onChange={handleChange('toDate')} value={toDate} />
					</label>
					<button onClick={handleSubmit}>show</button>
				</form>
			</div>
			<div>
				<table class="table">
					<thead>
						<tr>
							<th scope="col">Name</th>
							<th scope="col">Name</th>
							<th scope="col">sold</th>
							<th scope="col">Price</th>
							<th scope="col">Total</th>
							<th scope="col" >quantity</th>
						</tr>
					</thead>
					<tbody>
						{data.map((list, index) => (
							<tr key={index}>
								<td >{list.name}</td>
								<td >{list.sold}</td>
								<td >{list.price}</td>
								<td >{list.sold * list.price}</td>
								<td >{list.quantity}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
				</div>
			</div>
			
		</Layout>
	)
}
