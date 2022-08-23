import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getWishlist } from './WishlistHelpers';
import Card from './Card';
import Checkout from './Checkout';
import Button from 'react-bootstrap/Button'

import { isAuthenticated } from '../auth';
import { read} from '../user/apiUser';
import { colors } from '@material-ui/core';
import "../css/cart.css"
const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getWishlist());
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
      <div>
        <h2 className='head'>Your wishlist has {`${items.length}`} items</h2>
        <hr />
        <div className="row">

        {items.map((product, i) => (
          <div className="clo-6">
          <Card
            key={i}
            product={product}
            showAddToWishlistButton={false}
            wishlistUpdate={true}
            showRemoveProductButton={false}
            
            showremoveWishListButton={true}
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
    Your Wishlist is empty
    </h2>
    <Link to='/shop'>Continue shopping  >></Link>
    </div>
  );

  return (
    <Layout
      title='Wishlist'
      description='Manage your wishlist items. Add remove checkout or continue shopping.'
      className='container-fluid'
    >
      <div className='cart'>
        <div style={{width:"100%"}}>
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;
