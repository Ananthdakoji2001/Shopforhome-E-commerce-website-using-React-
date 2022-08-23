import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';

import Button from '@material-ui/core/Button';

import CardM from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

import CssBaseline from '@material-ui/core/CssBaseline';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import { addItem, updateItem, removeItem } from './cartHelpers';

import { addWishItem,updateWishItem,removeWishItem } from './WishlistHelpers';
import { pink } from '@material-ui/core/colors';
import "../css/card.css"
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor:'#f8eeec',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  productDescription: {
    height: '100px',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Card = ({
  product,
  showViewProductButton = true,
  showAddToWishButton = true,
  showAddToCartButton = true,
  showWishList= true,
  cartUpdate = false,
  showRemoveProductButton = false,
  showremoveWishListButton = false,
  setRun = (f) => f, 
  run = undefined, 
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
 

  const addToCart = () => {

    addItem(product, setRedirect(true));
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to='/cart' />;
    }
  };

  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button type="button"  onClick={addToCart} class="btn btn-outline-light">Add to cart</button>
      )
    );
  };

  const addToWishlist = () => {
 
    addWishItem(product, setRedirect(true));
  };

  const wRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to='/wishlist' />;
    }
  };

  const showAddToWishBtn = (showAddToWishlistButton) => {
    return (
      showAddToWishlistButton && (
        
        <Link href={`/wishlist`} className='mr-2'>
          <button type="button" onClick={addToWishlist} className="btn btn fav"><FavoriteIcon style={{color: pink[500]}}/></button>
      </Link>
      )
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run); 
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <input
              type='number'
              className='form-control count'
              value={count}
              onChange={handleChange(product._id)}
            />
      )
    );
  };
 

  const removeWishListButton = (showremoveWishListButton ) => {
    return (
      showremoveWishListButton  && (
        <button type="button" onClick={() => {
          removeWishItem(product._id);
          setRun(!run); 
        }} class="btn  btn-outline-light rw">Remove</button>
      )
    );
  };
  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button type="button" onClick={() => {
          removeItem(product._id);
          setRun(!run); 
        }}
        class="btn  btn-outline-light rw">Remove</button>
      )
    );
  };

  

  const classes = useStyles();

  return (
   
    <Container>
          <CardM  className="card">
            
            {shouldRedirect(redirect)}
            {showAddToWishBtn(showAddToWishButton)}
            <div className='image'><ShowImage item={product} url='product' className="image" /></div>
            <CardContent className="card-body cont">
              <h5 class="card-title cd">{product.name}</h5>
              <h6 class="cd card-subtitle mb-2 text-muted cd">{product.description}</h6>
              <p className='card-text price'>₹{product.price}</p>
              <p className='card-text'>
                Category: {product.category && product.category.name}{' '}
              </p>{' '}
              <span>
                {showAddToCartBtn(showAddToCartButton)}
                {showRemoveButton(showRemoveProductButton)}  
                {removeWishListButton(showremoveWishListButton)}
                {showCartUpdateOptions(cartUpdate)}
              </span>
            </CardContent>
          </CardM>
    </Container>
  );
};

export default Card;
