import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';


import { read} from './apiUser';

const Dashboard = () => {
  const [history, setHistory] = useState([]);

  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const [data, setData] = useState([]);

  
    const loadData = () => {
      if(isAuthenticated()){
        const {
          user: { _id },
        } = isAuthenticated();
        const token = isAuthenticated().token;
    
  

      read(_id,token).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setData(data);
        }
      });
    }
    };

  const token = isAuthenticated().token;



  const userLinks = () => {
    return (
      <div >
        <ul className='list-group'>
          <li className='list-group-item' style={{background:'#E2E3E5'}}> <h4 className=' text-center' >User links</h4>
            <Link className='nav-link alert-secondary' to='/cart'>
              My cart
            </Link>
          </li>
          <li className='list-group-item' style={{background:'#E2E3E5'}}>
            <Link className='nav-link alert-secondary' to={`/profile/${_id}`}> 
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

 
  const userInfo = () => {
    return (
      
      <div className=' mb-5 mt-3' >
      
        <h3 className='-'>User information</h3>
        <ul className='list-group'>
          <li className='list-group-item'>Name: {name}</li>
          <li className='list-group-item'>Email: {email}</li>
          <li className='list-group-item'>Discount: {data.discount_coupon}%</li>
          <li className='list-group-item'>
            {role === 1 ? 'Admin' : 'Registered user'}
          </li>
        </ul>
      </div>
    );
  };

  const userDetails = (history) => {
    return (
<section className="h-100 gradient-custom-2">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-lg-3 col-xl-5">
        <div className="card">
          <div className="rounded-top d-flex flex-row" style={{background: "#E2E3E5"}}>

            <div className="m-auto text-dark"  >
              <h4 >Welcome {name}</h4>
              <p className='text-center font-italic '>User</p>
            </div>
          </div>

          <div className="p-4 text-black">
            <div >
              <div >
              <h5 className="font-italic mb-1">Name: {name}</h5>
                <h5 className="font-italic mb-1">Email: {email}</h5>
                <h5 className="font-italic mb-1">Discount: {data.discount_coupon}%</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    );
  };

  return (
    <Layout
      title='Dashboard'
      description={`${name}`}
      className='container-fluid'
    >
      <div className='row'>
      <div className='col-md-3'>{userLinks()}</div>
        <div className='col-md-9'>
        
          {/* {userInfo()} */}
          {userDetails()}
        </div>
        
      </div>
    </Layout>
  );
};

export default Dashboard;
