import React from 'react'
import { listStocks, sendmail } from './apiAdmin';
import { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table'


export default function Stocks() {
	const [data, setData] = useState([]);

	const loadData = () => {
		sendmail();
		listStocks().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setData(data);
			}
		});
	};
	useEffect(() => {
		loadData();
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

          <li className='list-group-item active' style={{background:'#D1ECF1'}}>
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


	return (
		<Layout
			title='Product Stock'
			description='All products Stocks'
			className='container-fluid'
		>

<div className='row'>
      <div className='col-md-3'>{adminLinks()}
        <div className='col-md-9'></div>

        </div>

			<div className='mt-3'>
				<Table striped bordered >
					<thead>
						<tr>
							<th>Products Name</th>
							<th>Stocks</th>
						</tr>
					</thead>
					
					<tbody>
						{data.map((list, index) => (
							<tr key={index}>
								<td >{list.name}</td>
								<td >{list.quantity}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
			
			</div>
		</Layout>
	)
}
