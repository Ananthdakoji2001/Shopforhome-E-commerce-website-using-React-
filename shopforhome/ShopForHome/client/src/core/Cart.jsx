import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';
import Button from 'react-bootstrap/Button'


import { isAuthenticated } from '../auth';
import { read} from '../user/apiUser';
import "../css/cart.css"
const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

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
    

  const showItems = (items) => {
    return (
      <div class="container">
        <h2 className="head">Cart has {`${items.length}`} items</h2>
        <hr />
        <div className="row">
          
        {items.map((product, i) => (
          <div className="col-6">
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
          </div>
          
        ))}
        
        </div>
      </div>
    );
  };

  const noItemsMessage = () => (
    <div>
    <h2 class="head">
      Your cart is empty
    </h2>
    <Link to='/shop'>Continue shopping  >></Link>
    </div>
  );

  return (
    <Layout
      title='Shopping Cart'
      description='Manage your cart items. Add remove checkout or continue shopping.'
      className='container-fluid'
    >
      <div className='cart'>
        <div className='cartproducts'>
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className='cartsummary'>
          <h2 className='head'>Your cart summary: </h2>
          <div>
          <button type="button" onClick={loadData} class="btn btn-outline-warning">Apply Your Discount</button>
          {data?<p>You have {data.discount_coupon}% OFF discount</p>:<p>No Coupons</p>}
          </div>
          <hr />
          <Checkout products={items} setRun={setRun} run={run} discount1={data.discount_coupon}/>
          
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
